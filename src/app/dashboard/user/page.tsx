import { myUser } from "@/app/action";
import ProfileSection from "@/components/section/user-section";
import { Card, CardContent } from "@/components/ui/card";

export const dynamic = "force-dynamic";

export default async function UserPage() {
  const { success, message, data: user } = await myUser();

  if (!success) {
    return (
      <div className="text-center mt-10 text-foreground">
        {message}: Please try again!!
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-[50rem] my-4 mx-auto">
        <Card>
          <CardContent>
            <ProfileSection user={user} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
