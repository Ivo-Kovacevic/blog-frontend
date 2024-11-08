export default async function apiCall(endpoint, method = "GET", body) {
  const api = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem("jwt");
  return await fetch(`${api}/${endpoint}`, {
    mode: "cors",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}
