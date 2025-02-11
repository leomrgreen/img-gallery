"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { timeSince } from "@/lib/utils";

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

  if (!blogPost) return <p>Laddar...</p>;

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
        className="prose sm:prose-xl text-foreground/85 prose-headings:text-foreground mx-auto"
      />
    </section>
  );
};

export default SingleBlogPage;
