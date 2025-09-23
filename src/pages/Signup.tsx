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
    <main className="w-full h-screen flex justify-center items-center bg-gray-200">
      <div className="w-full h-full md:w-[476px] md:h-[573px] bg-white flex flex-col justify-center items-center md:rounded-lg shadow-lg">
        <h1 className="flex justify-center items-center mx-8">
          <img src="/images/Group 252.svg" width={146} height={32} alt="logo" />
        </h1>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 w-full max-w-md">
            {error}
          </div>
        )}

        <form className="w-full max-w-md p-4 md:px-8" onSubmit={handleSubmit(onSubmit)} noValidate>
          <h1 className="text-2xl md:text-[32px] text-center text-neutral-900 pb-2">
            Create Account
          </h1>
          <p className="text-sm md:text-4 text-center text-neutral-900">
            Let&apos;s get you started sharing your links
          </p>

          {/* Email Field */}
          <div className="pt-4 text-xs md:text-md text-neutral-700 space-y-1">
            <label htmlFor="email">Email address</label>
            <div className={`p-2 w-full h-[48px] flex space-x-4 border rounded-lg ${
              errors.email ? 'border-red-500' : 'border-gray-300'
            } focus-within:ring-2 focus-within:ring-blue-500`}>
              <span className="flex justify-center items-center">
                <img
                  src="/images/ph_envelope-simple-fill.svg"
                  width={16}
                  height={16}
                  alt="address logo"
                />
              </span>
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full outline-none bg-transparent"
                autoComplete="email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password Field */}
          <div className="pt-4 text-xs md:text-md text-neutral-700 space-y-1">
            <label htmlFor="password">Create Password</label>
            <div className={`p-2 w-full h-[48px] flex space-x-4 border rounded-lg ${
              errors.password ? 'border-red-500' : 'border-gray-300'
            } focus-within:ring-2 focus-within:ring-blue-500`}>
              <span className="flex justify-center items-center">
                <img
                  src="/images/ph_lock-key-fill.svg"
                  width={16}
                  height={16}
                  alt="password logo"
                />
              </span>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full outline-none bg-transparent"
                autoComplete="new-password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Confirm Password Field */}
          <div className="pt-4 text-xs md:text-md text-neutral-700 space-y-1">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <div className={`p-2 w-full h-[48px] flex space-x-4 border rounded-lg ${
              errors.confirmPassword ? 'border-red-500' : 'border-gray-300'
            } focus-within:ring-2 focus-within:ring-blue-500`}>
              <span className="flex justify-center items-center">
                <img
                  src="/images/ph_lock-key-fill.svg"
                  width={16}
                  height={16}
                  alt="confirm password logo"
                />
              </span>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm your password"
                className="w-full outline-none bg-transparent"
                autoComplete="new-password"
                {...register("confirmPassword")}
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">{errors.confirmPassword.message}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full h-[46px] bg-violet-600 text-white text-[16px] cursor-pointer my-4 border rounded-lg hover:bg-violet-700 transition-colors disabled:opacity-70"
          >
            {loading ? "Creating Account..." : "Create your account"}
          </button>
          
          <h2 className="text-sm md:text-[16px] pt-2 flex justify-center items-center cursor-pointer">
            Already have an account?{" "}
            <Link to='/' className="px-2 text-violet-600 hover:underline"> 
              Login            
            </Link>
          </h2>
        </form>
      </div>
    </main>
  );
}