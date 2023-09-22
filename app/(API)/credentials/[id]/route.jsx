import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { ConnectionURL } from "@/app/lib/DBConnect";
import { usersDB } from "@/app/lib/Model/userSchema";

export async function GET(body, params) {
  let isConnected;
  const {
    params: { id },
  } = params;
  let userId = { _id: id };
  try {
    mongoose.connect(ConnectionURL);
    isConnected = true;
  } catch (error) {
    throw new Error(error);
    isConnected = false;
  }
  let result = await usersDB.findById(userId);
  return NextResponse.json({ isConnected, result });
}

export async function PUT(body, content) {
  const {
    params: { id },
  } = content;
  let userId = { _id: id };
  let isConnected;
  body = await body.json();
  try {
    mongoose.connect(ConnectionURL);
    isConnected = true;
  } catch (error) {
    throw new Error(error);
    isConnected = false;
  }

  let result = await usersDB.findOneAndUpdate(userId, body);

  return NextResponse.json({ isConnected, bodyParam, userId });
}
