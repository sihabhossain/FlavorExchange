"use client";

import PostCard from "@/components/card/PostCard";
import { useGetAllPosts } from "@/hooks/post.hook";
import React, { useEffect, useState } from "react";

const Home = () => {
  const { data, isLoading, isError } = useGetAllPosts();
  const [posts, setPosts] = useState([]);

  // Set posts once data is fetched
  useEffect(() => {
    if (data) {
      setPosts(data?.data);
    }
  }, [data]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading
      ) {
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [isLoading]);

  return (
    <div>
      {isError && <p className="text-center py-4">Error loading posts.</p>}
      {posts.length > 0 && posts.map((post) => <PostCard post={post} />)}
      {isLoading && <p className="text-center py-4">Loading posts...</p>}
    </div>
  );
};

export default Home;
