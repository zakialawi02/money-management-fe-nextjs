import { getLoginStatus } from "@/lib/auth";
import { NavbarMainClient } from "./navbar-main-client";

export async function NavbarMain() {
  const isLoggedIn = await getLoginStatus();

  return <NavbarMainClient isLoggedIn={isLoggedIn} />;
}
