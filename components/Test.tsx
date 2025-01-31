"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types"; // Importera typerna
import PostCard from "@/components/ui/post-card";

const PostList = () => {
  const [posts, setPosts] = useState<Post[]>([]); // Typa posts som en array av Post
  const [loading, setLoading] = useState<boolean>(true); // Typa loading som boolean

  useEffect(() => {
    const fetchPosts = async () => {
      const { data, error } = await supabase
        .from("posts")
        .select("*") // Välj de kolumner du vill hämta
        .order("created_at", { ascending: false }); // Sortera posterna efter skapad datum

      if (error) {
        console.error("Fel vid hämtning av inlägg:", error);
      } else {
        setPosts(data); // Sätt data till state
      }

      setLoading(false); // Stäng av loading
    };

    fetchPosts();
  }, []); // Kör en gång vid komponentens laddning

  if (loading) {
    return <p>Laddar inlägg...</p>;
  }

  return (
    <div className="w-full">
      <h2>Inlägg</h2>
      {posts.length === 0 ? (
        <p>Inga inlägg att visa.</p>
      ) : (
        <ul className="grid grid-cols-3 w-full gap-5">
          {posts.map((post) => (
            <PostCard post={post} key={post.id} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
