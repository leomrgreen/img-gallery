import Link from "next/link";
import React from "react";

const IMDB = ({ link }: { link: number }) => {
  return (
    <Link
      target="_blank"
      href={`https://www.imdb.com/title/${link}`}
      className="bg-yellow-400 text-black font-extrabold text-lg w-fit px-3 py-1 rounded-md hover:bg-yellow-300/90 transition-colors"
    >
      Read more on IMDb
    </Link>
  );
};

export default IMDB;
