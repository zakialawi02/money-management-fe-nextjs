"use client";

import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle } from "./ui/dialog";

type Props = {
  open: boolean;
  textConfirmation?: string;
  onCancel: () => void;
  onConfirm: () => void;
};

export default function DialogDelete({
  open,
  textConfirmation = "Are you sure you want to delete this data?",
  onCancel,
  onConfirm,
}: Props) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleClose = () => {
    setIsOpen(false);
    onCancel();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogTitle className="sr-only">Delete Transaction</DialogTitle>
      {/* Removed DialogTrigger as it's controlled by parent */}
      <DialogContent
        className="bg-white border-4 border-black p-4 rounded-md max-w-sm"
        style={{
          boxShadow: "4px 4px 0 black",
        }}
      >
        <h2 className="font-bold text-lg mb-2 text-black">
          Delete Transaction
        </h2>
        <p className="text-black">{textConfirmation}</p>

        <div className="mt-4 flex justify-end gap-2">
          <Button
            onClick={handleClose}
            className="bg-white border-2 border-black text-black hover:bg-gray-200"
          >
            Cancel
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-500 border-2 border-black text-white hover:bg-red-600"
          >
            Delete
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
