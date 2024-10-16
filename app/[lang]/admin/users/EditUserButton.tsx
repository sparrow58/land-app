"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Pencil } from "lucide-react";
import React, { useState } from "react";
import { UserForm, UserFormValues } from "./UserForm";

type Props = {
  user: UserFormValues;
};
const EditUserButton = ({ user }: Props) => {
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<UserFormValues | null>(null);
  return (
    <>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setEditingUser(user);
          setIsEditDialogOpen(true);
        }}
      >
        <Pencil className="h-4 w-4" />
      </Button>
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>
          </DialogHeader>
          {editingUser && (
            <UserForm
              user={editingUser}
              onClose={() => setIsEditDialogOpen(false)}
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserButton;
