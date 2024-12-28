import User from "../schemas/user.js";
import bcrypt, { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import Item from "../schemas/items.js";
import { comparer, hasher } from "../utils/hasher.js";
import { sendOTP } from "./otpcontroller.js";
import { sendMail } from "../utils/mailer.js";

export async function register(req, res) {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!(username && email && password)) {
    return res.status(500).json({
      success: false,
      message: "Missing credentials. Please input them to continue.",
    });
  }

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      res.status(400).json({
        success: false,
        message: "User already exists. Please login or use a different email.",
      });

      return;
    } else {
      // Send OTP to the user's email
      await sendOTP({
        email,
        message: `Dear ${username},\n\nThank you for using NUELMAT. To proceed, please use the One-Time Password (OTP) below:`,
        subject: "OTP verification",
      });

      // Create the new user
      const hashedPassword = await hasher(password);
      const new_user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await new_user.save();

      // Respond with a message for OTP verification
      res.status(200).json({
        success: true,
        message: `Please enter the OTP sent to your email address (${email}).`,
        nextStep: "Enter OTP",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "An error occurred during registration. Please try again later.",
    });
  }
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!(email && password)) {
    res.status(400).json({ message: "Missing credentials" });
  }
  try {
    const user = await User.findOne({ email });
    if (!user) {
      res.status(400).json({ message: "user does not exist" });
    }
    comparer(password, user.password)
      .then(async () => {
        if (user.token) {
          res.status(200).json({ token: user.token });
          console.log("ok");
          return;
        } else {
          await User.deleteOne({ email });
          res.status(400).json("user does not exist");
          console.log("delected");
        }
      })
      .catch((error) =>
        res.status(400).json({
          massege: "error occurred",
          error,
        })
      );
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "An error occurred during sigIn. Please try again later.",
    });
  }
}
export async function resetpassword(req, res) {
  const { email } = req.body;

  console.log(email);

  if (!email) {
    res.status(400).json({ message: "Please provide a valid email address." });
    return;
  }

  try {
    const userFound = await User.findOne({ email });
    if (!userFound) {
      res.status(404).json({ message: "No user with this email was found." });
      return;
    }

    // Generate reset link or token
    const resetToken = jwt.sign(
      { id: userFound._id },
      process.env.SECRET_JWT_KEY,
      {
        expiresIn: "1h",
      }
    );

    const baseURL = process.env.BASE_URL; // Read the base URL from environment variables
    const resetLink = `${baseURL}/reset-password?token=${resetToken}`;

    // Send response to client
    res.status(200).json({
      message:
        "A reset option has been sent to your email. Please check to continue.",
    });

    // Email content
    const mailOptions = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject: "Password Reset Request",
      html: `
        <p>Hello,</p>
        <p>You requested to reset your password. Please click the link below to proceed:</p>
        <a href="${resetLink}" target="_blank">Reset Password</a>
        <p>If you did not request this, please ignore this email.</p>
        <p>Thank you!</p>
      `,
    };

    await sendMail(mailOptions);
  } catch (error) {
    console.error("Error sending reset email:", error);
    res
      .status(500)
      .json({ message: "An error occurred. Please try again later." });
  }
}
export async function items(req, res) {
  const { username, data } = req.body;
  const { name, slug, category, brand, price, countInStock, image } = data;
  const newitem = await Item.create({
    username,
    name,
    slug,
    category,
    brand,
    price,
    countInStock,
    image,
  });
  return res.json({ status: "success", message: "created" });
}
export async function getitems(req, res) {
  const allItem = await Item.find();
  const data = allItem;
  res.json(data);
}
