import { getAccount } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { notFound } from "next/navigation";

export default async function EditAccountPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;
  const { success, data: account } = await getAccount(id);

  if (!success) {
    return <div>Failed to load accounts</div>;
  }

  if (!account) {
    notFound();
  }

  return (
    <Card className="w-full max-w-[50rem] my-4 mx-auto">
      <CardContent>
        <form>
          <div className="text-center mt-10 text-foreground">
            Edit Account Page
          </div>
          <div className="grid gap-4 mt-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={account.name}
                className="input"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={account.description}
                className="input"
              />
            </div>
          </div>

          <Button type="submit" className="mt-4">
            Save
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
