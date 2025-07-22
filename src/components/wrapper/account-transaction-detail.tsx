"use client";

import { deleteTransactionAction, getTransactions } from "@/app/action";
import { useEffect, useState, useCallback } from "react";
import { useSearchParams, useRouter } from "next/navigation"; // 1. Import useRouter
import { getCurrentDate } from "@/lib/utils";
import TransactionSection from "../section/transaction-section";
import TransactionSummarySection from "../section/transaction-summary-section";
import { Skeleton } from "../ui/skeleton";
import { Card, CardContent } from "../ui/card";
import { toast } from "sonner";
import FormTransaction from "../form-transaction";

export default function TransactionWrapper() {
  const searchParams = useSearchParams();
  const router = useRouter(); // 2. Dapatkan instance router
  const accountId = searchParams.get("accountId");
  const date = searchParams.get("date") ?? getCurrentDate("month");
  const [loading, setLoading] = useState(true);
  const [transactions, setTransactions] = useState([]);
  const [summary, setSummary] = useState({ weekly_expense: 0, expense: 0 });
  const [formKey, setFormKey] = useState(0);

  const fetchData = useCallback(async () => {
    if (!accountId) return;
    setLoading(true);
    try {
      const res = await getTransactions(accountId, date);
      setTransactions(res.data || []);
      setSummary(res.total_amount || { weekly_expense: 0, expense: 0 });
    } catch {
      toast.error("Gagal memuat transaksi.");
    } finally {
      setLoading(false);
    }
  }, [accountId, date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleDelete = async (id: string) => {
    setLoading(true);
    try {
      const res = await deleteTransactionAction(id);
      if (res.success) {
        toast.success("Transaksi berhasil dihapus");
        await fetchData();
        router.refresh();
      } else {
        toast.error("Gagal menghapus transaksi");
      }
    } catch {
      toast.error("Terjadi kesalahan saat menghapus");
    } finally {
      setLoading(false);
    }
  };

  const handleSuccess = useCallback(async () => {
    await fetchData();
    router.refresh();
    setFormKey((prevKey) => prevKey + 1);
  }, [fetchData, router]);

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
            <FormTransaction
              key={formKey}
              accountId={accountId ?? ""}
              onSuccess={handleSuccess}
            />
          </CardContent>
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
