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
import { InitialState } from "@/types/auth.types";
import { useActionState, useEffect } from "react";
import { registerAction } from "@/lib/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";

const initialState: InitialState = {
  data: {
    name: "",
    username: "",
    email: "",
    password: "",
  },
  message: "",
  success: null,
  errors: null,
};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(
    registerAction,
    initialState
  );

  if (state?.success) {
    setTimeout(() => {
      redirect("/login");
    }, 1000);
  }

  useEffect(() => {
    if (state?.success === true) {
      toast.success(`${state?.message} | Redirecting...`);
    }
    if (state?.success === false) {
      toast.error(`${state?.message}`);
    }
  }, [state]);

  return (
    <div className="min-h-[92dvh] flex items-center justify-center py-5 px-4">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Register</CardTitle>
          <CardDescription>
            Enter your email below to register to your account
          </CardDescription>
          {state?.success === false && !pending && (
            <p className="text-error">{state?.message}</p>
          )}
        </CardHeader>
        <form action={formAction}>
          <CardContent className="mb-3">
            <div className="flex flex-col gap-3">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  defaultValue={state?.data?.name}
                  placeholder="Your name"
                  required
                />
              </div>
              {state?.errors && (
                <p className="text-error font-normal">
                  {state?.errors?.name?.[0]}
                </p>
              )}
              <div className="grid gap-2">
                <Label htmlFor="username">Username</Label>
                <Input
                  id="username"
                  name="username"
                  type="text"
                  defaultValue={state?.data?.username}
                  placeholder="Your username"
                  required
                />
                {state?.errors && (
                  <p className="text-error font-normal">
                    {state?.errors?.username?.[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  defaultValue={state?.data?.email}
                  placeholder="m@example.com"
                  required
                />
                {state?.errors && (
                  <p className="text-error font-normal">
                    {state?.errors?.email?.[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Password</Label>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="Enter your password"
                  required
                />
                {state?.errors && (
                  <p className="text-error font-normal">
                    {state?.errors?.password?.[0]}
                  </p>
                )}
              </div>
              <div className="grid gap-2">
                <div className="flex items-center">
                  <Label htmlFor="password">Confirm Password</Label>
                </div>
                <Input
                  id="password_confirmation"
                  name="password_confirmation"
                  type="password"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex-col gap-2">
            <Button type="submit" className="w-full">
              {pending ? "Loading..." : "Register"}
            </Button>
            <div className="mt-4 text-center text-sm">
              Already have an account?{" "}
              <Link href="/login" className="underline underline-offset-4">
                Login
              </Link>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
