// app/api/register/route.ts
import connect from "@/utils/db";
import User from "@/modal/User";
import bcrypt from "bcryptjs";
import { NextResponse } from "next/server";

export const POST = async (req: Request) => {
  const { name, email, password } = await req.json();

  await connect();

  const existingUser = await User.findOne({ email });
  if (existingUser) return new NextResponse("User already exists", { status: 400 });

  const hashed = await bcrypt.hash(password, 10);

  const newUser = new User({
    name,
    email,
    password: hashed,
  });

  await newUser.save();

  return new NextResponse("User registered successfully", { status: 201 });
};
