"use client";

import BlogCard from "@/components/ui/blog-card";
import InfiniteScroll from "@/components/ui/infinite.scroll";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types";
import { ArrowDown, ArrowUp, Loader2 } from "lucide-react";
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectGroup,
  SelectItem,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";

const POSTS_PER_PAGE = 8;

const AllBlogPostsPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [category, setCategory] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const fetchData = async (reset = false) => {
    setIsLoading(true);
    let query = supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: sortOrder === "asc" })
      .range(
        reset ? 0 : (page - 1) * POSTS_PER_PAGE,
        reset ? POSTS_PER_PAGE - 1 : page * POSTS_PER_PAGE - 1
      );

    if (category) {
      query = query.eq("category", category);
    }

    let { data: blog_posts, error } = await query;

    if (error) {
      console.log(error);
    } else {
      setPosts((prevPosts) =>
        reset
          ? (blog_posts as Post[])
          : [...prevPosts, ...(blog_posts as Post[])]
      );
      setHasMore(blog_posts?.length === POSTS_PER_PAGE);
      setPage((prevPage) => (reset ? 2 : prevPage + 1));
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData(true);
  }, [category, sortOrder]);

  return (
    <section className="grid gap-5 pt-5">
      <h1 className="text-5xl">Articles / Blog posts</h1>

      {/* Kategori-filter och sorteringsknapp */}
      <div className="flex flex-wrap items-center gap-4">
        <Select
          value={category || ""}
          onValueChange={(value) => setCategory(value)}
        >
          <SelectTrigger className="w-[20rem]">
            <SelectValue placeholder="Select category" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="Movie">Movie</SelectItem>
              <SelectItem value="Show">Show</SelectItem>
              <SelectItem value="Netflix">Netflix</SelectItem>
              <SelectItem value="Random">Random</SelectItem>
              <SelectItem value="Review">Review</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>

        <Button
          variant="ghost"
          onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
        >
          <span>{sortOrder === "desc" ? "Latest" : "Oldest"}</span>
          <span className="flex items-center">
            <FaArrowUp
              className={`${
                sortOrder === "asc"
                  ? "text-foreground"
                  : "text-muted-foreground/80"
              } -translate-y-0.5`}
            />
            <FaArrowDown
              className={`${
                sortOrder === "asc"
                  ? "text-muted-foreground/80"
                  : "text-foreground"
              } translate-y-0.5`}
            />
          </span>
        </Button>
      </div>

      {/* Bloggkort */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
        {posts?.map((post, idx) => (
          <BlogCard post={post} key={post.id + idx} />
        ))}
      </div>

      {/* Infinite Scroll */}
      <div className={`${hasMore ? "block" : "hidden"}`}>
        <InfiniteScroll
          hasMore={hasMore}
          next={() => fetchData()}
          isLoading={isLoading}
          threshold={0}
        >
          <Loader2 className="animate-spin mx-auto size-8" />
        </InfiniteScroll>
      </div>
    </section>
  );
};

export default AllBlogPostsPage;
