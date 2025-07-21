"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";
import { formatCurrency } from "@/lib/utils";
import { Account } from "@/types/auth.types";

type Props = {
  data: Account[];
  selectedId: string;
  onChange: (id: string) => void;
};

export default function DropdownAccount({ data, selectedId, onChange }: Props) {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const selected = data.find((acc) => acc.id === selectedId);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={dropdownRef} className="relative w-full font-mono">
      {/* Selected */}
      <div
        onClick={() => setOpen(!open)}
        className="cursor-pointer p-4 border-4 border-black bg-secondary-background shadow-[6px_6px_0px_0px_#000] rounded-sm flex justify-between items-center"
      >
        <div className="flex justify-between items-center w-full">
          <div>
            <div className="text-lg font-bold">{selected?.name}</div>
            {selected?.description && (
              <div className="text-sm text-gray-600">
                {selected.description}
              </div>
            )}
          </div>
          <div className="text-sm font-mono">
            {formatCurrency(selected?.balance ?? 0)}
          </div>
        </div>
        <ChevronDown className="w-5 h-5 ml-2" />
      </div>

      {/* Options */}
      {open && (
        <div className="absolute z-10 mt-2 w-full bg-white border-4 border-black rounded-sm shadow-[6px_6px_0px_0px_#000]">
          {data.map((acc) => (
            <div
              key={acc.id}
              className={`p-3 border-b border-black last:border-b-0 cursor-pointer hover:bg-yellow-200 ${
                acc.id === selectedId ? "bg-yellow-300" : ""
              }`}
              onClick={() => {
                setOpen(false);
                onChange(acc.id);
              }}
            >
              <div className="flex justify-between items-center w-full">
                <div>
                  <div className="text-lg font-bold">{acc.name}</div>
                  {acc.description && (
                    <div className="text-sm text-gray-600">
                      {acc.description}
                    </div>
                  )}
                </div>
                <div className="text-sm font-mono">
                  {formatCurrency(acc.balance)}
                </div>
              </div>
            </div>
          ))}
          <div
            className="p-2 bg-blue-100 hover:bg-blue-200 border-t border-black cursor-pointer"
            onClick={() => alert("Create new account clicked!")}
          >
            <div className="font-bold">Create New Account</div>
            <div className="text-sm text-gray-600">Create a new account</div>
          </div>
        </div>
      )}
    </div>
  );
}
