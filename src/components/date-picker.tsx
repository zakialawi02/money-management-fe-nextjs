"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import { format, parse, isValid } from "date-fns";
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
  className,
}: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const queryDate = searchParams.get(paramKey);
  const formatString = mode === "month" ? "yyyy-MM" : "yyyy-MM-dd";

  const parseQueryDate = (dateStr: string | null): Date => {
    if (!dateStr) {
      return new Date();
    }
    const parsedDate = parse(dateStr, formatString, new Date());
    if (isValid(parsedDate)) {
      return parsedDate;
    }
    return new Date();
  };

  const [selectedDate, setSelectedDate] = useState<Date>(() =>
    parseQueryDate(queryDate)
  );

  useEffect(() => {
    setSelectedDate(parseQueryDate(queryDate));
  }, [queryDate, formatString]);

  const handleChange = (date: Date | null) => {
    if (!date || !isValid(date)) return;
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
      dateFormat={mode === "month" ? "MMM yyyy" : "yyyy-MM-dd"}
      showMonthYearPicker={mode === "month"}
      className={`bg-secondary-background border-2 border-black px-2 py-1 rounded-sm cursor-pointer ${
        className || ""
      }`}
      calendarClassName="neo-calendar"
    />
  );
}
