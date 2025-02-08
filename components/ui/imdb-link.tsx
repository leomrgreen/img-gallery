import Link from "next/link";
import React from "react";
import { buttonVariants } from "./button";

const IMDB = ({ link }: { link: number }) => {
  return (
    <Link
      target="_blank"
      href={`https://www.imdb.com/title/${link}`}
      className={buttonVariants({ variant: "default" })}
    >
      Read more on IMDb
    </Link>
  );
};

export default IMDB;
