"use client";

import { Account } from "@/types/auth.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCurrency, formatDateSimpleLong } from "@/lib/utils";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";
import DialogDelete from "./dialog-delete-confirmation";
import { useState } from "react";
import Link from "next/link";

type Props = {
  accountData: Account[];
  onDelete: (id: string) => void;
};

export default function TableAccountLists({ accountData, onDelete }: Props) {
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setOpenDialog(true);
  };

  const confirmDelete = () => {
    if (selectedId) {
      onDelete(selectedId);
      setOpenDialog(false);
      setSelectedId(null);
    }
  };

  return (
    <>
      <Table className="w-full">
        <TableHeader>
          <TableRow>
            <TableHead className="w-min-[150px]">id</TableHead>
            <TableHead className="w-min-[150px]">Name</TableHead>
            <TableHead className="w-min-[150px]">Balance</TableHead>
            <TableHead className="w-min-[250px]">Description</TableHead>
            <TableHead className="w-min-[150px] whitespace-nowrap">
              Created At
            </TableHead>
            <TableHead className="w-min-[150px] whitespace-nowrap">
              Updated At
            </TableHead>
            <TableHead className="text-right w-min-[200px]">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {accountData?.length > 0 ? (
            accountData?.map((data) => (
              <TableRow
                className="bg-secondary-background text-foreground"
                key={data?.id}
              >
                <TableCell className="text-left">
                  {data?.id?.slice(0, 7)}...
                </TableCell>
                <TableCell>{data?.name}</TableCell>
                <TableCell className="whitespace-nowrap">
                  {formatCurrency(data?.balance)}
                </TableCell>
                <TableCell>{data?.description?.slice(0, 15)}...</TableCell>
                <TableCell>
                  {data?.created_at
                    ? formatDateSimpleLong(data.created_at, "en-US")
                    : "-"}
                </TableCell>
                <TableCell>
                  {data?.updated_at
                    ? formatDateSimpleLong(data.updated_at, "en-US")
                    : "-"}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Link href={`/dashboard/accounts/edit/${data.id}`}>
                      <Button
                        size="icon-sm"
                        variant="reverse"
                        className="bg-foreground text-secondary-background"
                        color="secondary"
                      >
                        <Pencil />
                      </Button>
                    </Link>
                    <Button
                      size="icon-sm"
                      variant="reverse"
                      className="bg-error text-foreground"
                      onClick={() => handleDeleteClick(data.id)}
                    >
                      <Trash2 />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow className="bg-secondary-background">
              <TableCell colSpan={5} className="text-center text-foreground">
                No data available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <DialogDelete
        textConfirmation="Are you sure you want to delete this account? This action cannot be undone."
        open={openDialog}
        onCancel={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
