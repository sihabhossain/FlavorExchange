"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UpdateRecipeModal } from "../modals/UpdateRecipeModal";
import { TRecipe } from "@/types";
import DOMPurify from "dompurify";
import { useGetAllPosts } from "@/hooks/post.hook";
import { UnpublishModal } from "../modals/UnpublishModal";
import { useState } from "react";
import Loader from "../loader/Loader";

export function AllRecipeTable() {
  const { data, isLoading, isError } = useGetAllPosts();
  const recipes: TRecipe[] | undefined = data?.data;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const handleUpdate = (id: string) => {
    console.log(`Update recipe with id: ${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="text-red-500">Error fetching recipes!</div>; // Error state
  }

  // Ensure recipes is an array
  if (!Array.isArray(recipes)) {
    return <div className="text-red-500">No recipes found.</div>; // No recipes state
  }

  // Filter and sort recipes
  const filteredRecipes = recipes
    .filter((recipe) => {
      if (selectedCategory === "all") return true;
      return recipe.category === selectedCategory; // Assuming each recipe has a category property
    })
    .filter((recipe) =>
      recipe.title.toLowerCase().includes(searchQuery.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.title.localeCompare(b.title);
      } else {
        return b.title.localeCompare(a.title);
      }
    });

  return (
    <div className="overflow-x-auto p-4 bg-gray-900 rounded-lg shadow-md">
      {/* Filter, Search, and Sort Section */}
      <div className="mb-4 flex flex-col md:flex-row md:space-x-4">
        {/* Category Filter */}
        <div className="flex flex-col mb-2 md:mb-0">
          <label className="text-white mb-1">Filter by category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="all">All</option>
            <option value="veg">Veg</option>
            <option value="non-veg">Non-Veg</option>
          </select>
        </div>

        {/* Search Bar */}
        <div className="flex flex-col mb-2 md:mb-0">
          <label className="text-white mb-1">Search:</label>
          <input
            type="text"
            placeholder="Search recipes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          />
        </div>

        {/* Sort Order */}
        <div className="flex flex-col">
          <label className="text-white mb-1">Sort by:</label>
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}
            className="p-2 rounded bg-gray-800 text-white border border-gray-700"
          >
            <option value="asc">Title Ascending</option>
            <option value="desc">Title Descending</option>
          </select>
        </div>
      </div>

      {/* Desktop/Table Layout */}
      <div className="hidden md:block">
        <Table>
          <TableCaption className="text-white">
            A list of your favorite recipes.
          </TableCaption>
          <TableHeader>
            <TableRow className="bg-gray-800 text-white">
              <TableHead className="w-[100px]">Image</TableHead>
              <TableHead className="w-[150px]">Recipe Name</TableHead>
              <TableHead>Ingredients</TableHead>
              <TableHead>Instructions</TableHead>
              <TableHead className="w-[200px]">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredRecipes.map((recipe) => (
              <TableRow key={recipe._id} className="hover:bg-gray-700">
                <TableCell>
                  <img
                    src={recipe.image}
                    alt={recipe.title}
                    className="w-20 h-20 object-cover rounded-md shadow"
                  />
                </TableCell>
                <TableCell className="font-medium text-white">
                  {recipe.title}
                </TableCell>
                <TableCell>
                  <ul className="list-disc list-inside text-gray-400">
                    {recipe.ingredients.map((ingredient, index) => (
                      <li key={index} className="text-gray-300">
                        {ingredient}
                      </li>
                    ))}
                  </ul>
                </TableCell>
                <TableCell
                  dangerouslySetInnerHTML={{
                    __html: DOMPurify.sanitize(recipe?.instructions || ""),
                  }}
                  className="text-gray-400"
                ></TableCell>
                <TableCell className="flex space-x-2">
                  <UpdateRecipeModal recipe={recipe} />
                  <UnpublishModal unpublishId={recipe?._id} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

          <TableFooter>
            <TableRow>
              <TableCell colSpan={4} className="font-semibold text-white">
                Total Recipes
              </TableCell>
              <TableCell className="text-center text-gray-400">
                {filteredRecipes.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Mobile/Card Layout */}
      <div className="md:hidden flex mb-20 flex-col space-y-4">
        {filteredRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="font-medium text-white text-lg">{recipe.title} </h2>
            <h3 className="text-gray-400">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-300 mb-2">
              {recipe.ingredients.map((ingredient, index: number) => (
                <li key={index}>{ingredient}</li>
              ))}
            </ul>
            <h3 className="text-gray-400">Instructions:</h3>
            <p className="text-gray-300 mb-2">{recipe.instructions}</p>
            <div className="flex space-x-2">
              <button
                onClick={() => handleUpdate(recipe._id)}
                className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
              >
                Update
              </button>
              <UnpublishModal unpublishId={recipe?._id} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
