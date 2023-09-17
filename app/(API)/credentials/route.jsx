import mongoose from "mongoose";
import { NextResponse } from "next/server";

import { ConnectionURL } from "@/app/lib/DBConnect";
import { usersDB } from "@/app/lib/Model/userSchema";

export async function GET() {
  try {
    await mongoose.connect(ConnectionURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(error);
  }

  let userCredentialsGET = await usersDB.find();
  console.log(userCredentialsGET);

  return NextResponse.json({ userCredentialsGET, message: "Successful" });
}

export async function POST(request) {
  let Datacontent = await request.json();

  try {
    await mongoose.connect(ConnectionURL);
    console.log("Connected to MongoDB");
  } catch (error) {
    throw new Error(error);
  }

  let insertuserCredentials = new usersDB(Datacontent);
  const saveIt = await insertuserCredentials.save();
  return NextResponse.json({ insertuserCredentials, message: "Successful" });
}

// export async function POST(request) {
//   const otherData = await request.json();
//   await mongoose.connect(connectionURL);
//   let insertSalesData = new Suppliers(otherData);
//   const APIresponse = await insertSalesData.save();
//   return NextResponse.json({ message: "successfully Uploaded" });
// }

// export async function POST(request) {
//   const otherData = await request.json();
//   await mongoose.connect(connectionURL);
//   let insertSalesData = new Suppliers(otherData);
//   const APIresponse = await insertSalesData.save();
//   return NextResponse.json({ message: "successfully Uploaded" });
// }
