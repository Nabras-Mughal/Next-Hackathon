import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: String,
  description: String,
  author: String,
  date: Date,
});

export const BlogDB =
  mongoose.models.blogs || mongoose.model("blogs", BlogSchema);
