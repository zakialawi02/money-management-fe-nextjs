import type { Metadata, Viewport } from "next";
import { Cascadia_Mono } from "next/font/google";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ThemeProvider } from "next-themes";
import { Suspense } from "react";
import Loading from "./loading";
import { NavbarMain } from "@/components/navbar-main";
import { Toaster } from "sonner";

const cascadiaMono = Cascadia_Mono({
  variable: "--font-cascadia",
  weight: "400",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // Also supported but less commonly used
  // interactiveWidget: 'resizes-visual',
};

export const metadata: Metadata = {
  title: "Money Management | Money Tracker",
  description:
    "Money Management App | Money Tracker is an app that helps you manage your personal finances with ease. This app allows you to record your expenses and income, create budgets, and track your financial progress. It also comes with features such as transaction tracking, payment reminders, and financial analysis.",
  icons: {
    icon: [{ url: "/favicon.ico" }, { url: "/favicon.png", type: "image/png" }],
    shortcut: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-US": "/",
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={` ${cascadiaMono.className}`}
    >
      <body className={` font antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextTopLoader showSpinner={false} />
          <NavbarMain />
          <Suspense fallback={Loading()}>
            {children}
            <Toaster position="top-center" richColors closeButton />
          </Suspense>
        </ThemeProvider>
      </body>
    </html>
  );
}
