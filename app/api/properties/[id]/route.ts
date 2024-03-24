import dbConnect from "@/config/dbConnect";
import Property from "@/models/property.model";
import { NextResponse } from "next/server";

export const GET = async (request: any, query: {params: {id: string}}) => {
  try {
    await dbConnect();
    const property = await Property.findById(query.params.id);

    return NextResponse.json({ property }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
