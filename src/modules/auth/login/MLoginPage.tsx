"use client";
import Language from "@/components/header/language";
import Logo from "@/components/nav-bar/logo";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

/**
 * Login Page Component
 * Provides user interface for authentication
 */
export default function MLoginPage() {
  // Form state management
  const [formData, setFormData] = useState({
    companyID: "",
    username: "",
    password: "",
  });
  const [error, setError] = useState("");
  
  // Get authentication methods from context
  const { login, loading } = useAuth();

  /**
   * Handle input field changes
   * @param e - Input change event
   */
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError("");
  };

  /**
   * Handle form submission for login
   * @param e - Form submission event
   */
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.companyID || !formData.username || !formData.password) {
      setError("Vui lòng điền đầy đủ thông tin");
      return;
    }

    // Clear any existing errors
    setError("");

    // Attempt login using context method
    const result = await login({
      username: formData.username,
      password: formData.password,
      companyID: formData.companyID,
      Lag: "VIET"
    });

    // Handle login result
    if (!result.success) {
      setError(result.error || "Đăng nhập thất bại");
    }
    // Success case is handled by AuthContext (automatic redirect)
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
