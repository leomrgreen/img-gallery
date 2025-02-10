"use client";

import InfiniteScroll from "@/components/ui/infinite.scroll";
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from "@/lib/constants";
import { Movie } from "@/lib/types";
import { formatRuntime, formatVoteCount, getReleaseYear } from "@/lib/utils";
import { Loader2, Star } from "lucide-react";
import Image from "next/image";
import React, { useState } from "react";

const TopPage = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [hasMore, setHasMore] = useState<boolean>(true);

  const fetchMovies = async () => {
    setIsLoading(true);
    try {
      const res = await fetch(
        `${BASE_URL}/movie/top_rated?api_key=${API_KEY}&page=${page}`
      );
      const data = await res.json();

      setMovies((prevMovies) => [...prevMovies, ...(data.results as Movie[])]);

      setHasMore(page < 5); // Stoppar infinite scroll efter 5 sidor
      setPage((prevPage) => prevPage + 1);
      console.log(hasMore);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ul className="mx-auto w-full flex flex-col gap-5 border p-2 rounded-lg mt-5 max-w-[40rem]">
      {movies.map((movie, idx) => (
        <li key={idx} className="flex items-center gap-2 border-b pb-2">
          <Image
            src={`${IMAGE_BASE_URL}w780/${movie.poster_path}`}
            alt={movie.title}
            className="max-w-[5rem] sm:max-w-[10rem] rounded-md"
            height={150}
            width={100}
          />
          <div className="flex flex-col gap-2">
            <span className="flex items-center gap-1">
              <span>{idx + 1}.</span>
              <span>{movie.title}</span>
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
        </li>
      ))}
      <div className={`${hasMore ? "block" : "hidden"}`}>
        <InfiniteScroll
          hasMore={hasMore}
          next={fetchMovies}
          isLoading={isLoading}
          threshold={10}
        >
          <Loader2 className="animate-spin size-10 mx-auto" />
        </InfiniteScroll>
      </div>
    </ul>
  );
};

export default TopPage;
