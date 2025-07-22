"use client";

import { deleteTransactionAction, getTransactions } from "@/app/action";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { getCurrentDate } from "@/lib/utils";
import TransactionSection from "./transaction-section";
import TransactionSummarySection from "./transaction-summary-section";
import { Skeleton } from "./ui/skeleton";
import { Card, CardContent } from "./ui/card";
import { toast } from "sonner";

export default function TransactionWrapper() {
  const searchParams = useSearchParams();
  const accountId = searchParams.get("accountId");
  const date = searchParams.get("date") ?? getCurrentDate("month");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ weekly_expense: 0, expense: 0 });

  const handleDelete = async (id: string) => {
    setLoading(true);
    const accountId = searchParams.get("accountId");
    const date = searchParams.get("date") ?? getCurrentDate("month");
    try {
      const res = await deleteTransactionAction(id);
      if (res.success) {
        toast.success("Transaction deleted successfully");
        const updated = await getTransactions(accountId ?? "", date);
        setTransactions(updated.data || []);
      } else {
        toast.error("Failed to delete transaction");
      }
    } catch {
      toast.error("An error occurred while deleting");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!accountId) return;

    const fetchData = async () => {
      setLoading(true);
      const res = await getTransactions(accountId, date);
      setTransactions(res.data || []);
      setSummary(res.total_amount || { weekly_expense: 0, expense: 0 });
      setLoading(false);
    };

    fetchData();
  }, [accountId, date]);

  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-2 gap-4 mb-5">
        <Card className="w-full p-2">
          <CardContent className="p-1">
            <TransactionSummarySection
              dataTransactions={transactions}
              totalAmount={summary}
              isLoading={loading}
            />
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent>
            <h2 className="text-lg font-semibold mb-3">FORM TRANSACTION</h2>
          </CardContent>
          {/* Konten lainnya */}
        </Card>
      </div>

      {loading && <Skeleton className="h-40 w-full" />}
      {!loading && (
        <div className="px-4 md:px-2">
          <Card className="w-full">
            <CardContent>
              <TransactionSection
                transactionData={transactions}
                onDelete={handleDelete}
              />
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
}
