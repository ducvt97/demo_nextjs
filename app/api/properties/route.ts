import cloudinary from "@/config/cloudinary";
import dbConnect from "@/config/dbConnect";
import Property from "@/models/property.model";
import { getSessionUser } from "@/utils/auth";
import { NextRequest, NextResponse } from "next/server";

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

export const POST = async (request: NextRequest) => {
  try {
    const user = await getSessionUser();
    if (!user) {
      return NextResponse.json(
        { message: "Authentication failed." },
        { status: 401 }
      );
    }
    await dbConnect();
    const formData = await request.formData();

    const amenities = formData.getAll("amenities");
    const images = formData.getAll("images") as File[];

    const imagesUploadedPromise: string[] = [];
    for (const image of images) {
      const imageBuffer = await image.arrayBuffer();
      const imageArray = Array.from(new Uint8Array(imageBuffer));
      const imageData = Buffer.from(imageArray);

      // Convert to Base64
      const imageBase64 = imageData.toString("base64");
      // Upload
      const uploadRes = await cloudinary.uploader.upload(
        `data:${image.type};base64,${imageBase64}`,
        { folder: "property-demo" }
      );
      imagesUploadedPromise.push(uploadRes.secure_url);
    }
    const imagesUploaded = await Promise.all(imagesUploadedPromise);

    const property = {
      owner: user?.id,
      name: formData.get("name"),
      type: formData.get("type"),
      description: formData.get("description"),
      location: {
        street: formData.get("street"),
        city: formData.get("city"),
        state: formData.get("state"),
        zipcode: formData.get("zipcode"),
      },
      beds: formData.get("beds"),
      baths: formData.get("baths"),
      square_feet: formData.get("square_feet"),
      amenities,
      rates: {
        nightly: formData.get("nightly_rate"),
        weekly: formData.get("weekly_rate"),
        monthly: formData.get("monthly_rate"),
      },
      seller_info: {
        name: formData.get("seller_name"),
        email: formData.get("seller_email"),
        phone: formData.get("seller_phone"),
      },
      images: imagesUploaded,
    };
    console.log(property);

    const newProperty = new Property(property);
    await newProperty.save();
    return NextResponse.redirect(
      `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
    );
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
