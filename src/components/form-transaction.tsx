import { getTransactionCategories, storeTransactionAction } from "@/app/action";
import SelectCategoryTransaction from "./select-category-transaction";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { useActionState, useEffect, useState } from "react";
import { Button } from "./ui/button";
import { SaveIcon } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import DatePickerInputField from "./date-picker-input-field";
import InputCurrency from "./input-currency";
import { TransactionCategory } from "@/types/auth.types";
import { toast } from "sonner";
import { Skeleton } from "./ui/skeleton";

const initialState = {
  data: {
    date: "",
    amount: 0,
    type: "expense",
    description: "",
    account_id: "",
    transactions_category_id: "01janeyxvwds3eqnfvm0bqsgn2",
  },
  message: "",
  success: null,
  errors: null,
};

type Props = {
  accountId?: string;
  onSuccess?: () => void;
};

export default function FormTransaction({ accountId, onSuccess }: Props) {
  const [allCategories, setAllCategories] = useState<TransactionCategory[]>([]);
  const [filteredCategories, setFilteredCategories] = useState<
    TransactionCategory[]
  >([]);
  const [loading, setLoading] = useState(true);
  const [type, setType] = useState("expense");
  const [state, formAction, pending] = useActionState(
    storeTransactionAction,
    initialState
  );

  // Fetch all categories once
  useEffect(() => {
    getTransactionCategories()
      .then((res) => {
        if (res.success === false) {
          toast.error(
            `${res.message}: Can't continue to create transaction request`
          );
          setLoading(false);
          return;
        }
        setAllCategories(res);
      })
      .finally(() => setLoading(false));
  }, []);

  // Filter categories whenever type changes
  useEffect(() => {
    let filtered = [];
    if (type === "expense") {
      filtered = allCategories.filter((item) => item.name !== "Uang Masuk");
    } else if (type === "income") {
      filtered = allCategories.filter((item) => item.name !== "Uang Keluar");
    } else {
      filtered = allCategories;
    }

    setFilteredCategories(filtered);
  }, [type, allCategories]);

  useEffect(() => {
    if (state?.success === true) {
      toast.success("Transaction successfully created");
      onSuccess?.();
    } else if (state?.success === false) {
      toast.error(state?.message || "Failed to create transaction");
    }
  }, [state, onSuccess]);

  return (
    <>
      {loading && (
        <>
          <Skeleton className="w-full h-12 mb-3" />
          <Skeleton className="w-full h-12 mb-3" />
          <Skeleton className="w-full h-12 mb-3" />
          <Skeleton className="w-full h-12 mb-3" />
          <Skeleton className="w-full h-12 mb-3" />
          <Skeleton className="w-full h-12 mb-3" />
        </>
      )}

      {!loading && (
        <form action={formAction}>
          <input type="hidden" name="account_id" value={accountId} />
          <div className="grid w-full items-center gap-1.5 mb-3">
            <Label htmlFor="date">Date</Label>
            <DatePickerInputField className="w-full px-3 py-2.5" mode="date" />
            {state?.errors && (
              <p className="text-error font-normal">
                {state?.errors?.date?.[0]}
              </p>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5 mb-3">
            <Label htmlFor="amount">Amount</Label>
            <InputCurrency name="amount" value={state?.data?.amount ?? 0} />
            {state?.errors && (
              <p className="text-error font-normal">
                {state?.errors?.amount?.[0]}
              </p>
            )}
            <Select
              name="type"
              defaultValue={state?.data?.type}
              onValueChange={(value) => setType(value)}
            >
              <SelectTrigger className="w-full bg-secondary-background text-foreground">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="bg-secondary-background text-foreground">
                <SelectGroup>
                  <SelectItem value="expense">Expense</SelectItem>
                  <SelectItem value="income">Income</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
            {state?.errors && (
              <p className="text-error font-normal">
                {state?.errors?.type?.[0]}
              </p>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5 mb-3">
            <Label htmlFor="description">Description/Note</Label>
            <Input
              type="text"
              id="description"
              name="description"
              placeholder="Description Note"
            />
            {state?.errors && (
              <p className="text-error font-normal">
                {state?.errors?.description?.[0]}
              </p>
            )}
          </div>

          <div className="grid w-full items-center gap-1.5 mb-3">
            <Label htmlFor="transactions_category_id">
              Transaction Category
            </Label>
            <SelectCategoryTransaction
              categories={filteredCategories}
              defaultValue={state?.data?.transactions_category_id}
            />
            {state?.errors && (
              <p className="text-error font-normal">
                {state?.errors?.transactions_category_id?.[0]}
              </p>
            )}
          </div>

          <Button type="submit" className="w-full" disabled={pending}>
            <SaveIcon className="mr-1 h-4 w-4" />
            {pending ? "Submitting..." : "Submit"}
            <span className="sr-only">Submit</span>
          </Button>
        </form>
      )}
    </>
  );
}
