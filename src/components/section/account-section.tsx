"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import DropdownAccount from "@/components/dropdown-account";
import { Account } from "@/types/auth.types";
import ButtonShareStream from "../button-share-stream";
import { format } from "date-fns";

type Props = {
  accounts: Account[];
};

export default function AccountSection({ accounts }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAccountId, setSelectedAccountId] = useState<string | null>(
    null
  );
  const [userId, setUserId] = useState<string>("");
  const currentDate = format(new Date(), "yyyy-MM");
  const selectedDate = searchParams.get("date") ?? currentDate;

  // First effect: Only to set and synchronize selectedAccountId
  useEffect(() => {
    const queryId = searchParams.get("accountId");
    const validQuery = queryId && accounts.some((a) => a.id === queryId);

    if (validQuery) {
      if (queryId !== selectedAccountId) {
        setSelectedAccountId(queryId);
      }
    } else if (accounts.length > 0) {
      const defaultAccountId = accounts[0].id;
      setSelectedAccountId(defaultAccountId);
      const params = new URLSearchParams(searchParams.toString());
      params.set("accountId", defaultAccountId);
      router.replace(`?${params.toString()}`, { scroll: false });
    }
  }, [accounts, searchParams, router, selectedAccountId]);

  // Second effect: Get userId every time selectedAccountId changes
  useEffect(() => {
    if (selectedAccountId) {
      const selectedAccount = accounts.find(
        (acc) => acc.id === selectedAccountId
      );
      const firstUserId = selectedAccount?.users?.[0]?.id;
      setUserId(firstUserId || "");
    }
  }, [selectedAccountId, accounts]);

  const handleAccountChange = (newId: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("accountId", newId);
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (!selectedAccountId) {
    return null;
  }

  return (
    <>
      <DropdownAccount
        data={accounts}
        selectedId={selectedAccountId}
        onChange={handleAccountChange}
      />
      <div className="mt-3 flex justify-center">
        {userId && (
          <ButtonShareStream
            userId={userId}
            accountId={selectedAccountId}
            date={selectedDate}
          />
        )}
      </div>
    </>
  );
}
