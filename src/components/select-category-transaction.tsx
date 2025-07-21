import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useEffect, useState } from "react";
import { TransactionCategory } from "@/types/auth.types";

type Props = {
  categories: TransactionCategory[];
  defaultValue?: string;
};

export default function SelectCategoryTransaction({
  categories,
  defaultValue,
}: Props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");

  useEffect(() => {
    if (defaultValue && categories.length > 0 && !value) {
      setValue(defaultValue);
    }
  }, [defaultValue, categories, value]);

  return (
    <>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="noShadow"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between active:scale-99 bg-secondary-background text-foreground"
          >
            {value
              ? categories.find((category) => category.id === value)?.name
              : "Select Category..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="min-w-[var(--radix-popover-trigger-width)] bg-secondary-background border-0 p-0">
          <Command className="**:data-[slot=command-input-wrapper]:h-11">
            <CommandInput placeholder="Search category..." />
            <CommandList className="p-1">
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup className="text-foreground border-b-main-foreground">
                {categories?.map((category) => (
                  <CommandItem
                    key={category.id}
                    value={category.id}
                    onSelect={(currentValue) => {
                      setValue(currentValue === value ? "" : currentValue);
                      setOpen(false);
                    }}
                    className="w-full hover:border-2 hover:border-border focus-visible:border-2 focus-visible:border-border"
                  >
                    {category.name}
                    <CheckIcon
                      className={cn(
                        "ml-auto",
                        value === category.id ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>

      <input type="hidden" name="transactions_category_id" value={value} />
    </>
  );
}
