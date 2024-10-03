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

const recipes = [
  {
    _id: "66fb96cd3cc15c127b4469f5",
    title: "Spaghetti Carbonara",
    ingredients: [
      "200g spaghetti",
      "100g pancetta",
      "2 large eggs",
      "50g pecorino cheese",
      "50g parmesan cheese",
      "Freshly ground black pepper",
      "Salt",
    ],
    instructions:
      "1. Cook the spaghetti in salted boiling water. 2. Fry the pancetta until crispy. 3. Beat the eggs with cheese, pepper, and salt. 4. Drain the spaghetti, mix with pancetta, and stir in the egg mixture. Serve immediately.",
    image:
      "https://images.unsplash.com/photo-1633337474564-1d9478ca4e2e?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isPremium: true,
  },
  {
    _id: "66fb96cd3cc15c127b4469f6",
    title: "Chicken Alfredo",
    ingredients: [
      "200g fettuccine",
      "150g cooked chicken",
      "100ml heavy cream",
      "50g parmesan cheese",
      "2 tbsp butter",
      "Salt and pepper to taste",
      "Fresh parsley for garnish",
    ],
    instructions:
      "1. Cook fettuccine in salted boiling water. 2. In a pan, melt butter and add heavy cream. 3. Stir in parmesan until melted. 4. Add cooked chicken, mix well, and season. 5. Serve over pasta, garnished with parsley.",
    image:
      "https://images.unsplash.com/photo-1611211715116-1e1f17e6aef9?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isPremium: false,
  },
  {
    _id: "66fb96cd3cc15c127b4469f7",
    title: "Vegetable Stir-Fry",
    ingredients: [
      "200g mixed vegetables (broccoli, bell peppers, carrots)",
      "2 tbsp soy sauce",
      "1 tbsp olive oil",
      "1 garlic clove, minced",
      "Salt and pepper to taste",
    ],
    instructions:
      "1. Heat olive oil in a pan. 2. Add garlic and sauté until fragrant. 3. Add vegetables and stir-fry for 5-7 minutes. 4. Pour in soy sauce, stir, and season. Serve hot.",
    image:
      "https://images.unsplash.com/photo-1598511454946-e6e2ae04577f?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    isPremium: true,
  },
  // You can continue adding more recipes
];

export function MyRecipeTable() {
  const handleUpdate = (id: string) => {
    console.log(`Update recipe with id: ${id}`);
  };

  const handlePublish = (id: string) => {
    console.log(`Publish recipe with id: ${id}`);
  };

  const handleUnpublish = (id: string) => {
    console.log(`Unpublish recipe with id: ${id}`);
  };

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
                  {recipe.title}{" "}
                  {recipe.isPremium && (
                    <span className="text-yellow-500">(Premium)</span>
                  )}
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
                <TableCell className="text-gray-400">
                  {recipe.instructions}
                </TableCell>
                <TableCell className="flex space-x-2">
                  <UpdateRecipeModal />
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
            <h2 className="font-medium text-white text-lg">
              {recipe.title}{" "}
              {recipe.isPremium && (
                <span className="text-yellow-500">(Premium)</span>
              )}
            </h2>
            <h3 className="text-gray-400">Ingredients:</h3>
            <ul className="list-disc list-inside text-gray-300 mb-2">
              {recipe.ingredients.map((ingredient, index) => (
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
