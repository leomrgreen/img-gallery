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
  image_url: string;
  created_at: string; // Supabase skickar alltid datum som sträng
  author: Author; // Författaren är ett objekt
}

export type Movie = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  overview: string;
};
