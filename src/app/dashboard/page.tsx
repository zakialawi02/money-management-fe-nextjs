import AccountListSection from "@/components/section/account-lists-section";
import { getAccount } from "../action";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const { success, message, data: accounts } = await getAccount();

  if (!success) {
    return (
      <div className="text-center mt-10 text-foreground">
        {message}: Please try again!!
      </div>
    );
  }

  return (
    <>
      <header className="bg-secondary-background shadow-sm">
        <div className="mx-auto max-w-7xl px-4 py-2">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            Dashboard
          </h1>
        </div>
      </header>

      <div className="w-full max-w-[90rem] my-4 mx-auto">
        <AccountListSection accounts={accounts} />
      </div>
    </>
  );
}
