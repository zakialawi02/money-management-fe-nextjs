"use server";

import { InitialState } from "@/types/auth.types";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://127.0.0.1:8000";

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

    const result = await response.json();

    if (result.success && result.token) {
      // Store token in cookie
      (await cookies()).set("authToken", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });
      (await cookies()).set("tokenValid", "true", {
        maxAge: 60 * 60, // 1 hour
        path: "/",
      });
      // Store user data in cookie (for client access)
      (await cookies()).set("userData", JSON.stringify(result.data), {
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
      message: "Network error occurred, Server Error 500",
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

    const result = await response.json();

    if (result.success) {
      (await cookies()).set("authToken", result.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });
      (await cookies()).set("tokenValid", "true", {
        maxAge: 60 * 60,
        path: "/",
      });
      // Store user data in cookie (for client access)
      (await cookies()).set("userData", JSON.stringify(result.data), {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 7 * 24 * 60 * 60, // 7 days
        path: "/",
      });

      return {
        data,
        success: true,
        message: result.message || "Registration successful",
      };
    } else {
      return {
        data,
        success: false,
        message: result.message || "Registration failed",
        errors: result.errors,
      };
    }
  } catch (error) {
    console.error(error);
    return {
      data,
      success: false,
      message: "Network error occurred, Server Error 500",
    };
  }
}

export async function isTokenValid(token: string): Promise<boolean> {
  try {
    const res = await fetch("http://localhost:8000/api/v1/", {
      headers: { Authorization: `Bearer ${token}` },
    });

    const data = await res.json();
    return res.ok && data.success;
  } catch (e) {
    console.error("Token validation error:", e);
    return false;
  }
}

export async function logoutAction() {
  try {
    const token = (await cookies()).get("authToken")?.value;
    await fetch(`${API_BASE_URL}/api/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    (await cookies()).delete("authToken");
    (await cookies()).delete("tokenValid");
    (await cookies()).delete("userData");
  } catch (e) {
    console.error("Failed to call server logout:", e);
    return { success: false };
  }

  return { success: true };
}

export async function getLoginStatus() {
  const token = (await cookies()).get("authToken")?.value;
  // const tokenValidFlag = (await cookies()).get("tokenValid")?.value;

  // Di sini bisa juga kamu validasi token via backend Laravel
  return !!token;
}
