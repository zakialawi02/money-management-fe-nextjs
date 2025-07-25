"use client";

import { formatCurrency, getCurrentDate } from "@/lib/utils";
import { Transaction } from "@/types/auth.types";
import PieChart from "../pie-chart";
import { useState } from "react";
import { Switch } from "../ui/switch";
import { Button } from "../ui/button";
import DatePickerSelect from "../date-picker";
import { Skeleton } from "../ui/skeleton";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";
import { getDownloadUrl } from "@/app/action";

type TotalAmount = {
  weekly_expense: number;
  expense: number;
};

type ChartMode = "type" | "category";

type Props = {
  accountId: string;
  dataTransactions: Transaction[];
  totalAmount: TotalAmount;
  isLoading?: boolean;
};

export default function TransactionSummarySection({
  accountId,
  dataTransactions,
  totalAmount,
  isLoading,
}: Props) {
  const searchParams = useSearchParams();
  const dateParams = searchParams.get("date") || getCurrentDate("month");
  const [chartMode, setChartMode] = useState<ChartMode>("category");

  const handleToggle = () => {
    setChartMode((prev) => (prev === "category" ? "type" : "category"));
  };

  const handleExport = async () => {
    try {
      toast.info("Exporting PDF...");
      const downloadUrl = await getDownloadUrl(accountId, dateParams);

      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = `report_${accountId}_${dateParams}.pdf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      toast.success("Download started");
    } catch (error) {
      console.error(error);
      toast.error("Failed to export PDF");
    }
  };

  return (
    <>
      <div className="flex flex-col items-start justify-between gap-3 lg:flex-row">
        <div className="space-y-1">
          <div className="items-center block space-x-1">
            <div className="mb-1">
              <DatePickerSelect mode="month" />
            </div>
            {isLoading && (
              <>
                <Skeleton className="h-7 w-50 mb-1" />
                <Skeleton className="h-9 w-24" />
              </>
            )}
            {!isLoading && (
              <>
                <div className="my-2 gap-1 flex">
                  <span>Details</span>
                  <Switch
                    checked={chartMode === "type"}
                    onCheckedChange={handleToggle}
                  />
                  <span>Summary</span>
                </div>
                <Button size={"sm"} variant={"reverse"} onClick={handleExport}>
                  Export
                </Button>
              </>
            )}
          </div>
        </div>

        <div className="w-full mx-auto space-y-1 lg:mx-0 lg:w-auto">
          {isLoading && (
            <>
              <Skeleton className="h-10 w-32" />
              <Skeleton className="h-10 w-32" />
            </>
          )}

          {!isLoading && (
            <>
              <div className="px-2 py-1 border-2 border-black rounded-sm bg-secondary-background">
                <p className="text-sm font-bold capitalize">Weekly Expense</p>
                <p className="text-md">
                  {formatCurrency(totalAmount?.weekly_expense, "IDR")}
                </p>
              </div>
              <div className="px-2 py-1 border-2 border-black rounded-sm bg-secondary-background">
                <p className="text-sm font-bold capitalize">Total Expense</p>
                <p className="text-md">
                  {formatCurrency(totalAmount?.expense, "IDR")}
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      {isLoading && (
        <div className="flex items-center justify-center h-70">
          <Skeleton className="h-50 w-full" />
        </div>
      )}
      {!isLoading && <PieChart data={dataTransactions} chartMode={chartMode} />}
    </>
  );
}
