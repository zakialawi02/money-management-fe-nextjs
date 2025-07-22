import { Card, CardContent } from "@/components/ui/card";
import { getAccount, getTransactions } from "./action";
import AccountSection from "@/components/account-section";
import TransactionSection from "@/components/transaction-section";
import TransactionSummarySection from "@/components/transaction-summary-section";
import { getCurrentDate } from "@/lib/utils";

type Props = {
  searchParams?: {
    accountId?: string;
    date?: string;
  };
};

export default async function HomePage({ searchParams }: Props) {
  const { data: accounts } = await getAccount();
  const selectedAccountId = searchParams?.accountId ?? accounts[0].id;

  const selectedDate = searchParams?.date ?? getCurrentDate("month");

  const { total_amount: totalAmount, data: dataTransactions } =
    await getTransactions(selectedAccountId, selectedDate);

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

        <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-2 gap-4 mb-5">
          <Card className="w-full p-2">
            <CardContent className="p-1">
              <TransactionSummarySection
                dataTransactions={dataTransactions}
                totalAmount={totalAmount}
              />
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardContent>
              <h2 className="text-lg font-semibold mb-3">FORM TRANSACTION</h2>
              {/* Konten lainnya */}
            </CardContent>
          </Card>
        </div>

        <div className="px-4 md:px-2">
          <Card className="w-full">
            <CardContent>
              <TransactionSection />
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
}
