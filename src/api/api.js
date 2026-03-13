const isDev = process.env.NODE_ENV === "development";
const hostname = window.location.hostname;
const protocol = isDev ? "http" : "https";
const backendPort = isDev ? ":5000" : "";

// ✅ In production, always point to the Render backend
export const BASE_URL = isDev
  ? `${protocol}://${hostname}${backendPort}/api/v1`
  : "https://vtu-backend-wjn6.onrender.com/api/v1";

export const getHeaders = (includeAuth = true) => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(includeAuth && token && { Authorization: `Bearer ${token}` }),
  };
};
