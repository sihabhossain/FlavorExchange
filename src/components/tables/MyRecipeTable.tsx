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
  },
  // Add more recipes here as needed
];

export function RecipeTable() {
  return (
    <div className="overflow-x-auto p-4 bg-green-50 rounded-lg shadow-md">
      <Table>
        <TableCaption>A list of your favorite recipes.</TableCaption>
        <TableHeader>
          <TableRow className="bg-green-100 text-green-700">
            <TableHead className="w-[100px]">Image</TableHead>
            <TableHead className="w-[150px]">Recipe Name</TableHead>
            <TableHead>Ingredients</TableHead>
            <TableHead>Instructions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {recipes.map((recipe) => (
            <TableRow key={recipe._id} className="hover:bg-green-50">
              <TableCell>
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-20 h-20 object-cover rounded-md shadow"
                />
              </TableCell>
              <TableCell className="font-medium text-green-800">
                {recipe.title}
              </TableCell>
              <TableCell>
                <ul className="list-disc list-inside">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index} className="text-gray-700">
                      {ingredient}
                    </li>
                  ))}
                </ul>
              </TableCell>
              <TableCell className="text-gray-700">
                {recipe.instructions}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={3} className="font-semibold text-green-800">
              Total Recipes
            </TableCell>
            <TableCell className="text-center text-green-600">
              {recipes.length}
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  );
}
