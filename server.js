const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const { publishScheduledImages } = require("./src/util/cronJobs");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });

dotenv.config();

const app = express();
const PORT = 3003;

app.use(cors());
app.use(helmet());
app.use(express.json());

const imageRoutes = require("./src/routes/imageRoutes");
const authRoutes = require("./src/routes/authRoutes");

app.use("/api/images", imageRoutes);
app.use("/api/auth", authRoutes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  publishScheduledImages.start();
});

module.exports = app;
