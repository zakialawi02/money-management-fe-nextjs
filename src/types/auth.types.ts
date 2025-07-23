/* eslint-disable @typescript-eslint/no-explicit-any */
export type InitialState<T = Record<string, any>> = {
  data?: T;
  message?: string;
  success: boolean | null;
  errors?: Record<string, string[]> | null;
};

export interface UserData {
  id: string;
  name: string;
  username: string;
  email: string;
  role: string;
  profile_photo_path: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
}

export interface LoginFormData {
  id_user: string;
  password: string;
}

export interface RegisterFormData {
  name: string;
  username: string;
  email: string;
  password: string;
  password_confirmation?: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  token?: string;
  token_type?: string;
  data?: UserData;
  errors?: Record<string, string[]> | null;
}

export interface Account {
  id: string;
  name: string;
  description: string | null;
  balance: number;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  users?: UserData[];
}

export interface TransactionCategory {
  id: string;
  name: string;
  description: string | null;
  color?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Transaction {
  id: string;
  date: string;
  type: string;
  amount: number;
  description: string | null;
  account_id: string;
  created_at?: string;
  updated_at?: string;
  deleted_at?: string | null;
  transactions_category_id?: string;
  category?: TransactionCategory;
}
