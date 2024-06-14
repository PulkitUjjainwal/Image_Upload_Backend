const Queue = require("bull");
const { dataUri } = require("../util/data-uri");
const { cloudinaryUpload } = require("../util/cloudinary");
const sharp = require("sharp");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const imageQueue = new Queue("image processing", {
  redis: { host: "127.0.0.1", port: 6379, maxRetriesPerRequest: 20 },
});

imageQueue.process(2, async (job) => {
  try {
    const { file, userId, scheduledAt } = job.data;

    if (!file) {
      throw new Error("Input file is missing!");
    }

    const uploadResult = await cloudinaryUpload(file);

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
