const cloudinary = require("cloudinary").v2;
const { PrismaClient } = require("@prisma/client");
const { upload } = require("../util/multer");
const { dataUri } = require("../util/data-uri");
const { cloudinaryUpload } = require("../util/cloudinary");
const imageQueue = require("../util/imageQueue");
const sharp = require("sharp");

const prisma = new PrismaClient();


const singleUpload = upload.single("image");

exports.singleUploadCtrl = (req, res, next) => {
  singleUpload(req, res, (error) => {
    if (error) {
      return res.sendApiError({ title: "Upload Error", detail: error.message });
    }

    next();
  });
};

// cloud upload and processing
exports.cloudUpload = async (req, res) => {
  try {
    if (!req.file) {
      throw new Error("Image is not presented!");
    }

    const buffer = await sharp(req.file.buffer)
      .resize(400, 400)
      .png()
      .toBuffer();
    const file64 = dataUri({ buffer, originalname: "image.png" }).content;
    const userId = req.user.userId;
    const { scheduledAt } = req.body; // Get the scheduled time from the request body

    const job = await imageQueue.add({
      file: file64,
      userId: userId,
      scheduledAt: scheduledAt ? new Date(scheduledAt) : new Date(), // Default to current time if not provided
    });

    res.json({
      message: "Image uploaded successfully",
      success: true,
      jobId: job.id,
      userId: userId,
    });
  } catch (error) {
    console.error(error);
    res
      .status(422)
      .json({ message: "Error uploading image", err: error.message });
  }
};

exports.fetchImagesByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10); // Get userId from request parameters

    const images = await prisma.image.findMany({
      where: {
        userId: userId,
      },
    });

    // console.log(req.body);

    res.json({ success: true, images });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error fetching images", err: error.message });
  }
};

exports.fetchAll = async (req, res) => {
  try {
    const images = await prisma.image.findMany();
    res.json(images);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching images" });
  }
};
const deleteFromCloudinary = async (publicId) => {
  return cloudinary.uploader.destroy(publicId);
};

exports.deleteImagesByUser = async (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);

    if (isNaN(userId)) {
      return res.status(400).json({ message: "Invalid user ID provided" });
    }

    // Fetch images for the user
    const images = await prisma.image.findMany({
      where: { userId: userId },
    });

    // Delete images from Cloudinary
    const deletePromises = images.map((image) =>
      deleteFromCloudinary(image.cloudinaryId)
    );

    await Promise.all(deletePromises);

    // Delete images from the database
    await prisma.image.deleteMany({
      where: { userId: userId },
    });

    res.json({ message: "Images deleted successfully", success: true });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Error deleting images", err: error.message });
  }
};
