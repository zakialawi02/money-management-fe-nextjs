"use client";

import Image from "next/image";
import { Label } from "../ui/label";
import { UserData } from "@/types/auth.types";
import { formatDateSimpleLong } from "@/lib/utils";
import Link from "next/link";
import { Button } from "../ui/button";
import { usePathname } from "next/navigation";
import { Input } from "../ui/input";
import { toast } from "sonner";

type Props = {
  user: UserData;
};

const submit = async (event: React.FormEvent) => {
  event.preventDefault();

  toast.error(`Failed to update profile`);
  return false;
};

export default function ProfileSection({ user }: Props) {
  const pathname = usePathname();

  if (pathname === "/dashboard") {
    return (
      <div className="w-full max-w-[90rem] my-4 mx-auto">
        <div className="m-1 p-1 md:p-3 bg-card rounded-md -mt-3">
          <div className="mb-2">
            <Image
              src={user?.profile_photo_path}
              alt={user?.name}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="ml-2 mb-2">
            <Label>Name</Label>
            <p>{user?.name}</p>
          </div>
          <div className="ml-2 mb-2">
            <Label>Username</Label>
            <p>{user?.username}</p>
          </div>
          <div className="ml-2 mb-2">
            <Label>Email</Label>
            <p>{user?.email}</p>
          </div>
          <div className="ml-2 mb-2">
            <Label>Created At</Label>
            <p>{formatDateSimpleLong(user?.created_at ?? "")}</p>
          </div>

          <Link href="/dashboard/user" className="float-end -mt-3">
            <Button size={"sm"}>View</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="w-full max-w-[90rem] my-4 mx-auto">
        <form
          onSubmit={submit}
          className="m-1 p-1 md:p-3 bg-card rounded-md -mt-3"
        >
          <div className="mb-2">
            <Image
              src={user?.profile_photo_path}
              alt={user?.name}
              width={100}
              height={100}
              className="rounded-full"
            />
          </div>
          <div className="ml-2 mb-2">
            <Label>Name</Label>
            <Input
              type="text"
              defaultValue={user?.name}
              className="input"
              name="name"
              placeholder="Name"
              required
            />
          </div>
          <div className="ml-2 mb-2">
            <Label>Username</Label>
            <Input
              type="text"
              defaultValue={user?.username}
              className="input"
              name="username"
              placeholder="Username"
              required
            />
          </div>
          <div className="ml-2 mb-2">
            <Label>Email</Label>
            <Input
              type="email"
              defaultValue={user?.email}
              className="input"
              name="email"
              placeholder="Email"
              required
            />
          </div>

          <Button type="submit" size={"sm"} className="float-end">
            Update Profile{" "}
          </Button>
        </form>
      </div>
    </>
  );
}
