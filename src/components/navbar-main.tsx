"use client";

import Link from "next/link";
import { ModeToggle } from "./mode-toggle";
import { Skeleton } from "./ui/skeleton";
import { logoutAction } from "@/lib/auth";
import { useRouter } from "next/navigation";

export function NavbarMain() {
  const router = useRouter();

  const handleLogout = async () => {
    await logoutAction().then(() => {
      router.push("/login");
    });
  };

  return (
    <div className="bg-secondary-background min-h-10 py-2 px-8 border-b">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold">
          <Link href="/">🗃️</Link>
        </h1>
        <div>
          <ul className="flex items-center space-x-6">
            <li>
              <Link href="/dashboard">Dashboard</Link>
            </li>
            <li>
              <button onClick={handleLogout}>Logout</button>
            </li>
            <ModeToggle />
          </ul>
        </div>
      </div>
    </div>
  );
}
