"use client";

import { deleteAccountAction } from "@/app/action";
import { Account } from "@/types/auth.types";
import DrawerCreateAccount from "../drawer-create-account";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import TableAccountLists from "../table-account-lists";
import { Button } from "../ui/button";
import { PlusIcon } from "lucide-react";

type Props = {
  accounts: Account[];
};

export default function AccountListSection({ accounts }: Props) {
  const router = useRouter();
  const [openDrawer, setOpenDrawer] = useState(accounts.length === 0);

  const handleCloseDrawer = () => {
    if (accounts.length === 0) {
      toast.error(
        "You do not have an account. You must create an account to proceed"
      );
      setTimeout(() => {
        setOpenDrawer(true);
      }, 400);
      setOpenDrawer(false);
    } else {
      setOpenDrawer(false);
    }
  };

  const handleAccountCreated = () => {
    router.refresh();
    setOpenDrawer(false);
  };

  const handleDeleteAccount = async (id: string) => {
    try {
      const res = await deleteAccountAction(id);
      if (res.success) {
        toast.success("Account deleted successfully");
        router.refresh();
      } else {
        toast.error("Failed to delete account");
      }
    } catch (error) {
      console.error("Error while deleting account:", error);
    }
  };

  return (
    <>
      <div className="mb-3">
        <Button size="default" onClick={() => setOpenDrawer(true)}>
          <PlusIcon />
          New Account
        </Button>
      </div>
      <TableAccountLists
        accountData={accounts}
        onEdit={(id) => router.push(`/accounts/${id}`)}
        onDelete={handleDeleteAccount}
      />

      <DrawerCreateAccount
        open={openDrawer}
        onCloseDrawer={handleCloseDrawer}
        onSuccess={handleAccountCreated}
      />
    </>
  );
}
