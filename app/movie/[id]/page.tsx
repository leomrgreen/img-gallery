"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Movie } from "@/lib/types";
import { Star, StarHalf, StarsIcon } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleMoviePage = () => {
  const params = useParams();
  const id = params.id;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const [movie, setMovie] = useState<Movie>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const res = await fetch(
          `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`
        );
        if (!res.ok) throw new Error("Failed to fetch movie");
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]); // Lägg till en dependencies-array

  return (
    <div className="w-full relative max-w-[70rem] mx-auto mt-5 grid gap-3">
      {isLoading && (
        <>
          <Skeleton className="w-full aspect-video" />{" "}
          <Skeleton className="w-[30%] h-10" />
          <div className="grid gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[90%] h-4" />
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <div className="relative aspect-video group">
            <Skeleton className="size-full absolute inset-0 -z-10" />
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
              alt={movie?.title || "Movie backdrop"}
              width={2000}
              height={1000}
              className="object-cover w-full h-full rounded-md lg:group-hover:brightness-75 transition-all"
            />
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`}
              alt={movie?.title || "alt text"}
              width={250}
              height={550}
              className="absolute bottom-2 object-contain left-2 max-w-[20rem] rounded-md hidden lg:block shadow-lg opacity-0 group-hover:opacity-100 transition-all"
            />

            <div className="absolute bottom-3 right-3 flex gap-1 items-center bg-black/70 px-2 rounded-sm backdrop-blur-md">
              <Star className="size-4 text-yellow-400" />
              <p>{parseFloat(movie?.vote_average ?? "0").toFixed(2)}</p>
            </div>
          </div>

          <h1 className="text-3xl lg:text-5xl text-foreground">
            {movie?.title}
          </h1>
          <p className="text-base lg:text-lg text-muted-foreground">
            {movie?.overview}
          </p>
        </>
      )}
    </div>
  );
};

export default SingleMoviePage;
