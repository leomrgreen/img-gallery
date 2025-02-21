import React from "react";
import { Skeleton } from "./skeleton";
import Image from "next/image";

const CustomImage = ({
  src,
  width,
  height,
  alt,
  styles,
}: {
  src: string;
  width: number;
  height: number;
  alt: string;
  styles: string;
}) => {
  return (
    <div className="relative aspect-square">
      <Skeleton className="size-full absolute inset-0 -z-10" />
      <Image
        src={src}
        width={width}
        height={height}
        className={`${styles} inset-0 absolute size-full object-cover z-0`}
        alt={alt}
      />
    </div>
  );
};

export default CustomImage;
