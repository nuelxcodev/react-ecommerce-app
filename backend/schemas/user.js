const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  username: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  email: {
    type: mongoose.SchemaTypes.String,
    required: true,
    unique: true
  },
  password: {
    type: mongoose.SchemaTypes.String,
    required: true,
  },
  token: {
    type: mongoose.SchemaTypes.String,
  },
});

const User = mongoose.model("Users", userSchema);
export default User;
