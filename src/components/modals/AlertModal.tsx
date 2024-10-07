import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useDeleteRecipe } from "@/hooks/post.hook";

export function DeleteAlert({ deleteId }: { deleteId: string }) {
  const { mutate: deleteRecipe } = useDeleteRecipe();

  const handleDelete = (deleteId: string) => {
    deleteRecipe(deleteId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500">
          Delete
        </button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={() => handleDelete(deleteId)}
            className="bg-red-500 hover:bg-red-600"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
