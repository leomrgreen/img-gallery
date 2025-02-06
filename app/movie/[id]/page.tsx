"use client";

import IMDB from "@/components/ui/imdb-link";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Movie } from "@/lib/types";
import { formatRuntime, getReleaseYear } from "@/lib/utils";
import { Star } from "lucide-react";
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
  }, [id]);

  return (
    <div className="w-full relative max-w-[70rem] mx-auto mt-5 grid gap-4">
      {isLoading && (
        <>
          <Skeleton className="w-[30%] h-10" />
          <Skeleton className="w-full aspect-video" />{" "}
          <div className="grid gap-2">
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-full h-4" />
            <Skeleton className="w-[90%] h-4" />
          </div>
          <div className="grid grid-cols-2">
            <div className="grid gap-3">
              <div className="grid gap-2">
                <Skeleton className="w-[15%] h-3" />
                <Skeleton className="w-[9%] h-3" />
                <Skeleton className="w-[9%] h-3" />
                <Skeleton className="w-[9%] h-3" />
              </div>
              <div className="grid gap-2">
                <Skeleton className="w-[15%] h-3" />
                <Skeleton className="w-[9%] h-3" />
                <Skeleton className="w-[9%] h-3" />
                <Skeleton className="w-[9%] h-3" />
              </div>
            </div>
            <div className="grid mx-auto">
              <Skeleton className="w-[8rem] h-3" />
              <div className="flex flex-wrap gap-2">
                {Array.from({ length: 6 }).map((_, idx) => (
                  <Skeleton className="size-7 rounded-full" key={idx} />
                ))}
              </div>
              <Skeleton className="w-[10rem] h-8" />
            </div>
          </div>
        </>
      )}
      {!isLoading && (
        <>
          <h1 className="text-3xl lg:text-5xl text-foreground">
            {movie?.title}
          </h1>
          <div className="flex gap-5 text-muted-foreground">
            {movie?.release_date && (
              <span>{getReleaseYear(movie?.release_date)}</span>
            )}
            {movie?.runtime && <span>{formatRuntime(movie?.runtime)}</span>}
          </div>
          <div className="relative aspect-video group">
            <Skeleton className="size-full absolute inset-0 -z-10" />
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie?.backdrop_path}`}
              alt={movie?.title || "Movie backdrop"}
              width={2000}
              height={1000}
              className="object-cover w-full h-full rounded-md lg:group-hover:brightness-[40%] transition-all"
            />
            <Image
              src={`https://image.tmdb.org/t/p/w1280${movie?.poster_path}`}
              alt={movie?.title || "alt text"}
              width={250}
              height={550}
              className="absolute bottom-2 object-contain left-2 max-w-[20rem] rounded-md hidden lg:block shadow-lg opacity-0 group-hover:opacity-100 transition-all"
            />

            <div className="absolute bottom-3 right-3 flex gap-1 items-center text-white bg-black/70 px-2 rounded-sm backdrop-blur-md">
              <Star className="size-4 text-yellow-400" />
              <p>{parseFloat(movie?.vote_average ?? "0").toFixed(2)}</p>
            </div>
          </div>

          <p className="text-base lg:text-lg text-muted-foreground">
            {movie?.overview}
          </p>

          <div className="grid grid-cols-2">
            <div className="grid gap-3">
              <div className="grid gap-1">
                <h5>Languages:</h5>

                <div>
                  {movie?.spoken_languages.map((lang, idx) => (
                    <p className="text-muted-foreground text-sm" key={idx}>
                      {lang.english_name}
                    </p>
                  ))}
                </div>
              </div>
              <div className="grid gap-1">
                <h5>Genres:</h5>
                <div>
                  {movie?.genres.map((genre) => (
                    <p className="text-muted-foreground text-sm" key={genre.id}>
                      {genre.name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
            <div className="mx-auto">
              <div className="grid gap-2">
                <h5>Production companies:</h5>
                <div className="flex gap-3 flex-wrap">
                  {movie?.production_companies.map((company) => (
                    <div key={company.id}>
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Image
                              src={`https://image.tmdb.org/t/p/w500${company.logo_path}`}
                              alt={company.name}
                              className="size-7 sm:size-10 bg-white rounded-full object-contain border"
                              height={50}
                              width={50}
                            />
                          </TooltipTrigger>
                          <TooltipContent className="bg-muted text-foreground border">
                            <p>{company.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  ))}
                </div>
                <div className="mt-5">
                  {movie?.imdb_id && <IMDB link={movie?.imdb_id} />}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleMoviePage;
