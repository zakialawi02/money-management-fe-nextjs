import { Transaction } from "@/types/auth.types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn, formatCurrency, formatDateSimple } from "@/lib/utils";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Trash2 } from "lucide-react";
import DialogDelete from "./dialog-delete-confirmation";
import { useState } from "react";

type Props = {
  transactionData: Transaction[];
  onDelete: (id: string) => void;
};

export default function TableTransactions({
  transactionData,
  onDelete,
}: Props) {
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
            <TableHead className="w-[150px]">Date</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Category</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {transactionData?.length > 0 ? (
            transactionData?.map((data) => (
              <TableRow
                className="bg-secondary-background text-foreground"
                key={data?.id}
              >
                <TableCell className="text-left">
                  {formatDateSimple(data?.date)}
                </TableCell>
                <TableCell
                  className={cn(
                    "capitalize",
                    data?.type === "expense" ? "text-error" : "text-success"
                  )}
                >
                  {data?.type}
                </TableCell>
                <TableCell
                  className={cn(
                    data?.type === "expense" ? "text-error" : "text-success"
                  )}
                >
                  {data?.type === "expense"
                    ? `- ${formatCurrency(data?.amount)}`
                    : formatCurrency(data?.amount)}
                </TableCell>
                <TableCell>
                  {data?.category?.name && (
                    <Badge
                      className="capitalize text-black dark:text-black text-inverse rounded-none border-black border-2"
                      style={{ backgroundColor: data?.category?.color }}
                    >
                      {data?.category?.name}
                    </Badge>
                  )}
                </TableCell>
                <TableCell className="text-right">
                  <Button
                    size="icon-sm"
                    variant="reverse"
                    onClick={() => handleDeleteClick(data.id)}
                  >
                    <Trash2 />
                  </Button>
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
        open={openDialog}
        onCancel={() => setOpenDialog(false)}
        onConfirm={confirmDelete}
      />
    </>
  );
}
