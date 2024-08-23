import bcrypt from "bcrypt";
import express from "express";
import { StatusCodes } from "http-status-codes";
import jwt from "jsonwebtoken"; // Import JWT library
import User from "../models/users.modal";
import { hashPassword } from "../utils";
const router = express.Router();

router.get("/", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ err: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ err: "Invalid  email or password" });
    }

    const payload = { userId: user._id };
    const secret = process.env.JWT_SECRET;
    const expiry = process.env.JWT_EXPIRY;

    if (!secret || !expiry) {
      console.error("environment variable not provided");
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    }

    const token = jwt.sign(payload, secret, {
      expiresIn: expiry,
    });

    return res.status(StatusCodes.ACCEPTED).json({ data: token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ err: "Internal server error" });
  }
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Email already exists" });
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res
      .status(StatusCodes.CREATED)
      .json({ message: "Registration successful" });
  } catch (error) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ err: error });
  }
});

export default router;
