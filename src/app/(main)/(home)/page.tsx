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
  const [selectedCategory, setSelectedCategory] = useState<string>("all"); // State for selected category

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

  // Filter posts based on search input and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory; // Adjust the property based on your data structure
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="p-4">
      {isError && <p className="text-center py-4">Error loading posts.</p>}

      {/* Sorting and Filtering UI */}
      <div className="mb-4 flex flex-col md:flex-row justify-center space-y-4 md:space-y-0 md:space-x-4">
        {/* Sorting UI */}
        <div className="w-full md:w-[280px]">
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

        {/* Filtering UI */}
        <div className="w-full md:w-[280px]">
          <label className="mr-2 font-semibold">Filter by category:</label>
          <Select onValueChange={setSelectedCategory} value={selectedCategory}>
            <SelectTrigger className="border outline-green-500 border-gray-300 rounded p-2">
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Category Options</SelectLabel>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="veg">Vegetarian</SelectItem>
                <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                {/* Add more categories as needed */}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
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
