const { Router } = require("express");
const controller = require("../controller/authcontroller.js");
const { OTPverification } = require("../controller/otpcontroller.js");
const { checkOutItems } = require("../controller/stripecontroller.js");


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
router.route('/checkout').post(checkOutItems)

export default router;
