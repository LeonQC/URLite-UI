import { useState } from "react";
import { useNavigate } from "react-router";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Checkbox } from "../components/ui/checkbox";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("example@gmail.com");
  const [password, setPassword] = useState("••••••••••");
  const [rememberMe, setRememberMe] = useState(false);
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    navigate("/app");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
      {/* Login Form Card */}
      <div className="bg-white rounded-2xl shadow-2xl p-8 lg:p-12 w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-2 mb-8 justify-center">
          <div className="w-10 h-10 bg-indigo-600 rounded-full flex items-center justify-center">
            <div className="w-5 h-5 bg-white rounded-full"></div>
          </div>
          <span className="font-semibold text-gray-800 text-xl">URLite</span>
        </div>

        <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">
          Welcome to
        </h1>
        <h2 className="text-3xl font-bold text-indigo-600 mb-8 text-center">
          URLite
        </h2>

        <form onSubmit={handleLogin} className="space-y-6">
          {/* Google Login Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center gap-3 py-6 border-2"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.8 10.2273C19.8 9.51823 19.7364 8.83641 19.6182 8.18186H10.2V12.05H15.5818C15.3364 13.3 14.6182 14.3591 13.5455 15.0682V17.5773H16.8182C18.7091 15.8364 19.8 13.2727 19.8 10.2273Z"
                fill="#4285F4"
              />
              <path
                d="M10.2 20C12.9 20 15.1727 19.1045 16.8182 17.5773L13.5455 15.0682C12.6273 15.6682 11.4909 16.0227 10.2 16.0227C7.59091 16.0227 5.37273 14.2636 4.56364 11.9H1.18182V14.4909C2.81818 17.7591 6.21818 20 10.2 20Z"
                fill="#34A853"
              />
              <path
                d="M4.56364 11.9C4.35455 11.3 4.23636 10.6591 4.23636 10C4.23636 9.34091 4.35455 8.7 4.56364 8.1V5.50909H1.18182C0.509091 6.85909 0.1 8.38636 0.1 10C0.1 11.6136 0.509091 13.1409 1.18182 14.4909L4.56364 11.9Z"
                fill="#FBBC05"
              />
              <path
                d="M10.2 3.97727C11.6091 3.97727 12.8591 4.48182 13.8409 5.42727L16.7364 2.53182C15.1682 1.08636 12.8955 0.1 10.2 0.1C6.21818 0.1 2.81818 2.34091 1.18182 5.60909L4.56364 8.2C5.37273 5.83636 7.59091 3.97727 10.2 3.97727Z"
                fill="#EA4335"
              />
            </svg>
            <span>Login with Google</span>
          </Button>

          {/* Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">OR</span>
            </div>
          </div>

          {/* Email Input */}
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type="email"
              placeholder="example@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10 py-6 bg-gray-100 border-0"
            />
          </div>

          {/* Password Input */}
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="••••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="pl-10 pr-10 py-6 bg-gray-100 border-0"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2"
            >
              {showPassword ? (
                <EyeOff className="w-5 h-5 text-gray-500" />
              ) : (
                <Eye className="w-5 h-5 text-gray-500" />
              )}
            </button>
          </div>

          {/* Remember Me & Forgot Password */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Checkbox
                checked={rememberMe}
                onCheckedChange={(checked) =>
                  setRememberMe(checked as boolean)
                }
                id="remember"
              />
              <label
                htmlFor="remember"
                className="text-sm text-gray-600 cursor-pointer"
              >
                Remember me
              </label>
            </div>
            <a href="#" className="text-sm text-indigo-600 hover:underline">
              Forgot Password?
            </a>
          </div>

          {/* Login Button */}
          <Button type="submit" className="w-full py-6 bg-indigo-600 hover:bg-indigo-700 text-white">
            Login
          </Button>

          {/* Register Link */}
          <div className="text-center text-sm text-gray-600">
            Don't have an account?{" "}
            <a href="#" className="text-indigo-600 hover:underline font-medium">
              Register
            </a>
          </div>
        </form>
      </div>
    </div>
  );
}