"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card } from "./ui/card";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const PAGE_SIZE = 12; // Antal filmer per sida

const Movies = () => {
  const [movies, setMovies] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  const fetchMovies = async (pageNum: number) => {
    setLoading(true);
    try {
      const response = await fetch(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&page=${pageNum}`
      );
      const data = await response.json();

      if (data.results) {
        setMovies((prev) => [...prev, ...data.results]);
        setPage(pageNum);
        setHasMore(data.results.length >= PAGE_SIZE);
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchMovies(1); // Ladda första sidan vid start
  }, []);

  return (
    <div className="p-4 w-full">
      <h1 className="text-5xl font-bold mb-4">Populära Filmer</h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-6 gap-4 w-full">
        {movies.map((movie) => (
          <Image
            src={`${IMAGE_BASE_URL}${movie.poster_path}`}
            alt={movie.title}
            width={200}
            height={300}
            className="size-full rounded-sm"
            key={movie.id}
          />
        ))}
      </div>

      {/* Pagination */}
      <div className="mt-6 flex justify-center">
        {hasMore && (
          <button
            onClick={() => fetchMovies(page + 1)}
            disabled={loading}
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
          >
            {loading ? "Laddar..." : "Ladda fler"}
          </button>
        )}
      </div>
    </div>
  );
};

export default Movies;
