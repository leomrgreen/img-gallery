"use client";
import { Button } from "@/components/ui/button";
import {
  removeFromWatchlist,
  WatchListBtn,
} from "@/components/ui/watchlist-btn";
import { IMAGE_BASE_URL } from "@/lib/constants";
import { supabase } from "@/lib/supabase";
import { formatVoteCount, getReleaseYear } from "@/lib/utils";
import { useUser } from "@clerk/nextjs";
import { Minus, Star } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { BiSolidBookmarkMinus } from "react-icons/bi";

const Watchlist = () => {
  const { user } = useUser();
  const [watchListMovies, setWatchListMovies] = useState<any[]>([]);
  const [removingId, setRemovingId] = useState<number | null>(null);

  const fetchWatchList = async () => {
    if (!user?.id) return;

    const { data, error } = await supabase
      .from("watchlist")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching watchlist:", error);
    } else {
      setWatchListMovies(data || []);
    }
  };

  useEffect(() => {
    fetchWatchList();
  }, [user?.id]);

  const handleRemove = async (movieId: number) => {
    if (!user?.id) return;

    setRemovingId(movieId); // Set the movie ID being removed

    await removeFromWatchlist(user.id, movieId);

    setWatchListMovies((prev) =>
      prev.filter((movie) => movie.movie_id !== movieId)
    );
    setRemovingId(null);
  };

  return (
    <section>
      <h1 className="text-6xl">Watchlist</h1>
      {watchListMovies.length <= 0 && (
        <p className="mb-10">This list is empty</p>
      )}
      <ul className="mx-auto w-full grid grid-cols-3 gap-5">
        <AnimatePresence>
          {watchListMovies.map((movie) => (
            <motion.li
              key={movie.movie_id}
              className="flex flex-col items-center gap-2 relative"
              initial={{ opacity: 1, scale: 1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ duration: 0.3 }}
            >
              <Button
                className="absolute top-0 right-0"
                size="icon"
                onClick={() => handleRemove(movie.movie_id)}
              >
                <BiSolidBookmarkMinus />
              </Button>
              <Link href={`/movie/${movie.movie_id}`} legacyBehavior>
                <Image
                  src={`${IMAGE_BASE_URL}w1280/${movie.poster_path}`}
                  alt={movie.movie_title}
                  className="rounded-md w-full"
                  height={1000}
                  width={1000}
                />
              </Link>

              <div className="flex flex-col gap-2">
                <span className="flex items-center gap-1">
                  <span>{movie.movie_title}</span>
                </span>
                <span className="text-muted-foreground">
                  {movie.release_date && (
                    <span>{getReleaseYear(movie?.release_date)}</span>
                  )}
                </span>
                <span>
                  {movie.vote_average && (
                    <div className="flex gap-1 text-muted-foreground items-center">
                      <Star className="size-4 text-primary" />
                      <p>{parseFloat(movie?.vote_average ?? "0").toFixed(2)}</p>
                      <span>({formatVoteCount(movie.vote_count)})</span>
                    </div>
                  )}
                </span>
              </div>
            </motion.li>
          ))}
        </AnimatePresence>
      </ul>
    </section>
  );
};

export default Watchlist;
