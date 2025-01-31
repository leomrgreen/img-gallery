"use client";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/types"; // Importera typerna

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
    <div>
      <h2>Inlägg</h2>
      {posts.length === 0 ? (
        <p>Inga inlägg att visa.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{new Date(post.created_at).toLocaleDateString()}</p>
              <p>Författare: {post.author.name}</p>
              <img
                src={post.author.profilePicture}
                className="size-8 rounded-full"
              />
              {post.image_url && (
                <img src={post.image_url} alt="haha" className="size-32" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PostList;
