"use client";

import { use, useEffect, useState } from "react";
import { getAccount, updateAccountAction } from "@/app/action";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatCurrency } from "@/lib/utils";
import { notFound, useRouter } from "next/navigation";
import { useActionState } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { Account } from "@/types/auth.types";
import { toast } from "sonner";

const initialState = {
  data: {
    id: "",
    name: "",
    description: "",
  },
  success: null,
  message: "",
  errors: null,
};

export default function EditAccountPage(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(props.params);
  const router = useRouter();
  const [account, setAccount] = useState<Account | null>(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(false);
  const [state, formAction, pending] = useActionState(
    updateAccountAction,
    initialState
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getAccount(id);
        if (!res?.success || !res?.data) {
          setFetchError(true);
        } else {
          setAccount(res.data);
        }
      } catch (err) {
        console.error(err);
        setFetchError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log(state);

    if (state?.success === true) {
      toast.success("Account updated successfully");
      router.push("/dashboard");
    } else if (state?.success === false) {
      toast.error(state?.message);
    }
  }, [state, router]);

  if (loading)
    return (
      <>
        <div className="">
          <Skeleton className="w-[50rem] h-40 my-4 mx-auto" />
        </div>
      </>
    );
  if (fetchError || !account) return notFound();

  return (
    <Card className="w-full max-w-[50rem] my-4 mx-auto">
      <CardContent>
        <form action={formAction}>
          <input type="hidden" name="id" value={account?.id} />

          <div className="text-center mt-10 text-foreground text-xl font-semibold">
            Edit Account Page
          </div>

          <div className="grid gap-4 mt-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                name="name"
                defaultValue={state?.data?.name || account?.name}
                className="input"
              />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Input
                id="description"
                name="description"
                defaultValue={state?.data?.description || account?.description}
                className="input"
              />
            </div>
            <div>
              <Label htmlFor="balance">Balance</Label>
              <Input
                id="balance"
                name="balance"
                defaultValue={formatCurrency(account?.balance)}
                className="input"
                disabled
                readOnly
              />
            </div>
          </div>

          {state?.message && (
            <p
              className={`mt-2 text-sm ${
                state?.success ? "text-green-600" : "text-red-600"
              }`}
            >
              {state?.message}
            </p>
          )}

          <Button type="submit" className="mt-4" disabled={pending}>
            {pending ? "Updating..." : "Update"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
