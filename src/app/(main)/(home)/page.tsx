"use client";

import PostCard from "@/components/card/PostCard";
import Loader from "@/components/loader/Loader";
import { useSearch } from "@/contexts/search.provider";
import { useGetAllPosts } from "@/hooks/post.hook"; // Adjust this to fetch recipes
import { PostCardProps } from "@/types"; // Ensure PostCardProps includes upvotes
import React, { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import your Select components

const Home: React.FC = () => {
  const { data, isLoading, isError } = useGetAllPosts();
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const { searchInput } = useSearch();
  const [sortOrder, setSortOrder] = useState<string>(""); // Set default sort to an empty string

  // Set posts once data is fetched
  useEffect(() => {
    if (data) {
      const sortedPosts = data.data.sort(
        (a: PostCardProps, b: PostCardProps) => b.upvotes - a.upvotes
      );
      setPosts(sortedPosts);
    }
  }, [data]);

  // Sorting function
  const handleSortChange = (order: string) => {
    setSortOrder(order);
    const sortedPosts = [...posts];

    if (order === "upvotes") {
      sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
    }

    setPosts(sortedPosts);
  };

  // Filter posts based on search input
  const filteredPosts = posts.filter((post) =>
    post.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  return (
    <div className="p-4">
      {isError && <p className="text-center py-4">Error loading posts.</p>}

      {/* Sorting UI */}
      <div className="mb-4 w-[200px] ml-48">
        <label className="mr-2 font-semibold">Sort by:</label>
        <Select onValueChange={handleSortChange} value={sortOrder}>
          <SelectTrigger className="border outline-green-500 border-gray-300 rounded p-2">
            <SelectValue placeholder="Select sorting option" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Sort Options</SelectLabel>
              <SelectItem value="upvotes">Most Popular</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => <PostCard key={index} post={post} />)
      ) : (
        <p className="text-center py-4">No recipes found.</p>
      )}

      {isLoading && <Loader />}
    </div>
  );
};

export default Home;
