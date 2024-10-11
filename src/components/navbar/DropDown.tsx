import {
  DropdownMenu,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

import { useUser } from "@/contexts/user.provider";

import { useGetSingleUser } from "@/hooks/user.hook";

export function UserDropdown() {
  const { user: userData } = useUser();
  const { data } = useGetSingleUser(userData?._id || "");

  const user = data?.data;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer" asChild>
        <Avatar>
          <AvatarImage
            className="w-12 h-12 object-cover rounded-full"
            src={user?.profilePhoto}
          />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
    </DropdownMenu>
  );
}
