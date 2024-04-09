"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import Button from "@/components/buttons/Button";
import { useSession } from "next-auth/react";
import { IProperty } from "@/models/property";
import { deleteProperty, getByUser } from "@/services/property.service";
import { toast } from "react-toastify";

interface SessionUser {
  id?: string;
  name?: string | null | undefined;
  email?: string | null | undefined;
  image?: string | null | undefined;
}
const defaultAvatar =
  "https://www.google.com/url?sa=i&url=https%3A%2F%2Fwww.veryicon.com%2Ficons%2Fmiscellaneous%2Frookie-official-icon-gallery%2F225-default-avatar.html&psig=AOvVaw0ysjrHyvPGTC1B1uCZ9k5J&ust=1712077982935000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCMja7dHBoYUDFQAAAAAdAAAAABAE";

const ProfilePage: React.FC = () => {
  const { data: session } = useSession();
  const user: SessionUser | undefined = session?.user;

  const [properties, setProperties] = useState<IProperty[]>([]);

  useEffect(() => {
    const fetchUserProperties = async (userId?: string) => {
      if (!userId) {
        return;
      }
      const { properties } = await getByUser(userId);

      if (properties) {
        setProperties(properties);
      }
    };
    fetchUserProperties(user?.id);
  }, [session]);

  const handleDeleteProperty = async (id: string) => {
    try {
      const res = await deleteProperty(id);
      if (!res) {
        toast.error("Error deleting this property");
      }
      setProperties((properties) =>
        properties.filter((property) => property._id !== id)
      );
      toast.success(res.message);
    } catch (error: any) {
      toast.error(error);
      console.log(error);
    }
  };

  const generateProperties = () => {
    return properties.map((property) => (
      <div className="mb-10" key={property._id}>
        <a href={`/properties/${property._id}`}>
          <Image
            alt=""
            width="500"
            height="100"
            className="h-32 w-full rounded-md object-cover"
            src={property.images[0]}
            priority
          />
        </a>
        <div className="mt-2">
          <p className="text-lg font-semibold">{property.name}</p>
          <p className="text-gray-600">
            Address: {property.location.street} {property.location.city}{" "}
            {property.location.state}
          </p>
        </div>
        <div className="mt-2">
          <Button className="mr-3">
            <Link href={`/properties/${property._id}/edit`}>Edit</Link>
          </Button>
          <Button
            variant="delete"
            type="button"
            onClick={() => handleDeleteProperty(property._id)}
          >
            Delete
          </Button>
        </div>
      </div>
    ));
  };

  return (
    user && (
      <section className="bg-blue-50">
        <div className="container m-auto py-24">
          <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
            <h1 className="text-3xl font-bold mb-4">Your Profile</h1>
            <div className="flex flex-col md:flex-row">
              <div className="md:w-1/4 mx-20 mt-10">
                <div className="mb-4">
                  <Image
                    alt="User avatar"
                    width="200"
                    height="200"
                    className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                    src={user.image || defaultAvatar}
                    priority
                  />
                </div>
                <h2 className="text-2xl mb-4">
                  <span className="font-bold block">Name:</span>
                  {user.name}
                </h2>
                <h2 className="text-2xl">
                  <span className="font-bold block">Email:</span>
                  {user.email}
                </h2>
              </div>
              <div className="md:w-3/4 md:pl-4">
                <h2 className="text-xl font-semibold mb-4">Your Listings</h2>
                {generateProperties()}
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default ProfilePage;
