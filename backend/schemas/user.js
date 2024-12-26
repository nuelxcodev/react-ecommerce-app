import mongoose from "mongoose";
import { Schema } from "mongoose";

const userSchema = new Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  verified: {
    type: mongoose.SchemaTypes.Boolean,
    default: false,
  },
});

const User = mongoose.model("Users", userSchema);
export default User;
