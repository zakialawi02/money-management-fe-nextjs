import { Suspense } from "react";
import AccountPage from "./accounts/page";
import UserPage from "./user/page";
import { Skeleton } from "@/components/ui/skeleton";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  return (
    <>
      <div className="w-full max-w-[90rem] my-4 mx-auto">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-6">
          <Suspense fallback={<Skeleton className="h-40 w-full my-1" />}>
            <UserPage />
          </Suspense>
          <Suspense fallback={<Skeleton className="h-40 w-full my-1" />}>
            <AccountPage />
          </Suspense>
        </div>
      </div>
    </>
  );
}
