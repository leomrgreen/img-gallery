import React from "react";
import { Skeleton } from "./ui/skeleton";

const CustomSkeleton = () => {
  return (
    <>
      <Skeleton className="w-full aspect-[3/4.5]" />
      <Skeleton className="w-full aspect-[3/4.5]" />
      <Skeleton className="w-full aspect-[3/4.5] hidden sm:block" />
      <Skeleton className="w-full aspect-[3/4.5] hidden sm:block" />
      <Skeleton className="w-full aspect-[3/4.5] hidden xl:block" />
    </>
  );
};

export default CustomSkeleton;
