import { getStreamReport } from "@/app/action";
import { notFound } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import TableTransactions from "@/components/table-transactions";
import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";

export default async function StreamReportPage(props: {
  params: Promise<{ encryptedUrl: string }>;
}) {
  const params = await props.params;
  const { encryptedUrl } = params;

  const response = await getStreamReport(encryptedUrl);

  if (!response.success) {
    notFound();
  }

  const { data } = response;
  const {
    date,
    user,
    account,
    total_amount,
    transactions: transactionData,
  } = data;
  console.log(response);

  return (
    <div className="container">
      <div className="mt-4">
        <div className="my-5">
          <h1 className="text-2xl font-semibold mb-4">Transactions Report</h1>
          <p>{format(new Date(date), "MMMM yyyy")}</p>
        </div>

        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:gap-8">
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-3">User Detail</h3>
              <p className="text-sm">Name: {user?.name}</p>
              <p className="text-sm">Email: {user?.email}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-3">Account Detail</h3>
              <p className="text-sm">Name: {account?.name}</p>
              <p className="text-sm">Description: {account?.description}</p>
              <p className="text-sm">
                Balance: {formatCurrency(account?.balance)}
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardContent>
              <h3 className="text-lg font-semibold mb-3">Total Amount</h3>
              <p className="text-sm">
                Expense: {formatCurrency(total_amount?.expense)}
              </p>
              <p className="text-sm">
                Income: {formatCurrency(total_amount?.income)}
              </p>
              <p className="text-sm font-medium">
                Total: {formatCurrency(total_amount?.total)}
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="my-5">
          <TableTransactions transactionData={transactionData} />
        </div>
      </div>
    </div>
  );
}
