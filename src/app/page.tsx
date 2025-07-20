"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";

export default function Home() {
  const [loadingAccount, setLoadingAccount] = useState(true);

  return (
    <ProtectedRoute>
      <div className="w-full max-w-[90rem] mx-auto py-5">
        <div className="flex items-center justify-center mb-5">
          <h1 className="text-center text-3xl">Pocket</h1>
        </div>

        <div className="mx-auto mb-3 md:w-96  border-2 p-1 rounded-md">
          {loadingAccount && <Skeleton className="h-20 w-full" />}

          {!loadingAccount && (
            <div className="mt-5 flex justify-center">
              <div className="bg-blue-300 border-4 border-black px-6 py-3 text-black font-bold shadow-neobrutal cursor-pointer hover:bg-blue-400 transition-all">
                {/* <ShareButton
                userId={userId}
                accountId={selectedAccount}
                date={dateParams}
              /> */}
              </div>
            </div>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 px-4 md:px-2 gap-4 mb-5">
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <h2>Welcome</h2>
                </div>
              </form>
            </CardContent>
          </Card>
          <Card className="w-full">
            <CardHeader>
              <CardTitle>Login to your account</CardTitle>
            </CardHeader>
            <CardContent>
              <form>
                <div className="flex flex-col gap-6">
                  <h2>Welcome 2</h2>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>

        <div className="px-4 md:px-2">
          <Card className="w-full">
            <CardContent>
              <h2>Table</h2>
            </CardContent>
          </Card>
        </div>
      </div>
    </ProtectedRoute>
  );
}
