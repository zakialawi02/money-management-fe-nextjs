"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@radix-ui/react-label";
import { useActionState, useEffect } from "react";
import { redirect } from "next/navigation";
import { loginAction } from "@/lib/auth";
import { InitialState } from "@/types/auth.types";
import { toast } from "sonner";

const initialState: InitialState = {
  data: {
    id_user: "",
    password: "",
  },
  message: "",
  success: null,
  errors: null,
};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(
    loginAction,
    initialState
  );
  if (state?.success) {
    redirect("/");
  }

  useEffect(() => {
    if (state?.success === true) {
      toast.success(`${state?.message}`);
    }
    if (state?.success === false) {
      toast.error(`${state?.message}`);
    }
  }, [state]);

  return (
    <div className="min-h-[92dvh] flex items-center justify-center px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
          {state?.success === false && !pending && (
            <p className="text-error">{state?.message}</p>
          )}
        </CardHeader>
        <form action={formAction}>
          <CardContent className="mb-3">
            <div className="flex flex-col gap-4">
              <div className="grid gap-2">
                <Label htmlFor="id_user">Username/Email</Label>
                <Input
                  id="id_user"
                  type="text"
                  name="id_user"
                  defaultValue={state?.data?.id_user}
                  placeholder="you@example.com"
                  disabled={pending}
                  required
                />
                {state?.errors && (
                  <p className="text-error font-normal">
                    {state?.errors?.username?.[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                  <Link
                    href="#"
                    className="ml-auto text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </Link>
                </div>
                <Input
                  id="password"
                  type="password"
                  name="password"
                  disabled={pending}
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full" disabled={pending}>
              {pending ? "Loading..." : "Login"}
            </Button>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="underline underline-offset-4">
                Register
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
