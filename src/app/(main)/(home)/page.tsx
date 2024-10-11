"use client";

import PostCard from "@/components/card/PostCard";
import Loader from "@/components/loader/Loader";
import { useSearch } from "@/contexts/search.provider";
import { useGetAllPosts } from "@/hooks/post.hook";
import { PostCardProps } from "@/types";
import React, { useEffect, useState, useRef, useCallback } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Home: React.FC = () => {
  const { data, isLoading, isError } = useGetAllPosts();
  const [posts, setPosts] = useState<PostCardProps[]>([]);
  const { searchInput } = useSearch();
  const [sortOrder, setSortOrder] = useState<string>("upvotes");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [page, setPage] = useState<number>(1);
  const loaderRef = useRef<HTMLDivElement>(null);

  // Load more posts (repeat posts after data is exhausted)
  const loadMorePosts = useCallback(() => {
    if (data?.data) {
      const nextPagePosts = [...posts, ...data.data]; // Append the same data again
      setPosts(nextPagePosts);
      setPage((prevPage) => prevPage + 1);
    }
  }, [data, posts]);

  // Set posts once data is fetched initially
  useEffect(() => {
    if (data?.data) {
      const sortedPosts = data.data.sort(
        (a: PostCardProps, b: PostCardProps) => b.upvotes - a.upvotes
      );
      setPosts(sortedPosts);
    }
  }, [data]);

  // Handle sorting posts
  const handleSortChange = (order: string) => {
    setSortOrder(order);
    const sortedPosts = [...posts];

    if (order === "upvotes") {
      sortedPosts.sort((a, b) => b.upvotes - a.upvotes);
    }

    setPosts(sortedPosts);
  };

  // Infinite scroll logic using IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry.isIntersecting && !isLoading) {
          loadMorePosts();
        }
      },
      { threshold: 1 }
    );

    const currentLoaderRef = loaderRef.current;
    if (currentLoaderRef) {
      observer.observe(currentLoaderRef);
    }

    return () => {
      if (currentLoaderRef) {
        observer.unobserve(currentLoaderRef);
      }
    };
  }, [loadMorePosts, isLoading]);

  // Filter posts based on search input and selected category
  const filteredPosts = posts.filter((post) => {
    const matchesSearch = post.title
      .toLowerCase()
      .includes(searchInput.toLowerCase());
    const matchesCategory =
      selectedCategory === "all" || post.category === selectedCategory;
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
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Display filtered posts */}
      {filteredPosts.length > 0 ? (
        filteredPosts.map((post, index) => <PostCard key={index} post={post} />)
      ) : (
        <p className="text-center py-4">No recipes found.</p>
      )}

      {/* Loader for infinite scrolling */}
      {isLoading && <Loader />}

      {/* Intersection observer target for infinite scrolling */}
      <div ref={loaderRef} className="h-10"></div>
    </div>
  );
};

export default Home;
