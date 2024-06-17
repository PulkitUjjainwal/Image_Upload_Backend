const Queue = require("bull");
const { dataUri } = require("../util/data-uri");
const { cloudinaryUpload } = require("../util/cloudinary");
const sharp = require("sharp");
const { PrismaClient } = require("@prisma/client");
const moment = require("moment-timezone");
const prisma = new PrismaClient();

const redisConfig = {
  host: process.env.REDIS_SERVER_HOST,
  port: process.env.REDIS_SERVER_PORT,
  password: process.env.REDIS_SERVER_PASSWORD,
};

const imageQueue = new Queue("image processing", { redis: redisConfig });

imageQueue.process(2, async (job) => {
  try {
    const { file, userId, scheduledAt } = job.data;

    if (!file) {
      throw new Error("Input file is missing!");
    }

    console.log("Inside queue, scheduledAt (UTC):", scheduledAt);

    const uploadResult = await cloudinaryUpload(file);

    const istScheduledAt = moment.tz(scheduledAt, "Asia/Kolkata");
    console.log(
      "Before saving to DB, scheduledAt (ISO string in IST):",
      istScheduledAt.format()
    );

    await prisma.image.create({
      data: {
        url: uploadResult.secure_url,
        cloudinaryId: uploadResult.public_id,
        scheduledAt: new Date(scheduledAt),
        userId: userId,
      },
    });

    return Promise.resolve();
  } catch (error) {
    console.error("Error processing job:", error);
    return Promise.reject(error);
  }
});

imageQueue.on("failed", (job, error) => {
  console.error(`Job ${job.id} failed with error: ${error.message}`);
});

module.exports = imageQueue;
