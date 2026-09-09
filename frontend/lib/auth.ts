import Cookies from "js-cookie";

const TOKEN_KEY = "adipa_admin_token";
const COOKIE_EXPIRES = 3; // dias

export function saveToken(token: string) {
  Cookies.set(TOKEN_KEY, token, {
    expires: COOKIE_EXPIRES,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
  });
}

export function getToken(): string | undefined {
  return Cookies.get(TOKEN_KEY);
}

export function removeToken() {
  Cookies.remove(TOKEN_KEY);
}

export function authHeaders(): Record<string, string> {
  const token = getToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}
