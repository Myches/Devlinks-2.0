// components/Signup.js
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

// Define validation schema with Zod
const schema = z.object({
  email: z.string()
    .min(1, "Email is required")
    .email("Enter a valid email address"),
  password: z.string()
    .min(1, "Password is required")
    .min(8, "Password must be at least 8 characters")
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, "Password must contain at least one uppercase letter, one lowercase letter, and one number"),
  confirmPassword: z.string()
    .min(1, "Please confirm your password")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
});

type FormData = z.infer<typeof schema>;

export default function Signup() {
  const { signUp } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setError("");
      setLoading(true);
      await signUp(data.email, data.password);
      navigate("/"); 
        toast.success("Account created successfully! Please log in.");
    } catch (error) {
      setError("Failed to create an account. Please try again.");
      console.error("Sign up error:", error);
      toast.error("Failed to create an account. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex justify-center items-center bg-gray-200 px-4 py-6">
      <div className="w-full max-w-md bg-white flex flex-col justify-center items-center rounded-lg shadow-lg p-4 sm:p-6 md:p-8 mx-auto">
        {/* Logo */}
        <div className="flex justify-center items-center mb-4 sm:mb-6">
          <img 
            src="/images/Group 252.svg" 
            width={146} 
            height={32} 
            alt="logo" 
            className="w-32 sm:w-36 md:w-40 h-auto"
          />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-3 py-2 sm:px-4 sm:py-3 rounded mb-4 w-full text-sm sm:text-base">
            {error}
          </div>
        )}

        <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Heading */}
          <div className="text-center mb-4 sm:mb-6">
            <h1 className="text-xl sm:text-2xl md:text-3xl text-neutral-900 font-semibold pb-2">
              Create Account
            </h1>
            <p className="text-xs sm:text-sm text-neutral-600">
              Let&apos;s get you started sharing your links
            </p>
          </div>

          {/* Email Field */}
          <div className="mb-4 sm:mb-5">
            <label htmlFor="email" className="block text-sm font-medium text-neutral-700 mb-2">
              Email address
            </label>
            <div className={`flex items-center border rounded-lg p-2 h-10 sm:h-12 ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus-within:ring-2 focus-within:ring-blue-500 transition-colors`}>
              <span className="flex justify-center items-center mr-2">
                <img
                  src="/images/ph_envelope-simple-fill.svg"
                  width={14}
                  height={14}
                  alt="Email icon"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent text-sm sm:text-base placeholder-gray-400"
                autoComplete="email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-4 sm:mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-neutral-700 mb-2">
              Create Password
            </label>
            <div className={`flex items-center border rounded-lg p-2 h-10 sm:h-12 ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } focus-within:ring-2 focus-within:ring-blue-500 transition-colors`}>
              <span className="flex justify-center items-center mr-2">
                <img
                  src="/images/ph_lock-key-fill.svg"
                  width={14}
                  height={14}
                  alt="Password icon"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent text-sm sm:text-base placeholder-gray-400"
                autoComplete="new-password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="mb-4 sm:mb-6">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-neutral-700 mb-2">
              Confirm Password
            </label>
            <div className={`flex items-center border rounded-lg p-2 h-10 sm:h-12 ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } focus-within:ring-2 focus-within:ring-blue-500 transition-colors`}>
              <span className="flex justify-center items-center mr-2">
                <img
                  src="/images/ph_lock-key-fill.svg"
                  width={14}
                  height={14}
                  alt="Confirm password icon"
                  className="w-3.5 h-3.5 sm:w-4 sm:h-4"
                />
              </span>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full outline-none bg-transparent text-sm sm:text-base placeholder-gray-400"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full h-11 sm:h-12 bg-violet-600 text-white text-sm sm:text-base cursor-pointer my-3 sm:my-4 border rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-70 font-semibold"
          >
            {loading ? "Creating Account..." : "Create your account"}
          </button>
          
          {/* Login link */}
          <div className="text-center mt-3 sm:mt-4">
            <span className="text-xs sm:text-sm flex flex-wrap justify-center items-center text-gray-600">
              Already have an account?{" "}
              <Link to='/' className="px-1 sm:px-2 text-violet-600 hover:text-violet-700 font-medium hover:underline">
                Login            
              </Link>
            </span>
          </div>
        </form>
      </div>
    </main>
  );
}