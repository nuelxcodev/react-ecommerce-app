import OTP from "../schemas/OTPschema.js";
import { sendMail } from "../utils/mailer.js";
import { comparer, hasher } from "../utils/hasher.js";
import User from "../schemas/user.js";

// OTP generator
export async function OTPgenerator() {
  try {
    return Math.floor(10000 + Math.random() * 9000);
  } catch (error) {
    console.log(error);
  }
}

// send OTP
export async function sendOTP({ email, subject, message, duration = 1 }) {
  try {
    if (!email && subject && message) {
      throw Error("please enter values email, subject, message");
    }

    await OTP.deleteMany({ email });

    // this will call the generate function and generate new otp
    const generatedOTP = await OTPgenerator();

    const mailoptions = {
      from: process.env.MAILER_EMAIL,
      to: email,
      subject,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f9f9f9;
              margin: 0;
              padding: 0;
            }
            .email-container {
              width: 100%;
              max-width: 600px;
              margin: 20px auto;
              background-color: #ffffff;
              border-radius: 8px;
              overflow: hidden;
              box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
            }
            .header {
              text-align: center;
              background-color: pink;
              color: white;
              padding: 20px;
              font-size: 24px;
              font-weight: bold;
              border-radius: 8px 8px 0 0;
            }
            .content {
              padding: 20px;
              text-align: center;
              color: #333333;
            }
            .otp {
              font-size: 36px;
              font-weight: bold;
              color: #e63946;
              margin: 20px 0;
            }
            .footer {
              margin-top: 20px;
              text-align: center;
              font-size: 14px;
              color: #888888;
            }
          </style>
        </head>
        <body>
          <div class="email-container">
            <div class="header">
              Your OTP Verification Code
            </div>
            <div class="content">
              <p>${message}</p>
              <div class="otp">${generatedOTP}</div>
              <p style="font-size: 16px; color: #555555;">
                This code expires in <strong>${duration} minutes</strong>.
              </p>
            </div>
            <div class="footer">
              &copy; ${new Date().getFullYear()} nuelmart.com . All rights reserved.
            </div>
          </div>
        </body>
        </html>
      `,
    };

    await sendMail(mailoptions);

    const hash = await hasher(generatedOTP.toString());

    OTP.create({
      email,
      otp: hash,
      createdAt: Date.now(),
      expiresAt: Date.now() + 3600000 * +duration,
    });
  } catch (error) {
    throw error;
  }
}

export async function OTPverification(req, res) {
  try {
    const { otp, email } = req.body;

    if (!otp || !email) {
      return res
        .status(400)
        .json({ message: "Credentials must be valid and not empty" });
    }
    const chechotp = await OTP.findOne({ email });
    if (!chechotp) {
      return res
        .status(404)
        .json({ message: "No user with this email was found" });
    }
    const validateotp = await comparer(otp, chechotp.otp);
    if (!validateotp) {
      return res.status(401).json({ message: "Invalid OTP" });
    }
    const unverifieduser = await User.findOne({ email });
    if (!unverifieduser) {
      return res.status(404).json({ message: "User not found" });
    }

    await unverifieduser.updateOne({ isVerified: true });

    return res.status(200).json({ message: "User verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// const token = jwt.sign({ username }, process.env.SCERET_JWT_KEY, {
//   expiresIn: "1d",
// });
// res.status(200).send(token);
