"use client";

import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useActionState, useEffect } from "react";
import { createAccountAction } from "@/app/action";
import InputCurrency from "./input-currency";

const initialState = {
  data: {
    name: "",
    balance: 0,
    description: "",
  },
  message: "",
  success: null,
  errors: null,
};

type DrawerCreateAccountProps = {
  open: boolean;
  onCloseDrawer: () => void;
  onSuccess: () => void;
};

export default function DrawerCreateAccount({
  open,
  onCloseDrawer,
  onSuccess,
}: DrawerCreateAccountProps) {
  const [state, formAction, pending] = useActionState(
    createAccountAction,
    initialState
  );

  useEffect(() => {
    if (state.success) {
      onSuccess();
    }
  }, [state, onSuccess]);

  return (
    <Drawer
      open={open}
      onOpenChange={(openNow) => {
        if (!openNow) onCloseDrawer();
      }}
      dismissible={false}
    >
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm h-[50vh]">
          <DrawerHeader>
            <DrawerTitle>Create Account</DrawerTitle>
            <DrawerDescription>
              Please fill in the form to create a new account
            </DrawerDescription>
          </DrawerHeader>
          <form action={formAction}>
            <div className="space-y-2">
              <Input type="text" name="name" placeholder="Name" required />
              {state?.errors?.name && (
                <p className="text-error font-normal">{state.errors.name[0]}</p>
              )}
              <InputCurrency
                name="balance"
                value={state?.data?.balance}
                placeholder="Balance"
              />
              {state?.errors?.balance && (
                <p className="text-error font-normal">
                  {state.errors.balance[0]}
                </p>
              )}
              <Input type="text" name="description" placeholder="Description" />
              {state?.errors?.description && (
                <p className="text-error font-normal">
                  {state.errors.description[0]}
                </p>
              )}
            </div>
            <DrawerFooter className="grid grid-cols-2 mt-4">
              <Button type="submit" disabled={pending}>
                {pending ? "Creating..." : "Create"}
              </Button>
              <DrawerClose asChild>
                <Button
                  className="bg-secondary-background text-foreground"
                  disabled={pending}
                  onClick={onCloseDrawer}
                >
                  Cancel
                </Button>
              </DrawerClose>
            </DrawerFooter>
          </form>
        </div>
      </DrawerContent>
    </Drawer>
  );
}
