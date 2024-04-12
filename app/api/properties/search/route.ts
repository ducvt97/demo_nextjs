import dbConnect from "@/config/dbConnect";
import Property from "@/models/property.model";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  try {
    await dbConnect();
    const { location, type } = Object.fromEntries(request.nextUrl.searchParams);
    const locationRegex = new RegExp(location || "", "i");
    const typeSearch = new RegExp(type !== "All" && !type ? type : "", "i");
    const query = {
      $or: [
        { name: locationRegex },
        { description: locationRegex },
        { "location.street": locationRegex },
        { "location.city": locationRegex },
        { "location.state": locationRegex },
        { "location.zipcode": locationRegex },
      ],
      type: typeSearch,
    };

    const properties = await Property.find(query);
    return NextResponse.json({ properties }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
