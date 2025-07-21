import { useState, useEffect } from "react";
import { Input } from "./ui/input";

interface Props {
  value: number | string;
  onChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
}

const formatCurrency = (value: string): string => {
  const cleaned = value.replace(/\D/g, "");
  const number = parseInt(cleaned || "0", 10);
  return number.toLocaleString("id-ID");
};

const unformatCurrency = (value: string): string => {
  return value.replace(/\D/g, "");
};

export default function InputCurrency({
  value = 0,
  onChange = () => {},
  placeholder = "Input Value",
  disabled = false,
  ...props
}: Props) {
  const [displayValue, setDisplayValue] = useState(() =>
    formatCurrency(value ? value.toString() : "0")
  );
  const [rawValue, setRawValue] = useState(value);

  useEffect(() => {
    setDisplayValue(formatCurrency(value ? value.toString() : "0"));
  }, [value]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = unformatCurrency(e.target.value);
    const formatted = formatCurrency(raw);
    setRawValue(raw);
    setDisplayValue(formatted);
    onChange(raw);
  };

  return (
    <div className="relative w-full">
      <span className="absolute inset-y-0 left-3 flex items-center text-sm">
        Rp
      </span>
      {/* Display input untuk user */}
      <Input
        type="text"
        inputMode="numeric"
        className="w-full pl-10 pr-3 py-2"
        placeholder={placeholder}
        value={displayValue}
        onChange={handleChange}
        disabled={disabled}
        {...props}
      />
      {/* Hidden input untuk dikirim ke form */}
      <input type="hidden" name="amount" value={rawValue} />
    </div>
  );
}
