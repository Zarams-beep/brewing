import { NextResponse, NextRequest } from "next/server";
import connect from "@/utils/db";
import Post from "@/modal/Post";
type ParamsContext = {
  params: {
    id: string;
  };
};
export const GET = async (request:NextRequest, context: ParamsContext) => {
  const { id } = context.params;


  try {
    await connect();

    const post = await Post.findById(id);

    return new NextResponse(JSON.stringify(post), { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};

export const DELETE = async (request:NextRequest, context: ParamsContext) => {
  const { id } = context.params;


  try {
    await connect();

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
};