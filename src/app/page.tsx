import { getAccounts } from "./action";
import AccountSection from "@/components/section/account-section";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionWrapper from "@/components/wrapper/account-transaction-detail";
import { Suspense } from "react";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const { success, message, data: accounts } = await getAccounts();

  if (!success) {
    return (
      <div className="text-center mt-10 text-foreground">
        {message}: Please try again!!
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-[90rem] mx-auto">
        <div className="mx-auto md:w-96 p-3">
          <h1 className="text-center text-3xl mb-3">Pocket</h1>
          <Suspense fallback={<Skeleton className="h-18 w-full my-1" />}>
            <AccountSection accounts={accounts} />
          </Suspense>
        </div>

        <div className="px-4 md:px-2">
          <TransactionWrapper />
        </div>
      </div>
    </>
  );
}
