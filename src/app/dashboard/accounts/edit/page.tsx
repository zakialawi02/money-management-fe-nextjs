"use client";

import ModalForm from "@/components/modal-form";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

export default function EditAccountPage() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="w-full max-w-[50rem] my-4 mx-auto">
      <CardContent>
        <Button onClick={() => setIsOpen(true)}>Open Modal</Button>

        <ModalForm
          open={isOpen}
          onClose={() => setIsOpen(false)}
          textHeader="Create Item"
          textDescription="Isi data berikut untuk menambahkan item baru."
          footer={
            <div className="flex justify-end gap-2">
              <Button onClick={() => setIsOpen(false)}>Cancel</Button>
              <Button
                onClick={() => {
                  setIsOpen(false);
                }}
              >
                Save
              </Button>
            </div>
          }
        >
          <input type="text" placeholder="Nama Item" className="input" />
          <input type="text" placeholder="Deskripsi" className="input" />
        </ModalForm>

        <form>
          <div className="text-center mt-10 text-foreground">
            Edit Account Page
          </div>

          <Button type="submit" className="mt-4">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
