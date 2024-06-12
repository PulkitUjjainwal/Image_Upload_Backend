const express = require("express");
const {
  singleUploadCtrl,
  cloudUpload,
  fetchImagesByUser,
  deleteImagesByUser,
  fetchAll,
} = require("../controllers/imageController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/upload", auth, singleUploadCtrl, cloudUpload);
router.get("/images/:userId", auth, fetchImagesByUser); // New route to fetch images by userId
router.get("/images/", auth, fetchAll); // New route to fetch images by userId
router.delete("/delete/:userId", auth, deleteImagesByUser);

module.exports = router;
