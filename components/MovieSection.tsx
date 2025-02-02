"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Image from "next/image";
import { Skeleton } from "./ui/skeleton";
import { Movie } from "@/lib/types";

const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";
const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

const MovieSection = ({
  title,
  category,
}: {
  title: string;
  category: string;
}) => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await fetch(
          `${BASE_URL}/movie/${category}?api_key=${API_KEY}`
        );
        const data = await response.json();
        console.log(data.results);
        setMovies(data.results || []);
      } catch (error) {
        console.error(`Error fetching ${title} movies:`, error);
      } finally {
        setTimeout(() => {
          setLoading(false);
        }, 800);
      }
    };

    fetchMovies();
  }, [category]);

  return (
    <div className="mb-8">
      <h2 className="text-2xl mb-3">{title}</h2>
      {loading ? (
        <div className="flex gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="w-full aspect-video" />
          ))}
        </div>
      ) : (
        <Carousel
          className="w-full relative"
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselPrevious className="absolute left-0 z-[2]" />
          <CarouselNext className="absolute right-0 z-[2]" />
          <CarouselContent className="h-fit">
            {movies.map((movie) => (
              <CarouselItem
                key={movie.id}
                className="basis-1/2 sm:basis-1/4 xl:basis-1/5 flex items-center"
              >
                <Image
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width={1920}
                  height={1080}
                  className="rounded-md h-auto w-full object-contain"
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};

export default MovieSection;
