"use client";

import PropertyInfo from "@/components/property_detail/PropertyInfo";
import PropertyRightSide from "@/components/property_detail/PropertyRightSide";
import { IProperty } from "@/models/property";
import { getById } from "@/services/property.service";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";

export default async function PropertyDetail() {
  const { id } = useParams();
  const [propertyDetail, setPropertyDetail] = useState<IProperty | null>(null);

  useEffect(() => {
    const fetchProperty = async () => {
      if (!id) return;
      const { property } = await getById(id as string);
      setPropertyDetail(property);
    };
    if (propertyDetail === null) {
      fetchProperty();
    }
  }, [id, propertyDetail]);

  return (
    propertyDetail && (
      <main>
        <section>
          <div className="container-xl m-auto">
            <div className="grid grid-cols-1">
              <Image
                width={0}
                height={0}
                className="object-cover h-[400px] w-full"
                src={propertyDetail.images[0]}
                alt="Cover image"
              />
            </div>
          </div>
        </section>
        <section>
          <div className="container m-auto py-6 px-6">
            <Link
              className="text-blue-500 hover:text-blue-600 flex items-center"
              href="/properties"
            >
              <FontAwesomeIcon icon={faArrowLeft} className="mr-2" />
              Back to Properties
            </Link>
          </div>
        </section>

        <section className="bg-blue-50">
          <div className="container m-auto py-10 px-6">
            <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
              <PropertyInfo info={propertyDetail} />
              <PropertyRightSide />
            </div>
          </div>
        </section>

        <section className="bg-blue-50 p-4">
          <div className="container mx-auto">
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-1">
                <img
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                />
              </div>
              <div className="col-span-1">
                <img
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                />
              </div>
              <div className="col-span-1">
                <img
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                />
              </div>
              <div className="col-span-1">
                <img
                  alt=""
                  className="object-cover h-[400px] w-full rounded-xl"
                />
              </div>
            </div>
          </div>
        </section>
      </main>
    )
  );
}
