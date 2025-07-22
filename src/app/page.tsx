import { getAccount } from "./action";
import AccountSection from "@/components/account-section";
import TransactionWrapper from "@/components/account-transaction-detail";

export default async function HomePage() {
  const { data: accounts } = await getAccount();

  if (!accounts || accounts.length === 0) {
    return (
      <div className="text-center mt-10 text-gray-500">No accounts found</div>
    );
  }
  return (
    <>
      <div className="w-full max-w-[90rem] mx-auto">
        <div className="mx-auto md:w-96 p-3">
          <h1 className="text-center text-3xl mb-3">Pocket</h1>
          <AccountSection accounts={accounts} />
        </div>

        <div className="px-4 md:px-2">
          <TransactionWrapper />
        </div>
      </div>
    </>
  );
}
