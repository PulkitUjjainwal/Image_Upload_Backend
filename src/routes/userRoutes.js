// routes/userRoutes.js
const express = require("express");
const { getUser, updateUser } = require("../controllers/userController");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const auth = require("../middlewares/auth");

router.get("/:userId", auth, getUser);

router.put(
  "/:userId",
  [
    check("email")
      .optional()
      .isEmail()
      .withMessage("Enter a valid email address"),
    check("password")
      .optional()
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
  auth,
  updateUser
);

module.exports = router;
