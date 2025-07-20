"use server";

import { AuthResponse, InitialState, UserData } from "@/types/auth.types";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.API_URL ?? "http://127.0.0.1:8000";

export async function loginAction(
  prevState: Record<string, unknown>,
  formData: FormData
): Promise<InitialState> {
  const data = {
    id_user: formData.get("id_user") as string,
    password: formData.get("password") as string,
  };

  if (!data.id_user || !data.password) {
    return {
      success: false,
      message: "Please fill in all fields",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: AuthResponse = await response.json();

    if (result.success && result.token) {
      // Store token in cookie
      (await cookies()).set("auth-token", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      // Store user data in cookie (for client access)
      (await cookies()).set("user-data", JSON.stringify(result.data), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      return {
        data: {
          ...data,
          userData: JSON.stringify(result.data),
        },
        success: true,
        message: result.message || "Login successful",
      };
    }

    return {
      data,
      success: false,
      message: result.message || "Login failed",
      errors: result.errors,
    };
  } catch (error) {
    console.error(error);
    return {
      data,
      success: false,
      message: "Network error occurred",
    };
  }
}

export async function registerAction(
  prevState: Record<string, unknown>,
  formData: FormData
): Promise<InitialState> {
  const data = {
    name: formData.get("name") as string,
    username: formData.get("username") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    password_confirmation: formData.get("password_confirmation") as string,
  };
  if (!data.name || !data.username || !data.email || !data.password) {
    return {
      success: false,
      message: "Please fill in all fields",
    };
  }

  if (data.password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters",
    };
  }

  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result: AuthResponse = await response.json();

    if (result.success) {
      return {
        success: true,
        message: "Account created successfully! Please login.",
      };
    }

    return {
      data,
      success: false,
      message: result.message || "Registration failed",
      errors: result.errors,
    };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      message: "Network error occurred",
    };
  }
}

export async function getStoredUserData(): Promise<UserData | null> {
  const authToken = (await cookies()).get("auth-token")?.value;
  const userDataRaw = (await cookies()).get("user-data")?.value;

  if (!authToken || !userDataRaw) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/api/v1`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${authToken}`,
      },
    });

    if (!response.ok) {
      console.warn("Invalid token or failed verification");
      return null;
    }

    const userData: UserData = JSON.parse(userDataRaw);
    return userData;
  } catch (error) {
    console.error("Failed to fetch or parse user data:", error);
    return null;
  }
}

export async function logoutAction(): Promise<void> {
  try {
    await fetch("/api/auth/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error("Failed to call server logout:", e);
  }

  (await cookies()).delete("auth-token");
  (await cookies()).delete("user-data");
  return;
}
