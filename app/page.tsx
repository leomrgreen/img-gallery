"use client";

import MovieSection from "@/components/MovieSection";

const Home = () => {
  return (
    <section className="p-6">
      <h1 className="text-4xl font-bold mb-6">Home page</h1>
      <MovieSection title="Popular" category="popular" />
      <MovieSection title="Top ranked movies" category="top_rated" />
      <MovieSection title="Coming soon" category="upcoming" />
      <MovieSection title="Now in theatres" category="now_playing" />
    </section>
  );
};

export default Home;
