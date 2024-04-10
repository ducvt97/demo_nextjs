"use client";

import {
  faFacebook,
  faTwitter,
  faWhatsapp,
} from "@fortawesome/free-brands-svg-icons";
import { faBookmark, faEnvelope } from "@fortawesome/free-regular-svg-icons";
import React, { useEffect, useState } from "react";
import Button from "../buttons/Button";
import IconButton from "../buttons/IconButton";
import { useSession } from "next-auth/react";
import { SessionUser } from "@/models/user";
import PropertyContactForm from "./PropertyContactForm";
import { faBookmark as faBookmarkSolid } from "@fortawesome/free-solid-svg-icons";
import { toast } from "react-toastify";
import { bookmarkProperty } from "@/services/property.service";
import { getUser } from "@/services/user.service";

interface Props {
  propertyId: string;
}

const PropertyRightSide: React.FC<Props> = ({ propertyId }) => {
  const { data: session } = useSession();
  const currentUser: SessionUser | undefined = session?.user;

  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);

  useEffect(() => {
    const getBookmarked = async () => {
      try {
        const res = await getUser(currentUser?.id ?? "");
        if (!res) return;
        const { user } = res;
        setIsBookmarked(user.bookmarks.includes(propertyId));
      } catch (error) {
        console.log(error);
      }
    };
    getBookmarked();
  });

  const handleClickBookmarkBtn = async () => {
    if (!currentUser) {
      toast.error("You need to log in first.");
    }
    try {
      const res = await bookmarkProperty(propertyId);
      if (!res) {
        toast.error(res.error);
        return;
      }
      setIsBookmarked((prev) => !prev);
    } catch (error: any) {
      toast.error(error);
    }
  };

  return (
    <aside className="col-span-3 space-y-4">
      <Button
        iconLeft={isBookmarked ? faBookmarkSolid : faBookmark}
        size="lg"
        className="w-full"
        onClick={handleClickBookmarkBtn}
      >
        <span>{isBookmarked ? "Bookmarked" : "Bookmark"}</span>
      </Button>
      <h3 className="text-xl font-bold text-center pt-2">
        Share This Property:
      </h3>
      <div className="flex gap-3 justify-center pb-5">
        <IconButton icon={faFacebook} variant="outline" />
        <IconButton icon={faTwitter} variant="outline" />
        <IconButton icon={faWhatsapp} variant="outline" />
        <IconButton icon={faEnvelope} variant="outline" />
      </div>
      {currentUser ? (
        <PropertyContactForm />
      ) : (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-xl font-bold mb-6">Contact Property Manager</h3>
          <p>You must be logged in to send a message</p>
        </div>
      )}
    </aside>
  );
};

export default PropertyRightSide;
