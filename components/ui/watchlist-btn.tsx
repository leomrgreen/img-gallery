import React, { useEffect, useState } from "react";
import { Button } from "./button";
import { supabase } from "@/lib/supabase";

// Kontrollera om filmen finns i användarens watchlist
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

  if (!data || data.length === 0) {
    return false;
  }

  return true;
};

// Lägg till film i användarens watchlist
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

// Ta bort film från användarens watchlist
const removeFromWatchlist = async (userId: string, movieId: number) => {
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

// Watchlist-knappen
export const WatchListBtn = ({
  userId,
  movie,
}: {
  userId: string;
  movie: { id: number; title: string; poster_path: string };
}) => {
  const [isInWatchlist, setIsInWatchlist] = useState(false);

  // Kontrollera statusen för om filmen finns i watchlist vid uppstart
  useEffect(() => {
    const checkWatchlistStatus = async () => {
      const exists = await checkIfInWatchlist(userId, movie.id);
      setIsInWatchlist(exists);
    };

    checkWatchlistStatus();
  }, [userId, movie.id]);

  // Hantera klick på knappen (lägg till eller ta bort från watchlist)
  const handleClick = async () => {
    if (isInWatchlist) {
      const result = await removeFromWatchlist(userId, movie.id);
      if (result) {
        console.log("Movie removed from watchlist:", result);
        setIsInWatchlist(false); // Uppdatera state för att visa att filmen togs bort
      }
    } else {
      const result = await addToWatchlist(userId, movie);
      if (result) {
        console.log("Movie added to watchlist:", result);
        setIsInWatchlist(true); // Uppdatera state för att visa att filmen lades till
      }
    }
  };

  return (
    <Button onClick={handleClick}>
      {isInWatchlist ? "Remove from watchlist" : "Add to watchlist"}
    </Button>
  );
};
