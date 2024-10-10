"use client";

import PostCard from "@/components/card/PostCard";
import Loader from "@/components/loader/Loader";
import { useSearch } from "@/contexts/search.provider";
import { useGetAllPosts } from "@/hooks/post.hook";
import { PostCardProps } from "@/types";
import React, { useEffect, useState } from "react";

const Home: React.FC = () => {
  const { data, isLoading, isError } = useGetAllPosts();
  const [posts, setPosts] = useState<PostCardProps[]>([]); // Specify the type here
  const { searchInput } = useSearch(); // Get the search input from context

  // Set posts once data is fetched
  useEffect(() => {
    if (data) {
      setPosts(data?.data); // Make sure data matches the Post type
    }
  }, [data]);

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        !isLoading
      ) {
        // Fetch more posts when scrolled to bottom
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isLoading]);

  // Filter posts based on search input
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div>
      {isError && <p className="text-center py-4">Error loading posts.</p>}
      {filteredPosts.length > 0 &&
        filteredPosts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
