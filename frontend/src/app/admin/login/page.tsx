"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Lock, User, ArrowRight } from "lucide-react";
import { API_BASE_URL } from "@/lib/config";
import Image from "next/image";
import { useEffect } from "react";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [loading, setLoading] = useState(false);
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    
    let valid = true;
    if (!username.trim()) {
      setUsernameError("Username is required");
      valid = false;
    } else {
      setUsernameError("");
    }

    if (!password.trim()) {
      setPasswordError("Password is required");
      valid = false;
    } else {
      setPasswordError("");
    }

    if (!valid) return;

    setLoading(true);
    setError("");

    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token to localStorage
      localStorage.setItem("adminToken", data.token);
      localStorage.setItem("adminUsername", data.username);

      // Redirect to dashboard
      router.push("/admin/dashboard");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-cover bg-center flex items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url('https://i.pinimg.com/1200x/4d/5e/f9/4d5ef94f9a038da39c34db143e5b98e0.jpg')" }}>
      {/* Overlay to make content readable */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-xl z-10 p-4"
      >
        <div className="text-center mb-8">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
            <Image
              src="https://sunvisionsociety.com/uploads/1596723247_logo.png"
              alt="SunVision Logo"
              width={200}
              height={48}
              className="mx-auto"
              style={{ height: "48px", width: "auto" }}
              priority
            />
          </motion.div>
          <h2 className="mt-6 text-3xl font-bold text-white tracking-tight">
            {mounted ? getGreeting() : "Welcome"}, Admin
          </h2>
          <p className="mt-2 text-sm text-gray-300">
            I hope you have a nice day! Please sign in to continue.
          </p>
        </div>

        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 rounded-2xl shadow-2xl">
          <form className="space-y-6" onSubmit={handleLogin}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-1">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <User size={18} className="text-gray-500" />
                </div>
                <input
                  id="username"
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="Enter your username"
                />
              </div>
              {usernameError && <p className="mt-1 text-xs text-red-400">{usernameError}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock size={18} className="text-gray-500" />
                </div>
                <input
                  id="password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all sm:text-sm"
                  placeholder="Enter your password"
                />
              </div>
              {passwordError && <p className="mt-1 text-xs text-red-400">{passwordError}</p>}
            </div>

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-400 text-sm text-center bg-red-500/10 py-2 rounded-lg border border-red-500/20"
              >
                {error}
              </motion.div>
            )}

            <div>
              <button
                type="submit"
                disabled={loading}
                className={`w-full flex justify-center items-center py-2.5 px-4 rounded-xl text-sm font-medium text-white transition-all ${loading
                    ? "bg-blue-600/50 cursor-not-allowed"
                    : "bg-linear-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 shadow-lg shadow-blue-600/20"
                  }`}
              >
                {loading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  <span className="flex items-center">
                    Sign in <ArrowRight size={16} className="ml-2" />
                  </span>
                )}
              </button>
            </div>

            <div className="flex flex-col items-center gap-3">
              <button
                type="button"
                onClick={async () => {
                  if (confirm("Forgot your credentials? Click OK to reset your account to 'admin / admin123' and enter the portal.")) {
                    try {
                      const res = await fetch(`${API_BASE_URL}/api/auth/reset-admin`, { method: "POST" });
                      const data = await res.json();
                      alert(data.message);
                      // Auto-login with defaults
                      const loginRes = await fetch(`${API_BASE_URL}/api/auth/login`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: "admin", password: "admin123" })
                      });
                      const loginData = await loginRes.json();
                      if (loginRes.ok) {
                        localStorage.setItem("adminToken", loginData.token);
                        localStorage.setItem("adminUsername", loginData.username);
                        router.push("/admin/dashboard");
                      }
                    } catch (err) {
                      alert("Reset failed. Please check your backend connection.");
                    }
                  }
                }}
                className="text-sm text-gray-400 hover:text-white transition-colors flex items-center gap-1 group"
              >
                Forgot Username or Password? 
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
