"use client";

import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import "react-datepicker/dist/react-datepicker.css";

type Mode = "month" | "date";

type Props = {
  mode?: Mode;
  name?: string;
  className?: string;
  defaultValue?: Date | null;
};

export default function DatePickerInput({
  mode = "date",
  name = "date",
  className,
  defaultValue = null,
}: Props) {
  const [selectedDate, setSelectedDate] = useState<Date | null>(defaultValue);
  const formatString = mode === "month" ? "yyyy-MM" : "yyyy-MM-dd";

  return (
    <>
      <DatePicker
        selected={selectedDate}
        onChange={(date) => setSelectedDate(date)}
        dateFormat={formatString}
        showMonthYearPicker={mode === "month"}
        placeholderText="Select Date YYYY-MM-DD, if not set will be current date"
        className={`bg-secondary-background border-2 border-black px-2 py-1 rounded-sm cursor-pointer ${
          className || ""
        }`}
        calendarClassName="neo-calendar"
        isClearable
      />

      <input
        type="hidden"
        name={name}
        value={selectedDate ? format(selectedDate, formatString) : ""}
      />
    </>
  );
}
