const bcrypt = require("bcrypt");

export async function hasher(value) {
  try {
    const salt = await bcrypt.genSalt(10);
    return bcrypt.hashSync(value, salt);
  } catch (error) {
    console.log(error);
  }
}

export async function comparer(value, hash) {
  try {
    return bcrypt.compareSync(value, hash);
  } catch (error) {
    console.log(error);
  }
}
