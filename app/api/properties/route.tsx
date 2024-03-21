import dbConnect from "@/config/dbConnect";
import Property from "@/models/property.model";

export const GET = async () => {
  try {
    await dbConnect();

    const properties = await Property.find({});
    console.log(properties);
    

    return new Response('test', { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response("Something went wrong.", { status: 500 });
  }
};
