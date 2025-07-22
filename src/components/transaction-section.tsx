"use client";

import { useState } from "react";
import TableTransactions from "@/components/table-transactions";
import { Transaction } from "@/types/auth.types";

interface Props {
  transactionData: Transaction[];
  onDelete: (id: string) => void;
}

export default function TransactionSection({
  transactionData,
  onDelete,
}: Props) {
  useState<Transaction[]>(transactionData);

  return (
    <>
      <TableTransactions
        transactionData={transactionData}
        onDelete={onDelete}
      />
    </>
  );
}
