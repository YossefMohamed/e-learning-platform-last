import { constants } from "@/infrastructure/constants";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CourseCard = ({
  img = `${constants.url}/images/courseDefault.jpg`,
  name,
  link,
}: {
  img?: string;
  name: string;
  link: string;
}) => {
  const [imagePath, setImagePath] = useState(img);
  const [imageExists, setImageExists] = useState(true);

  useEffect(() => {
    // Get the image path from the server.
    const getImagePath = async () => {
      const response = await fetch(img);
      if (response.status === 200) {
        setImagePath(response.url);
        setImageExists(true);
      } else {
        setImagePath(`${constants.url}/images/courseDefault.jpg`);
        setImageExists(false);
      }
    };

    getImagePath();
  }, [img]);

  return (
    <div className="flex flex-col md:w-[33%] my-4 cursor-pointer max-h-[500px] p-4 shadow-xl hover:shadow-2xl border-2">
      <div className="flex max-h-[60%] flex-1 relative min-h-[250px]">
        {imageExists && (
          <Image src={imagePath} alt="image course" fill className="h-full w-full" />
        )}
        {!imageExists && (
          <Image src="/course-bg.jpg" alt="image course" fill className="h-full w-full" />
        )}
      </div>
      <div className="flex flex-col mt-5 gap-6 flex-1 ">
        <Link href={link} className="flex justify-between mt-auto">
          <div className="btn-primary w-full">{name}</div>
        </Link>
      </div>
    </div>
  );
};

export default CourseCard;