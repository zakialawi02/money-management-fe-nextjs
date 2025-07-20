"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getAccount } from "./action";

interface Account {
  id: string;
  name: string;
  balance: number;
  description: string | null;
}

export default function HomePage() {
  const [loadingAccount, setLoadingAccount] = useState(true);
  const [loading, setLoading] = useState(true);
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [selectedAccountId, setSelectedAccountId] = useState("");
  const searchParams = useSearchParams();
  const router = useRouter();

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

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedId = e.target.value;
    setSelectedAccountId(selectedId);

    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("accountId", selectedId);
    router.replace(`?${newParams.toString()}`);
  };

  return (
    <div className="w-full max-w-[90rem] mx-auto py-5">
      <div className="flex items-center justify-center mb-5">
        <h1 className="text-center text-3xl">Pocket</h1>
      </div>

      <div className="mx-auto mb-3 md:w-96 border-2 p-3 rounded-md">
        {loadingAccount ? (
          <Skeleton className="h-30 w-full" />
        ) : (
          <select
            value={selectedAccountId}
            onChange={handleSelectChange}
            className="w-full border px-4 py-2 rounded"
          >
            {accounts.map((account) => (
              <option key={account.id} value={account.id}>
                {account.name} - Rp{account.balance.toLocaleString()}
              </option>
            ))}
          </select>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-2 gap-4 mb-5">
        <Card className="w-full">
          <CardContent>
            {loading && <Skeleton className="h-10 w-full" />}
            <div className="flex flex-col gap-6">
              <h2>Welcome</h2>
            </div>
          </CardContent>
        </Card>
        <Card className="w-full">
          <CardContent>
            {loading && (
              <>
                <Skeleton className="h-10 mb-2 w-full" />
                <Skeleton className="h-10 mb-2 w-full" />
                <Skeleton className="h-10 mb-2 w-full" />
                <Skeleton className="h-10 mb-2 w-full" />
                <Skeleton className="h-10 mb-2 w-full" />
              </>
            )}
            <form>
              <div className="flex flex-col gap-6">
                <h2>Welcome 2</h2>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>

      <div className="px-4 md:px-2">
        <Card className="w-full">
          <CardContent>
            <h2>Table</h2>
            {loading && <Skeleton className="h-50 w-full" />}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
