"use client";

import PostCard from "@/components/card/PostCard";
import React, { useEffect, useState } from "react";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // Simulated data fetching function
  const fetchPosts = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newPosts = Array.from({ length: 5 }, (_, index) => ({
        id: posts.length + index + 1,
        // Add more post data as needed
      }));
      setPosts((prevPosts) => [...prevPosts, ...newPosts]);
      setLoading(false);
      if (newPosts.length < 5) {
        setHasMore(false); // Simulate no more posts
      }
    }, 1000); // Simulate network delay
  };

  // Infinite scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        hasMore
      ) {
        fetchPosts();
      }
    };

    window.addEventListener("scroll", handleScroll);
    fetchPosts(); // Initial fetch

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [loading, hasMore]);

  return (
    <div>
      {posts.map((post) => (
        <PostCard key={post.id} />
      ))}
      {loading && <p className="text-center py-4">Loading more posts...</p>}
      {!hasMore && <p className="text-center py-4">No more posts to load.</p>}
    </div>
  );
};

export default Home;
