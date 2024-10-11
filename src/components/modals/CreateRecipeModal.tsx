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
import { useCreateRecipePost } from "@/hooks/post.hook";
import { useUser } from "@/contexts/user.provider";
import { Loader2 } from "lucide-react"; // Import a loading icon
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function CreateRecipeModal() {
  const [title, setTitle] = useState("");
  const [ingredients, setIngredients] = useState<string[]>([]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Modal open state
  const [category, setCategory] = useState("veg"); // New state for category

  // retrieve user _id
  const { user } = useUser();

  // create a recipe
  const { mutate: createRecipe, isPending, isSuccess } = useCreateRecipePost();

  // Close modal when mutation is successful
  if (isSuccess && isOpen) {
    setIsOpen(false);
  }

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient("");
    }
  };

  const handleRemoveIngredient = (index: number) => {
    setIngredients((prevIngredients) =>
      prevIngredients.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async () => {
    const recipeData = {
      title,
      ingredients,
      instructions,
      image,
      userId: user?._id,
      category, // Added category in the request
    };

    createRecipe(recipeData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          className="rounded-full w-[250px]"
          onClick={() => setIsOpen(true)}
        >
          Create Recipe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Create Recipe
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

          {/* Category Selector */}
          <div className="grid gap-2 mt-4">
            <Label htmlFor="category" className="text-lg font-medium">
              Category
            </Label>
            <Select onValueChange={setCategory} value={category}>
              <SelectTrigger className="border outline-green-500 border-gray-300 rounded p-2">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Category Options</SelectLabel>
                  <SelectItem value="veg">Vegetarian</SelectItem>
                  <SelectItem value="non-veg">Non-Vegetarian</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          {/* Ingredients */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Ingredients</h3>
            {ingredients.map((ingredient, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-gray-100 rounded-md mb-2"
              >
                <span>{ingredient}</span>
                <Button
                  onClick={() => handleRemoveIngredient(index)}
                  className="ml-2 text-red-500"
                >
                  Remove
                </Button>
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
            disabled={isPending} // Disable button during loading
          >
            {isPending ? (
              <div>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
              </div>
            ) : (
              "Create Recipe"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
