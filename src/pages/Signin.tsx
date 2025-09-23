// components/Signin.js
import { Link, useNavigate} from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useAuth } from "../context/authContext";
import { toast } from "react-toastify";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

function Signin() {
  const { signIn, signInWithGoogle, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

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
      await signIn(data.email, data.password);
      navigate("/dashboard");
       toast.success("Signed in successfully!");
    } catch (error: any) {
      setError(error.message || "Failed to sign in. Please check your credentials.");
      console.error("Sign in error:", error);
      toast.error(error.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setGoogleLoading(true);
      await signInWithGoogle();
      navigate("/dashboard");
    } catch (error: any) {
      setError(error.message || "Failed to sign in with Google.");
      console.error("Google sign in error:", error);
    } finally {
      setGoogleLoading(false);
    }
  };

  // Show loading screen while checking authentication state
  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-200">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-200">
      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img src="/images/Group 252.svg" alt="App Logo" className="h-12" />
        </div>

        {/* Error message */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        {/* Google Sign In Button */}
        <button
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="w-full flex items-center cursor-pointer justify-center gap-3 bg-white border border-gray-300 text-gray-700 font-semibold py-3 rounded-lg hover:bg-gray-50 transition duration-200 disabled:opacity-70 mb-6"
        >
          <img
            src="https://fonts.gstatic.com/s/i/productlogos/googleg/v6/24px.svg"
            alt="Google"
            className="w-5 h-5"
          />
          {googleLoading ? "Signing in with Google..." : "Sign in with Google"}
        </button>

        {/* Divider */}
        <div className="relative mb-6">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-gray-300"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 bg-white text-gray-500">Or continue with email</span>
          </div>
        </div>

        {/* Email Form */}
        <form className="w-full" onSubmit={handleSubmit(onSubmit)} noValidate>
         
          <p className="text-base text-neutral-800 text-center mb-8">
            Add your details below to get back into the app
          </p>

          {/* Email Field */}
          <div className="mb-5">
            <label
              htmlFor="email"
              className="block text-sm font-medium text-black mb-2"
            >
              Email address
            </label>
            <div
              className={`flex items-center border ${
                errors.email ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 h-12 focus-within:ring-2 focus-within:ring-blue-500`}
            >
              <img
                src="/images/ph_envelope-simple-fill.svg"
                width={16}
                height={16}
                alt="Email Icon"
                className="mr-2"
              />
              <input
                type="email"
                id="email"
                placeholder="Enter your email"
                className="w-full h-full outline-none text-base text-gray-600 bg-transparent"
                autoComplete="email"
                {...register("email")}
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password Field */}
          <div className="mb-6">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-black mb-2"
            >
              Password
            </label>
            <div
              className={`flex items-center border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-lg p-2 h-12 focus-within:ring-2 focus-within:ring-blue-500`}
            >
              <img
                src="/images/ph_lock-key-fill.svg"
                width={16}
                height={16}
                alt="Password Icon"
                className="mr-2"
              />
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className="w-full h-full outline-none text-base text-gray-600 bg-transparent"
                autoComplete="current-password"
                {...register("password")}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-violet-600 text-white cursor-pointer font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-70"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>

          <h2 className="text-sm md:text-[16px] pt-2 flex justify-center items-center mt-4 cursor-pointer">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="px-2 text-violet-600">
              Create account
            </Link>
          </h2>
          
        </form>
      </div>
    </div>
  );
}

export default Signin;