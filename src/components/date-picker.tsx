import { useState } from "react";
import DatePicker from "react-datepicker";
import { format } from "date-fns";
import { Calendar } from "lucide-react";
import "react-datepicker/dist/react-datepicker.css";

type Props = {
  mode?: "full" | "month";
  placeholder?: string;
  onChange?: (formattedDate: string) => void;
};

const DatePickerInput: React.FC<Props> = ({
  mode = "full",
  placeholder = "Select Date YYYY-MM-DD, if not set will be current date",
  onChange,
}) => {
  const [startDate, setStartDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setStartDate(date);
    if (date && onChange) {
      const formatted =
        mode === "month" ? format(date, "yyyy-MM") : format(date, "yyyy-MM-dd");
      onChange(formatted);
    }
  };

  return (
    <div className="!w-full relative">
      <DatePicker
        withPortal
        todayButton="Today"
        isClearable
        selected={startDate}
        onChange={handleDateChange}
        dateFormat={mode === "month" ? "yyyy-MM" : "yyyy-MM-dd"}
        showMonthYearPicker={mode === "month"}
        placeholderText={placeholder}
        className="block w-full px-3 py-2 border-[2px] !bg-secondary-background !text-main-foreground  placeholder:text-foreground/70 pr-12 rounded-sm"
        calendarClassName="!border-[4px] !border-border p-6 !bg-background !text-main-foreground"
        name="date"
      />
      <Calendar
        className="absolute right-6 top-1/2 -translate-y-1/2 text-foreground pointer-events-none"
        size={20}
      />
    </div>
  );
};

export default DatePickerInput;
