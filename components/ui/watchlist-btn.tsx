import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { supabase } from "@/lib/supabase";

import { BiSolidBookmarkMinus } from "react-icons/bi";
import { BiBookmarkPlus } from "react-icons/bi";
import { BiLoaderAlt } from "react-icons/bi"; // Loader ikon

const checkIfInWatchlist = async (userId: string, movieId: number) => {
  const { data, error } = await supabase
    .from("watchlist")
    .select("*")
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) {
    console.error("Error checking watchlist:", error);
    return false;
  }

  return data && data.length > 0;
};

export const addToWatchlist = async (
  userId: string,
  movie: { id: number; title: string; poster_path: string }
) => {
  const { data, error } = await supabase.from("watchlist").insert([
    {
      user_id: userId,
      movie_id: movie.id,
      movie_title: movie.title,
      poster_path: movie.poster_path,
    },
  ]);

  if (error) {
    console.error("Error adding movie to watchlist:", error);
    return null;
  }

  return data;
};

export const removeFromWatchlist = async (userId: string, movieId: number) => {
  const { data, error } = await supabase
    .from("watchlist")
    .delete()
    .eq("user_id", userId)
    .eq("movie_id", movieId);

  if (error) {
    console.error("Error removing movie from watchlist:", error);
    return null;
  }

  return data;
};

export const WatchListBtn = ({
  userId,
  movie,
}: {
  userId: string;
  movie: { id: number; title: string; poster_path: string };
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  useEffect(() => {
    const checkWatchlistStatus = async () => {
      const exists = await checkIfInWatchlist(userId, movie.id);
      setIsInWatchlist(exists);
    };

    checkWatchlistStatus();
  }, [userId, movie.id]);

  const handleClick = async () => {
    if (loading) return; // Förhindra spam-klick
    setLoading(true);

    if (isInWatchlist) {
      await removeFromWatchlist(userId, movie.id);
      setIsInWatchlist(false);
    } else {
      await addToWatchlist(userId, movie);
      setIsInWatchlist(true);
    }

    setLoading(false);
  };

  return (
    <Button onClick={handleClick} className="w-fit" disabled={loading}>
      {loading ? (
        <BiLoaderAlt className="animate-spin" />
      ) : isInWatchlist ? (
        <BiSolidBookmarkMinus />
      ) : (
        <BiBookmarkPlus />
      )}
    </Button>
  );
};
