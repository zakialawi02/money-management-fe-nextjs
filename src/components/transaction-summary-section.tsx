"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { format } from "date-fns";

import { Transaction } from "@/types/auth.types";
import { formatCurrency } from "@/lib/utils";

import PieChart from "./pie-chart";
import { Switch } from "./ui/switch";
import { Button } from "./ui/button";
import DatePickerSelect from "./date-picker";

type TotalAmount = {
  weekly_expense: number;
  expense: number;
};

type ChartMode = "type" | "category";

type Props = {
  dataTransactions: Transaction[];
  totalAmount: TotalAmount;
};

export default function TransactionSummarySection({
  dataTransactions,
  totalAmount,
}: Props) {
  const [chartMode, setChartMode] = useState<ChartMode>("category");
  const isTypeMode = chartMode === "type";

  const searchParams = useSearchParams();
  const currentDate = format(new Date(), "yyyy-MM");
  const [selectedDate, setSelectedDate] = useState<string>(
    searchParams.get("date") ?? currentDate
  );

  useEffect(() => {
    const queryDate = searchParams.get("date");
    if (queryDate) setSelectedDate(queryDate);
  }, [searchParams]);

  const handleToggle = () => {
    setChartMode((prev) => (prev === "category" ? "type" : "category"));
  };

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between items-start gap-3 font-mono">
        {/* Left Section */}
        <div className="space-y-2">
          <div className="space-y-1">
            <DatePickerSelect mode="month" />

            <div className="flex items-center gap-2">
              <span>Details</span>
              <Switch checked={isTypeMode} onCheckedChange={handleToggle} />
              <span>Summary</span>
            </div>
          </div>

          <Button size="sm" variant="reverse">
            Export
          </Button>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-auto mx-auto lg:mx-0 space-y-2">
          <div className="border-2 border-black rounded-sm bg-secondary-background px-2 py-1">
            <p className="text-sm font-bold capitalize">Weekly Expense</p>
            <p className="text-md">
              {formatCurrency(totalAmount.weekly_expense, "IDR")}
            </p>
          </div>

          <div className="border-2 border-black rounded-sm bg-secondary-background px-2 py-1">
            <p className="text-sm font-bold capitalize">Total Expense</p>
            <p className="text-md">
              {formatCurrency(totalAmount.expense, "IDR")}
            </p>
          </div>
        </div>
      </div>

      {/* Chart */}
      <PieChart data={dataTransactions} chartMode={chartMode} />
    </>
  );
}
