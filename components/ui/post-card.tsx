import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./card";
import Image from "next/image";
import { Skeleton } from "./skeleton";

const PostCard = ({ post }: { post: any }) => {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <Card>
      <CardHeader>
        <CardTitle>{post.title}</CardTitle>
        <CardDescription>
          <div className="flex gap-3 items-center text-base">
            <img
              src={post.author.profilePicture}
              alt={post.author.name}
              className="size-7 rounded-full border"
            />
            <span>{post.author.name}</span>
          </div>
        </CardDescription>
      </CardHeader>
      <CardContent className="aspect-square">
        <div className="relative size-full">
          <Image
            src={post.image_url}
            alt="Uploaded image"
            width={500}
            height={500}
            onLoadingComplete={() => {
              setIsLoading(false);
            }}
            className={`absolute inset-0 object-cover aspect-square size-full rounded-lg ${
              isLoading ? "opacity-0" : "opacity-100"
            }`}
          />
          {isLoading && (
            <Skeleton className="absolute inset-0 object-cover aspect-square size-full" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
