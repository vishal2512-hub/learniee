import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  GraduationCap,
  Mail,
  Lock,
  UserRound,
  ArrowRight,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError("");

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      await signup(
        formData.name,
        formData.email,
        formData.password
      );

      navigate("/dashboard");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Unable to create account. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">

      <div className="grid min-h-screen lg:grid-cols-2">

        {/* =====================================
            LEFT SIDE
        ===================================== */}

        <div className="hidden bg-indigo-600 p-12 text-white lg:flex lg:flex-col lg:justify-between">

          {/* Logo */}

          <div className="flex items-center gap-3">

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-white text-indigo-600">
              <GraduationCap size={24} />
            </div>

            <span className="text-xl font-bold">
              Learniee
            </span>

          </div>

          {/* Content */}

          <div className="max-w-lg">

            <p className="mb-4 text-sm font-semibold tracking-wide text-indigo-200">
              START YOUR CHILD'S LEARNING JOURNEY
            </p>

            <h1 className="text-5xl font-bold leading-tight">
              One account.
              <br />
              Better learning.
            </h1>

            <p className="mt-6 text-lg leading-8 text-indigo-100">
              Create your parent account and discover
              courses, teachers and learning experiences
              designed for your child.
            </p>

            {/* Benefits */}

            <div className="mt-8 space-y-4">

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  ✓
                </div>

                <span className="text-sm text-indigo-100">
                  Explore quality courses
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  ✓
                </div>

                <span className="text-sm text-indigo-100">
                  Compare teachers and ratings
                </span>

              </div>

              <div className="flex items-center gap-3">

                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/10">
                  ✓
                </div>

                <span className="text-sm text-indigo-100">
                  Find courses that fit your child
                </span>

              </div>

            </div>

          </div>

          {/* Footer */}

          <p className="text-sm text-indigo-200">
            © 2026 Learniee
          </p>

        </div>

        {/* =====================================
            RIGHT SIDE
        ===================================== */}

        <div className="flex items-center justify-center p-6 sm:p-10">

          <div className="w-full max-w-md">

            {/* Mobile Logo */}

            <div className="mb-8 lg:hidden">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-600 text-white">
                  <GraduationCap size={22} />
                </div>

                <span className="text-xl font-bold text-slate-900">
                  Learniee
                </span>

              </div>

            </div>

            {/* Heading */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold tracking-tight text-slate-900">
                Create your account
              </h2>

              <p className="mt-2 text-sm leading-6 text-slate-500">
                Join Learniee and start finding the right
                courses for your child.
              </p>

            </div>

            {/* Form */}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Name */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Full name
                </label>

                <div className="relative">

                  <UserRound
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="you@example.com"
                    autoComplete="email"
                    required
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={18}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400"
                  />

                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Create a password"
                    autoComplete="new-password"
                    required
                    minLength={6}
                    className="w-full rounded-xl border border-slate-200 bg-white py-3 pl-10 pr-4 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-50"
                  />

                </div>

                <p className="mt-2 text-xs text-slate-400">
                  Password must be at least 6 characters.
                </p>

              </div>

              {/* Error */}

              {error && (

                <div className="flex items-start gap-2 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm leading-5 text-red-600">

                  <span>⚠️</span>

                  <span>{error}</span>

                </div>

              )}

              {/* Submit */}

              <button
                type="submit"
                disabled={loading}
                className="flex w-full items-center justify-center gap-2 rounded-xl bg-indigo-600 py-3.5 text-sm font-bold text-white shadow-lg shadow-indigo-200 transition hover:bg-indigo-700 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60"
              >

                {loading
                  ? "Creating account..."
                  : "Create account"}

                {!loading && (
                  <ArrowRight size={17} />
                )}

              </button>

            </form>

            {/* Login */}

            <p className="mt-7 text-center text-sm text-slate-500">

              Already have an account?{" "}

              <Link
                to="/login"
                className="font-bold text-indigo-600 transition hover:text-indigo-700"
              >
                Sign in
              </Link>

            </p>

            {/* Terms */}

            <p className="mt-5 text-center text-xs leading-5 text-slate-400">
              By creating an account, you agree to use
              Learniee responsibly for your child's
              educational journey.
            </p>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Signup;