const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const { publishScheduledImages } = require("./src/util/cronJobs");
const csrf = require("csurf");
const csrfProtection = csrf({ cookie: true });
const rateLimit = require("express-rate-limit");
const moment = require("moment-timezone");

dotenv.config();

const app = express();
const PORT = 3003;
TZ = process.env.TZ;

app.use(cors());
app.use(helmet());
app.use(express.json());

const imageRoutes = require("./src/routes/imageRoutes");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");

app.use("/api/images", imageRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes); // Use user routes

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);

  publishScheduledImages.start();
});

const now = moment().tz("Asia/Kolkata");
console.log(
  `Current time in Asia/Kolkata: ${now.format("YYYY-MM-DD HH:mm:ss Z")}`
);

module.exports = app;
