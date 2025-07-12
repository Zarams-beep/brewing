import { NextRequest, NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/modal/Post";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    const post = await Post.findById(params.id);
    return NextResponse.json(post, { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    await connect();
    await Post.findByIdAndDelete(params.id);
    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error", { status: 500 });
  }
}
