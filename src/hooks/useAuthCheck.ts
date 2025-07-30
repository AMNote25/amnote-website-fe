import { useEffect } from "react";
import { useRouter } from "next/navigation";

export function useAuthCheck() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    
    if (!token) {
      // No token found, redirect to login
      router.push("/auth/login");
    }
  }, [router]);

  return {
    isAuthenticated: !!localStorage.getItem("access_token"),
    logout: () => {
      localStorage.removeItem("access_token");
      router.push("/auth/login");
    }
  };
}
