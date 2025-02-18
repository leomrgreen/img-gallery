import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Avatar, AvatarImage } from "./avatar";
import { timeSince } from "@/lib/utils";
import { Post } from "@/lib/types";

const BlogCard = ({ post }: { post: Post }) => {
  return (
    <Link
      href={`/blog/${post.id}`}
      key={post.id}
      className="flex flex-col border-none shadow-none gap-5 mb-5 hover:scale-105 transition-transform"
    >
      <Image
        width={1000}
        height={1000}
        src={post.img_url}
        alt={post.title}
        className="aspect-square object-cover rounded-lg border"
      />
      <div className="flex items-center text-sm text-muted-foreground gap-2">
        <div className="flex items-center gap-1">
          <Avatar className="size-6 border">
            <AvatarImage src={post.author.profilePicture} />
          </Avatar>
          <span>{post.author.name}</span>
        </div>
        <span className="size-1 bg-muted-foreground rounded-full" />
        <span>{timeSince(post.created_at)}</span>
      </div>
      <h5 className="text-xl font-semibold">{post.title}</h5>
    </Link>
  );
};

export default BlogCard;
