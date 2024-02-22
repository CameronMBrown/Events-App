import { redirect } from "react-router-dom";

/**
 * Loads the LocalStorage token to get logged in status
 * @returns Authentication token
 */
export function getAuthToken() {
  const token = localStorage.getItem("token");
  if(!token) return null

  const tokenDuration = getTokenDuration();
  if (tokenDuration < 0) {
    return 'EXPIRED'
  }

  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

/**
 * Redirects to the login form if the user attempts to visit a
 * restricted page while not logged in.
 */
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
    return redirect("/auth");
  }

  return null;
}

/**
 * Compares the current time to the remaining time the current token will be valid
 * @returns Time in ms representing how long the current token will remain valid
 */
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();

  return duration;
}
