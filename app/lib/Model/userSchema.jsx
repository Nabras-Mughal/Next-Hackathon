import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  firstName: String,
  LastName: String,
  email: String,
  password: String,
});

if (mongoose.models["userCredentials"]) {
  delete mongoose.model("userCredentials");
}

export const usersDB =
  mongoose.models.userCredentials ||
  mongoose.model("userCredentials", userSchema);
