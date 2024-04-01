import dbConnect from "@/config/dbConnect";
import Property from "@/models/property.model";
import { NextResponse } from "next/server";

export const GET = async (_: any, query: { params: { userId: string } }) => {
  try {
    await dbConnect();
    const userId = query.params.userId;
    const properties = await Property.find({ owner: userId });

    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
