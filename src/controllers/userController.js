// controllers/userController.js
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcryptjs");


exports.getUser = async (req, res) => {
  const { userId } = req.params;
  try {
    // Ensure userId is parsed as an integer
    const id = parseInt(userId, 10);
    if (isNaN(id)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const user = await prisma.user.findUnique({
      where: {
        id: id, // Ensure id is an integer
      },
    });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateUser = async (req, res) => {
  const { userId } = req.params;
  const { email, password } = req.body;
  try {
    const user = await prisma.user.findUnique({
      where: { id: parseInt(userId) },
    });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const updatedData = {};
    if (email) updatedData.email = email;
    if (password) updatedData.password = await bcrypt.hash(password, 10);

    const updatedUser = await prisma.user.update({
      where: { id: parseInt(userId) },
      data: updatedData,
    });

    res.status(200).json({ message: "User updated successfully", updatedUser });
  } catch (error) {
    console.log("Update user error:", error);
    res.status(500).json({ error: "Failed to update user data" });
  }
};
