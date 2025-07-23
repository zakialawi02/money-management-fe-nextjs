import { getAccount } from "@/app/action";
import AccountListSection from "@/components/section/account-lists-section";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
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
