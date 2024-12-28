const mongoose = require("mongoose");
const { Schema } = mongoose;

const OTPschema = new Schema({
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true,
  },
  otp: {
    type: mongoose.SchemaTypes.String,
    required: true
  },
  createdAt: mongoose.SchemaTypes.Date,
  expiresAt: mongoose.SchemaTypes.Date,
});

const OTP = mongoose.model("OTP", OTPschema);
export default OTP