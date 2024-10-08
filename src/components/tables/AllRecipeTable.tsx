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

export function AllRecipeTable() {
  // Check if user exists before calling useGetMyRecipes
  const { data, isLoading, isError } = useGetAllPosts();
  const recipes: TRecipe[] | undefined = data?.data;

  const handleUpdate = (id: string) => {
    console.log(`Update recipe with id: ${id}`);
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>; // Loading state
  }

  if (isError) {
    return <div className="text-red-500">Error fetching recipes!</div>; // Error state
  }

  // Ensure recipes is an array
  if (!Array.isArray(recipes)) {
    return <div className="text-red-500">No recipes found.</div>; // No recipes state
  }

  return (
    <div className="overflow-x-auto p-4 bg-gray-900 rounded-lg shadow-md">
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
            {recipes.map((recipe) => (
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
                  {/* Pass the entire recipe object */}
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
                {recipes.length}
              </TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>

      {/* Mobile/Card Layout */}
      <div className="md:hidden flex mb-20 flex-col space-y-4">
        {recipes.map((recipe) => (
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
