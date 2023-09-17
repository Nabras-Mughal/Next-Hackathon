import { ConnectionURL } from "@/app/lib/DBConnect";
import { BlogDB } from "@/app/lib/Model/BlogSchema";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await mongoose.connect(ConnectionURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(error);
  }

  let BlogGET = await BlogDB.find();
  console.log(BlogGET);

  return NextResponse.json({ BlogGET });
}

export async function POST(request) {
  let Datacontent = await request.json();

  try {
    await mongoose.connect(ConnectionURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(error);
  }

  let insertuserCredentials = new BlogDB(Datacontent);
  const saveIt = await insertuserCredentials.save();
  return NextResponse.json({ Datacontent });
}

// export async function POST(request) {
//   let newBlog = await request.json();

//   try {
//     await mongoose.connect(ConnectionURL);
//     console.log("Blog Post Connected Successfully");
//   } catch (error) {
//     throw new Error(error);
//   }

//   let insertBlogContent = new BlogDB(newBlog);
//   let saveNewBlog = await insertBlogContent.save();
//   return NextResponse.json({ newBlog, message: "Blog Added" });
// }
