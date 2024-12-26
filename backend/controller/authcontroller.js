import User from "../schemas/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Item from "../schemas/items.js";
import { hasher } from "../utils/hasher.js";
import { sendOTP } from "./otpcontroller.js";

export async function register(req, res) {
  const { username, email, password } = req.body;
  if (!(username && email && password)) {
    throw Error("missing credentials please input them to continue");
    return;
  }
  sendOTP({
    email,
    message: `Dear ${username},
Thank you for using NUELMAT. To proceed, please use the One-Time Password (OTP) below:`,
    subject: "OTP verification ",
  }).then(()=>{
    res
    .status(200)
    .send({
      message: ` Please enter the OTP sent to your email address ( ${email}).`,
    });
  }
  );

  console.log(username)
}



export async function login(req, res) {
  const { email, password } = req.body;
  const check = await User.findOne({ email });
  if (!check) {
    res.status(403).send({ message: "invalid username or email" });
  } else {
    const isValid = bcrypt.compareSync(password, check.password);
    const token = jwt.sign({ email }, process.env.SCERET_JWT_KEY, {
      expiresIn: "1d",
    });
    return res.json({
      status: "success",
      id: check._id,
      username: check.username,
      token: token,
    });
  }
}
export async function resetpassword(req, res) {}

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
