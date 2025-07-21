"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { deleteTransactionAction, getAccount, getTransactions } from "./action";
import DropdownAccount from "@/components/dropdown-account";
import { Account, Transaction } from "@/types/auth.types";
import TableTransactions from "@/components/table-transactions";
import FormTransaction from "@/components/form-transaction";
import ButtonShareStream from "@/components/button-share-stream";
import { getCurrentDate } from "@/lib/utils";
import { toast } from "sonner";

export default function HomePage() {
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const [selectedDate, setSelectedDate] = useState(() =>
    getCurrentDate("month")
  );
  const [transactionsData, setTransactionsData] = useState<Transaction[]>([]);
  const [loadingTransactions, setLoadingTransactions] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleDeleteTransaction = async (id: string) => {
    const res = await deleteTransactionAction(id);
    if (res.success) {
      toast.success("Transaction deleted successfully");
      // refresh data
      setTransactionsData((prev) => prev.filter((tx) => tx.id !== id));
    } else {
      toast.error(res.message);
    }
  };

  // Fetch account data when the page is first loaded
  useEffect(() => {
    const fetchAccounts = async () => {
      const res = await getAccount();
      const accountList: Account[] = res.data || [];

      setAccounts(accountList);
      setLoadingAccount(false);

      const urlAccountId = searchParams.get("accountId");

      if (urlAccountId && accountList.find((acc) => acc.id === urlAccountId)) {
        setSelectedAccountId(urlAccountId);
      } else if (accountList.length > 0) {
        const firstId = accountList[0].id;
        setSelectedAccountId(firstId);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("accountId", firstId);
        router.replace(`?${newParams.toString()}`);
      }
    };

    fetchAccounts();
  }, [router, searchParams]);

  // Fetch transactions when account changes
  useEffect(() => {
    const fetchTx = async () => {
      setLoadingTransactions(true);
      if (!selectedAccountId) return;

      const now = new Date();
      const dateParam =
        searchParams.get("date") ??
        `${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}`;

      const txResult = await getTransactions(selectedAccountId, dateParam);

      setTransactionsData(txResult.data ?? []);
    };

    fetchTx().finally(() => setLoadingTransactions(false));
  }, [selectedAccountId, searchParams]);

  const handleAccountChange = (id: string) => {
    setSelectedAccountId(id);
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("accountId", id);
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto py-3">
      <div className="flex items-center justify-center">
        <h1 className="text-center text-3xl">Pocket</h1>
      </div>

      <div className="mx-auto mb-3 md:w-96 p-3 rounded-md">
        {loadingAccount ? (
          <Skeleton className="h-20 w-full" />
        ) : (
          <DropdownAccount
            data={accounts}
            selectedId={selectedAccountId}
            onChange={handleAccountChange}
          />
        )}
        <div className="mt-3 flex justify-center">
          {loadingAccount ? (
            <Skeleton className="h-10 w-full" />
          ) : (
            <ButtonShareStream
              userId="1"
              accountId={selectedAccountId}
              date={selectedDate}
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-2 gap-4 mb-5">
        <Card className="w-full">
          <CardContent>
            <Skeleton className="h-10 w-full" />
            <div className="flex flex-col gap-6">
              <h2>Welcome</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent>
            <Skeleton className="h-10 mb-2 w-full" />
            <FormTransaction accountId={selectedAccountId} />
          </CardContent>
        </Card>
      </div>

      <div className="px-4 md:px-2">
        <Card className="w-full">
          <CardContent>
            {loadingTransactions && <Skeleton className="h-50 w-full" />}

            {!loadingTransactions && (
              <TableTransactions
                transactionData={transactionsData}
                onDelete={handleDeleteTransaction}
              />
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
