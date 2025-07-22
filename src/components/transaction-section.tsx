"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getTransactions } from "@/app/action";
import TableTransactions from "@/components/table-transactions";
import { Skeleton } from "@/components/ui/skeleton";
import { Transaction } from "@/types/auth.types";
import { getCurrentDate } from "@/lib/utils";

export default function TransactionSection() {
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");
  const dateParams = searchParams.get("date") ?? getCurrentDate("month");

  useEffect(() => {
    if (!accountId) return;

    const fetchData = async () => {
      setLoading(true);
      const res = await getTransactions(accountId, dateParams);
      setTransactions(res.data || []);
      setLoading(false);
    };

    fetchData();
  }, [accountId, dateParams]);

  const handleDelete = (id: string) => {
    setTransactions((prev) => prev.filter((item) => item.id !== id));
  };

  if (!accountId) return null;

  return (
    <div className="mt-4">
      {loading ? (
        <Skeleton className="h-40 w-full" />
      ) : (
        <TableTransactions
          transactionData={transactions}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
}
