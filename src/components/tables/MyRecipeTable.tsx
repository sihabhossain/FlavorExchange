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
import { useGetMyRecipes } from "@/hooks/user.dashboard";
import { useUser } from "@/contexts/user.provider";
import { TRecipe } from "@/types";
import { DeleteAlert } from "../modals/AlertModal";
import DOMPurify from "dompurify";
import { useState } from "react";
import Loader from "../loader/Loader";

export function MyRecipeTable() {
  const { user } = useUser();
  const { data, isLoading, isError } = useGetMyRecipes(user?._id || "");
  const recipes: TRecipe[] | undefined = data?.data;

  const [selectedCategory, setSelectedCategory] = useState("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // State for sorting
  const recipesPerPage = 3;

  const handleUpdate = (id: string) => {
    console.log(`Update recipe with id: ${id}`);
  };

  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    return <div className="text-red-500">Error fetching recipes!</div>;
  }

  if (!Array.isArray(recipes)) {
    return <div className="text-red-500">No recipes found.</div>;
  }

  // Filter recipes based on the selected category and search query
  const filteredRecipes = recipes.filter((recipe) => {
    const matchesCategory =
      selectedCategory === "all" || recipe.category === selectedCategory;
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Sort recipes by title
  const sortedRecipes = filteredRecipes.sort((a, b) => {
    const titleA = a.title.toLowerCase();
    const titleB = b.title.toLowerCase();
    if (sortOrder === "asc") {
      return titleA < titleB ? -1 : titleA > titleB ? 1 : 0;
    } else {
      return titleA > titleB ? -1 : titleA < titleB ? 1 : 0;
    }
  });

  // Calculate total pages
  const totalPages = Math.ceil(sortedRecipes.length / recipesPerPage);

  // Get current recipes for pagination
  const startIndex = (currentPage - 1) * recipesPerPage;
  const currentRecipes = sortedRecipes.slice(
    startIndex,
    startIndex + recipesPerPage
  );

  return (
    <div className="overflow-x-auto mb-10 p-4 bg-gray-900 rounded-lg shadow-md">
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
            {currentRecipes.map((recipe) => (
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
                  <DeleteAlert deleteId={recipe?._id} />
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
        {currentRecipes.map((recipe) => (
          <div
            key={recipe._id}
            className="bg-gray-800 p-4 rounded-lg shadow-md flex flex-col"
          >
            <img
              src={recipe.image}
              alt={recipe.title}
              className="w-full h-48 object-cover rounded-md mb-2"
            />
            <h2 className="font-medium text-white text-lg">{recipe.title}</h2>
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
              <DeleteAlert deleteId={recipe?._id} />
            </div>
          </div>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Previous
        </button>
        <span className="text-white">
          Page {currentPage} of {totalPages}
        </span>
        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="bg-gray-800 text-white px-3 py-1 rounded hover:bg-gray-700 disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}
