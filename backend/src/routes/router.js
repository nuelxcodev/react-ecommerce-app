import { Router } from "express";
import * as controller from "../controller/authcontroller.js";
import { OTPverification } from "../controller/otpcontroller.js";
import { checkOutItems } from "../controller/stripecontroller.js";
import { handler } from '@netlify/functions'; // Import Netlify functions handler

const router = Router();

// authentication
router.route("/register").post(controller.register);
router.route("/login").post(controller.login);
router.route("/resetpassword").post(controller.resetpassword);

// OTP
router.route("/Otpverification").post(OTPverification);

// items
router.route("/item").post(controller.items);
router.route("/getitem").get(controller.getitems);

// checkout stripe
router.route("/checkout").post(checkOutItems);

// Wrap the Express app with the Netlify handler
export const handler = handler(router);
