"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ModeToggle } from "./mode-toggle";
import { logoutAction } from "@/lib/auth";
import { Skeleton } from "./ui/skeleton";

export function NavbarMainClient({ isLoggedIn }: { isLoggedIn: boolean }) {
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
        <ul className="flex items-center space-x-6">
          {isLoggedIn === null ? (
            <>
              <Skeleton className="w-30 h-6" />
            </>
          ) : isLoggedIn ? (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>
              <li>
                <button onClick={handleLogout}>Logout</button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/login">Login</Link>
              </li>
            </>
          )}
          <ModeToggle />
        </ul>
      </div>
    </div>
  );
}
