"use client";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import BlogCard from "@/components/ui/blog-card";
import InfiniteScroll from "@/components/ui/infinite.scroll";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types";
import { timeSince } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const POSTS_PER_PAGE = 4;

const AllBlogPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchData = async () => {
    setIsLoading(true);
    let { data: blog_posts, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false })
      .range((page - 1) * POSTS_PER_PAGE, page * POSTS_PER_PAGE - 1);

    if (error) {
      console.log(error);
    } else {
      setPosts((prevPosts) => [...prevPosts, ...(blog_posts as Post[])]);
      setHasMore(blog_posts?.length === POSTS_PER_PAGE);
      setPage((prevPage) => prevPage + 1);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="grid gap-5 pt-5">
      <h1 className="text-5xl">Articles / Blog posts</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {posts?.map((post) => (
          <BlogCard post={post} key={post.id} />
        ))}
      </div>
      <div className={`${hasMore ? "block" : "hidden"}`}>
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchData}
          isLoading={isLoading}
        >
          <p className="text-center text-muted-foreground">
            Loading more posts...
          </p>
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default AllBlogPostsPage;
