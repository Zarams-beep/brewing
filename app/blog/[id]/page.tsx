import { NextRequest, NextResponse } from "next/server";
import type { NextApiRequest } from "next";
import connect from "@/utils/db";
import Post from "@/modal/Post";

// Use `params` safely by explicitly typing it for App Router
interface Context {
  params: {
    id: string;
  };
}

export async function GET(
  request: NextRequest,
  context: Context
) {
  const id = context.params.id;

  try {
    await connect();
    const post = await Post.findById(id);
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  context: Context
) {
  const id = context.params.id;

  try {
    await connect();
    await Post.findByIdAndDelete(id);
    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
