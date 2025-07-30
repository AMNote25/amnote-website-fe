"use client";
import Language from "@/components/header/language";
import Logo from "@/components/nav-bar/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { login } from "@/api/services/service_Authentication";

export default function MLoginPage() {
  const [formData, setFormData] = useState({
    companyID: "",
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.companyID || !formData.username || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const response = await login({
        username: formData.username,
        password: formData.password,
        companyID: formData.companyID,
        Lag: "VIET"
      });

      if (response.ok && response.data?.access_token) {
        // Store token in localStorage
        localStorage.setItem("access_token", response.data.access_token);
        
        // Redirect to admin page
        router.push("/admin");
      } else {
        setError(response.data?.message || "Đăng nhập thất bại");
      }
    } catch (error) {
      console.error("Login error:", error);
      setError("Có lỗi xảy ra khi đăng nhập. Vui lòng thử lại.");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="flex-1">
      <div className="flex items-center justify-center h-screen w-screen">
        <div className="flex flex-col bg-white shadow-md gap-4 rounded-2xl h-fit w-2xs p-4">
          <div className="flex flex-col w-full justify-center items-center">
            <Logo className="h-24" />
            <h4 className="font-semibold">Phần mềm kế toán nè</h4>
            <h1 className="text-xl font-semibold text-am-red">Đăng nhập</h1>
          </div>
          
          <form onSubmit={handleLogin} className="flex flex-col w-full justify-evenly items-center h-full">
            {error && (
              <div className="w-full mb-2 p-2 bg-red-100 border border-red-400 text-red-700 rounded">
                {error}
              </div>
            )}
            
            <Input
              name="companyID"
              placeholder="Mã công ty"
              className="w-full mb-2"
              type="text"
              value={formData.companyID}
              onChange={handleInputChange}
              disabled={loading}
            />
            <Input
              name="username"
              placeholder="Tên đăng nhập"
              className="w-full mb-2"
              type="text"
              value={formData.username}
              onChange={handleInputChange}
              disabled={loading}
            />
            <Input
              name="password"
              placeholder="Mật khẩu"
              className="w-full mb-2"
              type="password"
              value={formData.password}
              onChange={handleInputChange}
              disabled={loading}
            />
            <Button 
              type="submit" 
              className="w-full" 
              disabled={loading}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </Button>
          </form>
          
          <div className="flex items-center justify-end w-full">
            <Language />
          </div>
        </div>
      </div>
    </div>
  );
}
