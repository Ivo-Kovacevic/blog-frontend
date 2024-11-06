export default async function apiCall(url, method = "GET", body) {
  const token = localStorage.getItem("jwt");
  return await fetch(url, {
    mode: "cors",
    method: method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });
}
