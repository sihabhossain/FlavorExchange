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
import { useCreateUser } from "@/hooks/user.hook"; // Make sure you have this hook for user creation
import { Loader2 } from "lucide-react"; // Import a loading icon

export function CreateUserModal() {
  const [name, setName] = useState("");
  const [role, setRole] = useState("USER"); // Default role
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [profilePhoto, setProfilePhoto] = useState("");
  const [isOpen, setIsOpen] = useState(false); // Modal open state

  // Create a user
  const { mutate: createUser, isPending, isSuccess } = useCreateUser();

  // Close modal when mutation is successful
  if (isSuccess && isOpen) {
    setIsOpen(false);
  }

  const handleSubmit = async () => {
    const userData = {
      name,
      role,
      email,
      password,
      mobileNumber,
      profilePhoto,
    };

    createUser(userData);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button onClick={() => setIsOpen(true)}>Create User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[600px] p-6 rounded-lg shadow-lg">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create User</DialogTitle>
        </DialogHeader>
        <div className="grid gap-6 py-4">
          {/* User Name */}
          <div className="grid gap-2">
            <Label htmlFor="name" className="text-lg font-medium">
              Name
            </Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="User Name"
              className="p-3 text-lg border rounded-md"
            />
          </div>

          {/* Role Dropdown */}
          <div className="grid gap-2">
            <Label htmlFor="role" className="text-lg font-medium">
              Role
            </Label>
            <select
              id="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="p-3 text-lg border rounded-md"
            >
              <option value="USER">User</option>
              <option value="ADMIN">Admin</option>
              {/* Add more roles if needed */}
            </select>
          </div>

          {/* User Email */}
          <div className="grid gap-2">
            <Label htmlFor="email" className="text-lg font-medium">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="user@example.com"
              className="p-3 text-lg border rounded-md"
            />
          </div>

          {/* Password */}
          <div className="grid gap-2">
            <Label htmlFor="password" className="text-lg font-medium">
              Password
            </Label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              className="p-3 text-lg border rounded-md"
            />
          </div>

          {/* Mobile Number */}
          <div className="grid gap-2">
            <Label htmlFor="mobileNumber" className="text-lg font-medium">
              Mobile Number
            </Label>
            <Input
              id="mobileNumber"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              placeholder="1234567890"
              className="p-3 text-lg border rounded-md"
            />
          </div>

          {/* Profile Photo URL */}
          <div className="grid gap-2">
            <Label htmlFor="profilePhoto" className="text-lg font-medium">
              Profile Photo URL
            </Label>
            <Input
              id="profilePhoto"
              value={profilePhoto}
              onChange={(e) => setProfilePhoto(e.target.value)}
              placeholder="https://example.com/profile.jpg"
              className="p-3 text-lg border rounded-md"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            onClick={handleSubmit}
            className="px-8 py-3 rounded-md flex items-center text-white"
            disabled={isPending} // Disable button during loading
          >
            {isPending ? (
              <div>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Creating...
              </div>
            ) : (
              "Create User"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
