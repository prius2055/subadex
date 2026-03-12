// Reads the current hostname automatically
// dev:  prince.localhost  → http://prince.localhost:5000/api/v1
// prod: fastreload.com    → https://fastreload.com/api/v1

const isDev = process.env.NODE_ENV === "development";
const hostname = window.location.hostname; // e.g. "prince.localhost"
const protocol = isDev ? "http" : "https";
const backendPort = isDev ? ":5000" : ""; // no port needed in production

export const BASE_URL = `${protocol}://${hostname}${backendPort}/api/v1`;

export const getHeaders = (includeAuth = true) => {
  const token = localStorage.getItem("token");

  return {
    "Content-Type": "application/json",
    ...(includeAuth && token && { Authorization: `Bearer ${token}` }),
  };
};