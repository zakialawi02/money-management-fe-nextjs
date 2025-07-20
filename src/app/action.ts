const API_BASE_URL = process.env.API_URL ?? "http://127.0.0.1:8000";

export async function getAccount() {
  try {
    const response = await fetch(`${API_BASE_URL}/api/v1/accounts`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("authToken") ?? ""}`,
      },
    });
    const data = await response.json();
    if (data.data?.length >= 0) {
      return data;
    }
    return false;
  } catch (error) {
    console.log(error);
  }
}
