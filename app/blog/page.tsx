import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import BlogCard from "@/components/ui/blog-card";
import { Button, buttonVariants } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { timeSince } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const BlogPage = async () => {
  let { data: blog_posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .range(0, 4)
    .order("created_at", { ascending: false });

  if (error) {
    console.log(error);
  } else {
    console.log(blog_posts);
  }

  const latestPost = blog_posts?.[0];
  const otherPosts = blog_posts?.slice(1);

  return (
    <section className="min-h-screen max-w-[85rem] mx-auto flex flex-col justify-center items-center">
      <h1 className="text-5xl sm:text-7xl mt-10">Blog page</h1>
      <div className="flex flex-col gap-8">
        {latestPost && (
          <div className="grid md:grid-cols-2 border-none shadow-none gap-5 my-10">
            <Image
              width={1000}
              height={500}
              src={latestPost.img_url}
              alt={latestPost.title}
              className="max-w-full object-cover rounded-lg border"
            />
            <div className="flex flex-col justify-around">
              <div className="grid gap-4">
                <div className="flex items-center text-sm text-muted-foreground gap-2">
                  <Avatar className="size-6 border">
                    <AvatarImage src={latestPost.author.profilePicture} />
                  </Avatar>
                  <span>{latestPost.author.name}</span>
                  <span className="size-1 bg-muted-foreground rounded-full" />
                  <span>{timeSince(latestPost.created_at)}</span>
                </div>
                <div className="max-h-full overflow-hidden">
                  <h3 className="text-2xl font-bold mb-2">
                    {latestPost.title}
                  </h3>
                  <div
                    dangerouslySetInnerHTML={{ __html: latestPost.content }}
                    className="line-clamp-4 text-foreground/80"
                  />
                </div>
              </div>
              <div className="flex justify-between items-baseline sm:mt-0 mt-5">
                <Badge variant="secondary">{latestPost.category}</Badge>{" "}
                <Link
                  href={`/blog/${latestPost.id}`}
                  className={buttonVariants({ variant: "default" })}
                >
                  Read more <ArrowRight />
                </Link>
              </div>
            </div>
          </div>
        )}
        <div className="flex justify-between items-center">
          <h2 className="text-5xl font-semibold">Latest news</h2>
          <Link
            href="/blog/all"
            className={buttonVariants({ variant: "ghost" })}
          >
            <span>See all</span>
            <ArrowRight />
          </Link>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {otherPosts?.map((post) => (
            <BlogCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
