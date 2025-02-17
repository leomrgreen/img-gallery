"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { timeSince } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";

const SingleBlogPage = () => {
  type BlogPost = {
    id: string;
    title: string;
    content: string;
    img_url: string;
    created_at: string;
    author: {
      name: string;
      profilePicture: string;
    };
  };

  const { id } = useParams();
  const [blogPost, setBlogPost] = useState<BlogPost | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.log(error);
      } else {
        setBlogPost(data);
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  if (!blogPost)
    return (
      <article className="max-w-[50rem] w-full mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-8">
          <Skeleton className="h-8 w-3/4 mb-4" />
          <div className="flex items-center space-x-4 mb-4">
            <Skeleton className="h-12 w-12 rounded-full" />
            <div>
              <Skeleton className="h-4 w-32 mb-2" />
              <Skeleton className="h-3 w-24" />
            </div>
          </div>
          <Skeleton className="h-4 w-full max-w-[180px]" />
        </header>

        <Skeleton className="aspect-video w-full rounded-lg mb-8" />

        <div className="space-y-4">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>

        <div className="mt-8 space-y-6">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>

        <div className="mt-12">
          <Skeleton className="h-10 w-full max-w-[200px] mb-4" />
          <div className="flex space-x-4">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-24" />
          </div>
        </div>
      </article>
    );

  return (
    <section className="mx-auto flex flex-col  gap-5 pt-10 max-w-[50rem]">
      <h1 className="text-3xl sm:text-6xl font-bold">{blogPost.title}</h1>
      <div className="flex items-center text-base text-muted-foreground gap-2">
        <Avatar className="border">
          <AvatarImage src={blogPost.author.profilePicture} />
        </Avatar>
        <span>{blogPost.author.name}</span>
        <span className="size-1 bg-muted-foreground rounded-full" />
        <span>{timeSince(blogPost.created_at)}</span>
      </div>
      <Image
        height={1000}
        width={1000}
        src={blogPost.img_url}
        alt={blogPost.title}
        className="rounded-lg"
      />
      <div
        dangerouslySetInnerHTML={{ __html: blogPost.content }}
        className="prose sm:prose-xl text-foreground/80 prose-headings:text-foreground mx-auto prose-strong:text-foreground"
      />
    </section>
  );
};

export default SingleBlogPage;
