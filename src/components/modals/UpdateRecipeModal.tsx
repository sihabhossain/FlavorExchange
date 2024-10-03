"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function UpdateRecipeModal() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<
    { name: string; checked: boolean }[]
  >([]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [newIngredient, setNewIngredient] = useState("");

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, { name: newIngredient, checked: false }]);
      setNewIngredient("");
    }
  };

  const toggleIngredientChecked = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.map((ingredient, i) =>
        i === index
          ? { ...ingredient, checked: !ingredient.checked }
          : ingredient
      )
    );
  };

  const handleSubmit = async () => {
    const recipeData = {
      title,
      ingredients,
      instructions,
      image,
      userId: "642fa8c28c1a4e5d12345678",
    };
    // Submit recipeData to your API
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500">
          Update
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Update Recipe
          </DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* Recipe Title */}
          <div className="grid gap-2">
            <Label htmlFor="title" className="text-lg font-medium">
              Title
            </Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Recipe Title"
              className="p-3 text-lg border rounded-md"
            />
          </div>

          {/* Ingredients Checklist */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2"
              >
                <label className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    checked={ingredient.checked}
                    onChange={() => toggleIngredientChecked(index)}
                    className="form-checkbox"
                  />
                  <span className={ingredient.checked ? "line-through" : ""}>
                    {ingredient.name}
                  </span>
                </label>
              </div>
            ))}
            <div className="flex mt-2 space-x-3">
              <Input
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="Add ingredient"
                className="p-3 flex-grow rounded-md"
              />
              <Button onClick={handleAddIngredient} className="px-6 py-3">
                Add
              </Button>
            </div>
          </div>

          {/* Instructions with Rich Text Editor */}
          <div className="grid gap-2">
            <Label htmlFor="instructions" className="text-lg font-medium">
              Instructions
            </Label>
            <ReactQuill
              value={instructions}
              onChange={setInstructions}
              placeholder="Write the recipe instructions..."
              style={{ height: "200px", width: "100%" }}
            />
          </div>

          {/* Image URL */}
          <div className="grid gap-2 mt-4">
            <Label htmlFor="image" className="text-lg font-medium">
              Image URL
            </Label>
            <Input
              id="image"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="p-3 text-lg border rounded-md"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 rounded-md flex items-center text-white "
          >
            Create Recipe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
