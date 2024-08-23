"use client";

import { useLogout } from "@/app/hooks/logout";

export function Navigation() {
  const { logout } = useLogout();
  return (
    <nav className="px-10 py-5">
      <div className="flex justify-end">
        <button onClick={logout} className="hover:underline text-sm">Logout</button>
      </div>
    </nav>
  );
}
