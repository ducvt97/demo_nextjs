import dbConnect from "@/config/dbConnect";
import Property from "@/models/property.model";
import User from "@/models/user.model";
import { getSessionUser } from "@/utils/auth";
import { NextResponse } from "next/server";

export const POST = async (_: any, query: { params: { id: string } }) => {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { message: "Authentication failed." },
        { status: 401 }
      );
    }
    await dbConnect();
    const propertyId = query.params.id;
    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    const userInfo = await User.findById(user.id);
    if (!userInfo) {
      return NextResponse.json(
        { error: "Authorization failed" },
        { status: 401 }
      );
    }

    const bookmarkList = userInfo.bookmarks.map((item: any) => item.toString());
    const bookmarkIndex = bookmarkList.indexOf(propertyId);

    if (bookmarkIndex === -1) {
      bookmarkList.push(propertyId);
    } else {
      bookmarkList.splice(bookmarkIndex, 1);
    }

    userInfo.bookmarks = bookmarkList;
    await userInfo.save();
    return NextResponse.json(
      {
        message:
          bookmarkIndex === -1
            ? "Added to bookmark list"
            : "Removed from bookmark list",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
