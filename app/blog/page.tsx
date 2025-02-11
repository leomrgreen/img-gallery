import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardHeader } from "@/components/ui/card";
import { supabase } from "@/lib/supabase";
import { timeSince } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import React from "react";

const BlogPage = async () => {
  let { data: blog_posts, error } = await supabase
    .from("blog_posts")
    .select("*")
    .range(0, 4);

  if (error) {
    console.log(error);
  } else {
    console.log(blog_posts);
  }

  return (
    <section className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <h2 className="text-5xl font-semibold">Latest news</h2>
          <Button variant="ghost">
            <span>See all</span>
            <ArrowRight />
          </Button>
        </div>
        <div className="grid sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
          {blog_posts?.map((post) => (
            <Card
              key={post.id}
              className="flex flex-col border-none shadow-none gap-5"
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
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogPage;
