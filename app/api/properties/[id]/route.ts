import cloudinary from "@/config/cloudinary";
import dbConnect from "@/config/dbConnect";
import Property from "@/models/property.model";
import { getSessionUser } from "@/utils/auth";
import { NextApiRequest } from "next";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: any, query: { params: { id: string } }) => {
  try {
    await dbConnect();
    const property = await Property.findById(query.params.id);

    return NextResponse.json({ property }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};

export const DELETE = async (_: any, query: { params: { id: string } }) => {
  try {
    await dbConnect();
    const propertyId = query.params.id;
    const user = await getSessionUser();

    if (!user) {
      return NextResponse.json(
        { message: "Authentication failed." },
        { status: 401 }
      );
    }

    const property = await Property.findById(propertyId);
    if (!property) {
      return NextResponse.json(
        { error: "Property not found" },
        { status: 404 }
      );
    }

    if (user.id !== property.owner.toString()) {
      return NextResponse.json(
        { error: "Authorization failed" },
        { status: 401 }
      );
    }

    // const publicIds = property.images.map((imageUrl: string) => {
    //   const parts = imageUrl.split("/");
    //   return parts.at(-1)?.split(".").at(0);
    // });

    // Delete images in Cloudinary
    // for (let publicId of publicIds) {
    //   await cloudinary.uploader.destroy(`property-demo/${publicId}`);
    // }

    // // Delete record in DB
    // await property.deleteOne();

    return NextResponse.json({ message: "Property deleted" }, { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};

export const PATCH = async (
  request: Request,
  query: { params: { id: string } }
) => {
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

    if (user.id !== property.owner.toString()) {
      return NextResponse.json(
        { error: "Authorization failed" },
        { status: 401 }
      );
    }

    const data = await request.json();

    const amenities: String[] = [];
    for (const key in data.amenities) {
      if (data.amenities[key]) {
        amenities.push(key);
      }
    }
    // const images = formData.getAll("images") as File[];

    // const imagesUploadedPromise: string[] = [];
    // for (const image of images) {
    //   const imageBuffer = await image.arrayBuffer();
    //   const imageArray = Array.from(new Uint8Array(imageBuffer));
    //   const imageData = Buffer.from(imageArray);

    //   // Convert to Base64
    //   const imageBase64 = imageData.toString("base64");
    //   // Upload
    //   const uploadRes = await cloudinary.uploader.upload(
    //     `data:${image.type};base64,${imageBase64}`,
    //     { folder: "property-demo" }
    //   );
    //   imagesUploadedPromise.push(uploadRes.secure_url);
    // }
    // const imagesUploaded = await Promise.all(imagesUploadedPromise);

    property.owner = user?.id;
    property.name = data.name;
    property.type = data.type;
    property.description = data.description;
    property.location = {
      street: data.street,
      city: data.city,
      state: data.state,
      zipcode: data.zipcode,
    };
    property.beds = data.beds;
    property.baths = data.baths;
    property.square_feet = data.square_feet;
    property.amenities = amenities;
    property.rates = {
      nightly: data.nightly_rate,
      weekly: data.weekly_rate,
      monthly: data.monthly_rate,
    };
    property.seller_info = {
      name: data.seller_name,
      email: data.seller_email,
      phone: data.seller_phone,
    };
    // images: imagesUploaded,

    await property.save();
    return NextResponse.json(
      { message: "Update successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
