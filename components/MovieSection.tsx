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
import { Movie } from "@/lib/types";
import CustomSkeleton from "./CustomSkeleton";
import Link from "next/link";
import { motion } from "framer-motion";
import { API_KEY, BASE_URL, IMAGE_BASE_URL } from "@/lib/constants";

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
          <CustomSkeleton />
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
              <Link href={`/movie/${movie.id}`} key={movie.id} legacyBehavior>
                <CarouselItem className="basis-1/2 sm:basis-1/4 xl:basis-1/5 flex items-center">
                  <motion.div
                    initial={{ opacity: 0, translateY: "1rem" }}
                    transition={{ duration: 0.3 }}
                    whileInView={{
                      translateY: 0,
                      opacity: 1,
                    }}
                  >
                    <Image
                      src={`${IMAGE_BASE_URL}w780${movie.poster_path}`}
                      alt={movie.title}
                      width={1920}
                      height={1080}
                      className="rounded-md h-auto w-full object-contain cursor-pointer"
                    />
                  </motion.div>
                </CarouselItem>
              </Link>
            ))}
          </CarouselContent>
        </Carousel>
      )}
    </div>
  );
};

export default MovieSection;
