"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

type Mode = "month" | "date";

type Props = {
  mode?: Mode;
  paramKey?: string;
  className?: string;
};

export default function DatePickerInput({
  mode = "month",
  paramKey = "date",
  className = "",
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();

  const formatString = mode === "month" ? "yyyy-MM" : "yyyy-MM-dd";
  const displayFormat = mode === "month" ? "MMM yyyy" : "yyyy-MM-dd";

  const queryDate = searchParams.get(paramKey);
  const initialDate = (() => {
    if (queryDate) {
      try {
        return parse(queryDate, formatString, new Date());
      } catch {
        return new Date();
      }
    }
    return new Date();
  })();

  const [selectedDate, setSelectedDate] = useState<Date>(initialDate);

  const handleChange = (date: Date | null) => {
    if (!date) return;
    setSelectedDate(date);
    const formatted = format(date, formatString);
    const params = new URLSearchParams(Array.from(searchParams.entries()));
    params.set(paramKey, formatted);
    router.push("?" + params.toString());
  };

  return (
    <DatePicker
      selected={selectedDate}
      onChange={handleChange}
      dateFormat={displayFormat}
      showMonthYearPicker={mode === "month"}
      showPopperArrow={false}
      className={`bg-secondary-background border-2 border-black px-2 py-1 rounded-sm font-mono text-sm cursor-pointer focus:outline-none ${className}`}
      calendarClassName="neo-calendar"
    />
  );
}
