import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { Lock, Mail, LogIn, AlertCircle } from "lucide-react";
import {
  validateAdminLogin,
  setCurrentAdmin,
  logAdminAction,
} from "@/lib/admin-store";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [{ title: "Đăng nhập Quản Trị — UniVenture Admin" }],
  }),
  component: AdminLogin,
});

function AdminLogin() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const result = validateAdminLogin(email, password);
    if (result.success) {
      setCurrentAdmin(email);
      logAdminAction(email, "ĐĂNG NHẬP", "ADMIN", "Đăng nhập thành công vào trang quản trị");
      navigate({ to: "/admin" });
    } else {
      setError(result.message || "Email hoặc mật khẩu không chính xác!");
    }
  };

  return (
    <div className="min-h-screen bg-[#122554] flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <img src="/logo.svg" alt="UniVenture" className="h-10 mx-auto mb-4 invert" />
        <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
          Cổng Quản Trị UniVenture
        </h2>
        <p className="mt-2 text-sm text-white/75">
          Đăng nhập bằng email và mật khẩu quản trị nội bộ
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="bg-white py-8 px-6 shadow-2xl border-2 border-[#122554] sm:px-10">
          <form className="space-y-5" onSubmit={handleLogin}>
            {error && (
              <div className="p-3 bg-red-50 border-l-4 border-red-500 text-red-700 text-xs flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#122554] mb-1.5">
                Email quản trị
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Mail className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full border-2 border-[#122554] pl-10 pr-3.5 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                  placeholder="admin@univentureadmissions.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-[#122554] mb-1.5">
                Mật khẩu quản trị
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                  <Lock className="h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full border-2 border-[#122554] pl-10 pr-3.5 py-2.5 text-sm focus:border-[#ffcd6b] outline-none"
                  placeholder="Nhập mật khẩu quản trị"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full flex justify-center items-center gap-2 py-3 px-4 text-sm font-bold uppercase tracking-wider text-white bg-[#122554] hover:bg-[#ffcd6b] transition-colors cursor-pointer"
              >
                <LogIn className="h-4 w-4" />
                Đăng nhập Admin
              </button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
