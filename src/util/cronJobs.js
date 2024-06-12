const cron = require("node-cron");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

const publishScheduledImages = cron.schedule("* * * * *", async () => {
  try {
    const now = new Date();

    const imagesToPublish = await prisma.image.findMany({
      where: {
        published: false,
        scheduledAt: {
          lte: now,
        },
      },
    });

    const publishPromises = imagesToPublish.map((image) =>
      prisma.image.update({
        where: { id: image.id },
        data: { published: true, publishedAt: now },
      })
    );

    await Promise.all(publishPromises);

    console.log(`${imagesToPublish.length} images published`);
  } catch (error) {
    console.error("Error publishing scheduled images:", error);
  }
});

module.exports = { publishScheduledImages };
