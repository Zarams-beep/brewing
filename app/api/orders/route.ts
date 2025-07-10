import { NextResponse, NextRequest } from "next/server";
import connect from "@/utils/db";
import Order from "@/modal/Order";

export const GET = async ()=>{
  try{
    await connect();
    const posts = await Order.find();
    return new NextResponse(JSON.stringify(posts),
  {status:200});
  }catch(err){
    return new NextResponse("Database Error",{status:500});
  }
};

export const POST = async (request: NextRequest) => {
  const body = await request.json();
  const newPost = new Order(body);

  try{
    await connect();
    await newPost.save();
    return new NextResponse("Order has been created", {status:201});
  }
  catch (err){
    return new NextResponse("Database Error", { status: 500 });
  }
}