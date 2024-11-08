export default async function apiCall(endpoint: string, method = "GET", body: {}) {
  const api = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("jwt");
  const options: RequestInit = {
    method,
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  if (method !== "GET" && Object.keys(body).length > 0) {
    options.body = JSON.stringify(body);
  }

  return await fetch(`${api}/${endpoint}`, options);
}
