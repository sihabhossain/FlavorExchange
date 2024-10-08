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
import { useUnpublishRecipe } from "@/hooks/post.hook";

export function UnpublishModal({ unpublishId }: { unpublishId: string }) {
  const { mutate: deleteRecipe } = useUnpublishRecipe();

  const handleDelete = (unpublishId: string) => {
    deleteRecipe(unpublishId);
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <button className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-500">
          Unpublish
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
            onClick={() => handleDelete(unpublishId)}
            className="bg-red-500 hover:bg-red-600"
          >
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
