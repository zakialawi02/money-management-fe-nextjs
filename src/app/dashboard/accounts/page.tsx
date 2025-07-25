import { getAccounts } from "@/app/action";
import AccountListSection from "@/components/section/account-lists-section";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const { success, message, data: accounts } = await getAccounts();

  if (!success) {
    return (
      <div className="text-center mt-10 text-foreground">
        {message}: Please try again or Logout!!
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-[90rem] my-4 mx-auto">
        <Card>
          <CardContent>
            <AccountListSection accounts={accounts} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
