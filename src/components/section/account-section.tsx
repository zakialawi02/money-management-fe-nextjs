"use client";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DropdownAccount from "@/components/dropdown-account";
import { Account } from "@/types/auth.types";
import ButtonShareStream from "../button-share-stream";

type Props = {
  accounts: Account[];
};

export default function AccountSection({ accounts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );

  useEffect(() => {
    const queryId = searchParams.get("accountId");
    const validQuery = queryId && accounts.some((a) => a.id === queryId);
    if (validQuery) {
      setSelectedAccountId(queryId);
    } else if (accounts.length > 0) {
      setSelectedAccountId(accounts[0].id);
      const params = new URLSearchParams(searchParams.toString());
      params.set("accountId", accounts[0].id);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [accounts, searchParams, router]);

  const handleAccountChange = (newId: string) => {
    setSelectedAccountId(newId);
    const params = new URLSearchParams(searchParams.toString());
    params.set("accountId", newId);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!selectedAccountId) return null;

  return (
    <>
      <DropdownAccount
        data={accounts}
        selectedId={selectedAccountId}
        onChange={handleAccountChange}
      />
      <div className="mt-3 flex justify-center">
        <ButtonShareStream
          userId="1"
          accountId={selectedAccountId}
          date={new Date().toISOString()}
        />
      </div>
    </>
  );
}
