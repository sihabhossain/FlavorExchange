"use client";

import { useState, useEffect } from "react";
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
import { TRecipe } from "@/types";
import { useUpdateRecipe } from "@/hooks/post.hook";
import { useUser } from "@/contexts/user.provider";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

export function UpdateRecipeModal({ recipe }: { recipe: TRecipe }) {
  const [open, setOpen] = useState(false); // State to control the dialog's open state
  const [title, setTitle] = useState(recipe.title || "");
  const [instructions, setInstructions] = useState(recipe.instructions || "");
  const [image, setImage] = useState(recipe.image || "");

  const { mutate: UpdateRecipe } = useUpdateRecipe(recipe?._id);
  const { user } = useUser();

  // Set default values from the recipe prop
  useEffect(() => {
    if (recipe) {
      setTitle(recipe.title);
      setInstructions(recipe.instructions);
      setImage(recipe.image);
    }
  }, [recipe]);

  // Handle form submission
  const handleSubmit = async () => {
    const updatedRecipeData = {
      title,
      instructions,
      image,
      userId: user?._id,
    };

    UpdateRecipe(updatedRecipeData, {
      onSuccess: () => {
        setOpen(false); // Close the modal on success
      },
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setOpen(true)} // Open the modal on button click
          className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-500"
        >
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
            className="px-8 py-3 rounded-md flex items-center text-white"
          >
            Update Recipe
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
