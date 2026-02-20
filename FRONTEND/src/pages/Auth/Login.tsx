import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import axios from "axios";

// Put logo.png inside /public folder
const logo = "/logo.png";

// ✅ Read backend URL from Vite env (instead of hardcoding localhost)
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedRole, setSelectedRole] = useState("hr_manager");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        `${API_URL}/auth/login`,
        { email, password },
        {
          // ✅ Safe to keep (even if you’re using JWT in localStorage)
          // Helps later if you switch to cookies
          withCredentials: true,
        }
      );

      // ✅ Store token for protected calls later
      localStorage.setItem("token", response.data.token);

      navigate("/dashboard");
    } catch (err: any) {
      setError("Invalid email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left - Brand panel */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#A86520] items-center justify-center p-12">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <img
            src={logo}
            alt="Taskify"
            className="mx-auto h-20 w-20 mb-8 brightness-0 invert"
          />

          <p className="text-xl text-white/80 mb-2">
            Système Intelligent de Recommandation
          </p>
          <p className="text-white/60 max-w-md">
            Optimisez la gestion de vos employés avec des recommandations basées
            sur l&apos;intelligence artificielle.
          </p>

          <div className="mt-12 flex justify-center gap-8 text-white/50">
            <div className="text-center">
              <p className="text-3xl font-bold text-white/80">500+</p>
              <p className="text-sm">Employés</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white/80">50+</p>
              <p className="text-sm">Départements</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-white/80">98%</p>
              <p className="text-sm">Satisfaction</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right - Login form */}
      <div className="flex flex-1 items-center justify-center p-8 bg-white">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <img src={logo} alt="Taskify" className="h-10 w-10" />
            <h1 className="text-2xl font-bold text-[#A86520]">TASKIFY</h1>
          </div>

          <h2 className="text-2xl font-bold mb-1">Bienvenue</h2>
          <p className="text-sm text-gray-500 mb-8">
            Connectez-vous à votre compte
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Role selector (demo only) */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Rôle (démo)
              </label>
              <select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
                className="w-full h-11 rounded-lg border pl-3 pr-3 text-sm focus:border-[#A86520] focus:outline-none focus:ring-1 focus:ring-[#A86520]"
              >
                <option value="hr_manager">HR Manager</option>
                <option value="admin">Admin</option>
                <option value="employee">Employee</option>
              </select>
            </div>

            {/* Email */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">Email</label>
              <div className="relative">
                <Mail
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="votre.email@maghrebia.tn"
                  className="w-full h-11 rounded-lg border pl-10 pr-3 text-sm focus:border-[#A86520] focus:outline-none focus:ring-1 focus:ring-[#A86520]"
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 rounded-lg border pl-10 pr-3 text-sm focus:border-[#A86520] focus:outline-none focus:ring-1 focus:ring-[#A86520]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-lg bg-[#A86520] text-white font-semibold hover:opacity-90 disabled:opacity-60"
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;