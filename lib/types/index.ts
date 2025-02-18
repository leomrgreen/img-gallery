// types/post.ts
export interface Author {
  id: string;
  name: string;
  email: string;
  profilePicture: string; // Om du har en profilbild
}

export interface Post {
  id: string;
  title: string;
  img_url: string;
  created_at: string; // Supabase skickar alltid datum som sträng
  author: Author; // Författaren är ett objekt
}

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  vote_average: string;
  vote_count: any;
  spoken_languages: { english_name: string; name: string }[];
  genres: { id: number; name: string }[];
  production_companies: { id: number; logo_path: string; name: string }[];
  imdb_id: number;
  release_date: string;
  runtime: number;
};
