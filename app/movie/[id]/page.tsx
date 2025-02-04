"use client";

import { Movie } from "@/lib/types";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";

const SingleMoviePage = () => {
  const params = useParams();
  const id = params.id;
  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const BASE_URL = "https://api.themoviedb.org/3";
  const [movie, setMovie] = useState<Movie | null>(null);

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
      } catch (err) {
        console.error("Error fetching movie:", err);
      }
    };

    if (id) {
      fetchMovie();
    }
  }, [id]); // Lägg till en dependencies-array

  if (!movie) return <p>Loading...</p>;

  return (
    <div className="w-full relative max-w-[70rem] mx-auto">
      <Image
        src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
        alt={movie.title}
        height={1000}
        width={2000}
        className="w-full mx-auto"
      />
      <h1 className="text-3xl lg:text-5xl text-foreground">{movie.title}</h1>
      <p className="text-base lg:text-lg text-muted-foreground">
        {movie.overview}
      </p>
    </div>
  );
};

export default SingleMoviePage;
