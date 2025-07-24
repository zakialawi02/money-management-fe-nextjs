import { Metadata } from "next";
import { NavbarDashboard } from "./_components/navbar-dashboard";
import { Suspense } from "react";
import Loading from "../loading";

export const metadata: Metadata = {
  title: "Dashboard | Money Management",
  description:
    "Money Management App | Money Tracker is an app that helps you manage your personal finances with ease. This app allows you to record your expenses and income, create budgets, and track your financial progress. It also comes with features such as transaction tracking, payment reminders, and financial analysis.",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <NavbarDashboard />
      <div className="w-full mx-auto px-4 md:px-2 my-4">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </div>
    </>
  );
}
