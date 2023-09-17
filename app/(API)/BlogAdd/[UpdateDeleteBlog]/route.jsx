import { ConnectionURL } from "@/app/lib/DBConnect";
import { BlogDB } from "@/app/lib/Model/BlogSchema";
import { NextResponse } from "next/server";
import mongoose from "mongoose";

// GET API //

export async function GET(request, content) {
  let ID = content.params.UpdateDeleteBlog;
  let isMongoID = { _id: ID };
  let isConnected;
  
  try {
    await mongoose.connect(ConnectionURL);
    isConnected = true;
  } catch (error) {
    throw new Error(error);
    isConnected = false;
  }

  let result = await BlogDB.findById(isMongoID)
  return NextResponse.json({ isMongoID, result, isConnected });
}
// POST API //
export async function PUT(request, content) {
  let blogID = content.params.UpdateDeleteBlog;
  let isMongoID = { _id: blogID };
  let isConnected;
  try {
    await mongoose.connect(ConnectionURL);
    isConnected = true;
  } catch (error) {
    throw new Error(error);
    isConnected = false;
  }

  let payload = await request.json();
  const result = await BlogDB.findOneAndUpdate(isMongoID, payload);
  return NextResponse.json({ isMongoID, payload, isConnected });
}

// DELETE API //

export async function DELETE(request, content) {
  let blog_id = content.params.UpdateDeleteBlog;
  let ID = { _id: blog_id };
  console.log(`ID : ${JSON.stringify(ID, null, 2)}`);
  try {
    await mongoose.connect(ConnectionURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(error);
  }
  let deleteIt = await BlogDB.deleteOne(ID);
  return NextResponse.json({ message: "Deleted" });
}
