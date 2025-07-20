"use client";

import { AlertTriangle, ArrowLeft, Home } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface ErrorPageProps {
  status?: 503 | 500 | 404 | 403;
}

export default function NotFound({ status = 404 }: ErrorPageProps) {
  const router = useRouter();

  const title = {
    503: "503: Service Unavailable",
    500: "500: Server Error",
    404: "404: Page Not Found",
    403: "403: Forbidden",
  }[status];

  const description = {
    503: "Sorry, we are doing some maintenance. Please check back soon.",
    500: "Whoops, something went wrong on our servers.",
    404: "Sorry, the page you are looking for could not be found.",
    403: "Sorry, you are forbidden from accessing this page.",
  }[status];

  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center bg-background p-4 text-center">
      <div className="mx-auto flex max-w-md flex-col items-center space-y-6 text-center">
        <div className="rounded-full bg-muted p-6">
          <AlertTriangle className="h-12 w-12 text-muted-foreground" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            {title}
          </h1>
          <p className="mx-auto max-w-[500px] text-muted-foreground md:text-xl/relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
