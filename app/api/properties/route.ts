import dbConnect from "@/config/dbConnect";
import Property from "@/models/property.model";
import { NextResponse } from "next/server";

export const GET = async () => {
  try {
    await dbConnect();
    const properties = await Property.find({});
    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
