"use server";

import { Account, Transaction } from "@/types/auth.types";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_URL ?? "http://127.0.0.1:8000";

export async function createAccountAction(prev: Account, formData: FormData) {
  try {
    const data = {
      name: formData.get("name") as string,
      description: formData.get("description") as string,
      balance: formData.get("balance") as string,
    };
    const token = (await cookies()).get("authToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/v1/accounts`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("Failed to create account:", res.statusText);
      console.log(json);
      return {
        data,
        success: false,
        message: json.message || "Failed to create account",
        errors: json.error,
      };
    }

    return json;
  } catch (error) {
    console.error("createAccount error:", error);
    return { success: false, message: "An error occurred" };
  }
}

export async function deleteAccountAction(id: string) {
  try {
    const token = (await cookies()).get("authToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/v1/accounts/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const json = await res.json();
    if (!res.ok) {
      console.error("Failed to delete account:", res.statusText);
      console.log(json);
      return {
        success: false,
        message: json.message || "Failed to delete account",
        errors: json.error,
      };
    }

    return json;
  } catch (error) {
    console.error("deleteAccount error:", error);
    return { success: false, message: "An error occurred" };
  }
}

export async function getAccount() {
  try {
    const token = (await cookies()).get("authToken")?.value;
    if (!token) {
      console.warn("No auth token found");
      return {
        success: false,
        message: "No auth token found",
        data: [
          {
            redirect: "/login",
          },
        ],
      };
    }

    const response = await fetch(`${API_BASE_URL}/api/v1/accounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    if (!response.ok) {
      return { success: false, message: "An error occurred", data: [] };
    }

    const json = await response.json();
    return { success: true, data: json.data || [] };
  } catch (error) {
    console.error("getAccount error:", error);
    return { success: false, message: "An error occurred", data: [] };
  }
}

export async function getTransactions(accountId: string, dateParam?: string) {
  try {
    const token = (await cookies()).get("authToken")?.value;
    const res = await fetch(
      `${API_BASE_URL}/api/v1/transactions?account_id=${accountId}&date=${
        dateParam ?? ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const json = await res.json();
    return json;
  } catch (error) {
    console.error("getTransactions error:", error);
    return { success: false, message: "An error occurred", data: [] };
  }
}

export async function getTransactionCategories() {
  try {
    const token = (await cookies()).get("authToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/v1/transactions_category`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if (!res.ok) {
      console.error("Failed to fetch transaction categories:", res.statusText);
      return {
        success: false,
        message: "Failed to fetch transaction categories",
      };
    }
    const json = await res.json();
    return json.data || [];
  } catch (error) {
    console.error("Error while fetching transaction categories:", error);
    return { success: false, message: "An error occurred" };
  }
}

export async function storeTransactionAction(
  prev: Transaction,
  formData: FormData
) {
  try {
    const data = {
      date: formData.get("date") as string,
      type: formData.get("type") as string,
      amount: parseFloat(formData.get("amount") as string),
      description: formData.get("description") as string,
      account_id: formData.get("account_id") as string,
      transactions_category_id: formData.get(
        "transactions_category_id"
      ) as string,
    };

    const token = (await cookies()).get("authToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/v1/transactions`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const json = await res.json();
    if (!res.ok) {
      console.error("Failed to store transaction:", res.statusText);
      return {
        data,
        success: false,
        message: json.message || "Login failed",
        errors: json.errors,
      };
    }

    return json;
  } catch (error) {
    console.error("Error while storing transaction:", error);
    return { success: false, message: "An error occurred" };
  }
}

export async function deleteTransactionAction(id: string) {
  try {
    const token = (await cookies()).get("authToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/v1/transactions/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();

    if (!res.ok) {
      console.error("Failed to delete transaction:", data?.message);
      return {
        success: false,
        message: data?.message || "Failed to delete transaction",
      };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Error while deleting transaction:", error);
    return { success: false, message: "An error occurred" };
  }
}

export async function getShareStreamLink(
  userId: string,
  accountId: string,
  date: string
) {
  try {
    const token = (await cookies()).get("authToken")?.value;
    const res = await fetch(`${API_BASE_URL}/api/v1/get-streams-url`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        user_id: userId,
        account_id: accountId,
        date: date,
      }),
    });

    const json = await res.json();
    if (!res.ok) {
      console.error("Failed to get streams URL:", res.statusText);
      return {
        success: false,
        message: json.message || "Failed",
        errors: json.errors,
      };
    }
    return json;
  } catch (error) {
    console.error("Error while getting streams URL:", error);
    return { success: false, message: "An error occurred" };
  }
}
