import { LogoutPropsFunc } from "./type";

export function useLogout(): LogoutPropsFunc {
  function logout() {
    sessionStorage.clear();
    window.location.href = "/login";
  }
  return { logout };
}
