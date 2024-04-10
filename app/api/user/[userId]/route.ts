import dbConnect from "@/config/dbConnect";
import User from "@/models/user.model";
import { NextResponse } from "next/server";

export const GET = async (_: any, query: { params: { userId: string } }) => {
  try {
    await dbConnect();
    const userId = query.params.userId;
    const user = await User.findById(userId);
    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
