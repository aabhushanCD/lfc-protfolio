import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Link, useNavigate } from "react-router";
import { useAuth } from "../context/authContext";
import { loginUserSchema, type LoginUserType } from "../schema/login.schema";

const Login = () => {
  const { login, status } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginUserType>({
    resolver: zodResolver(loginUserSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleLogin = async (data: LoginUserType) => {
    await login(data);
    navigate("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 font-sans">
      <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-8">
        <h1 className="text-2xl font-semibold text-gray-800 text-center">
          Welcome back
        </h1>
        <p className="text-sm text-gray-500 text-center mt-1 mb-6">
          Please enter your details to sign in
        </p>

        <form onSubmit={handleSubmit(handleLogin)} className="space-y-5">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Email
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
            />
            {errors?.email && (
              <p className="text-sm text-red-500 mt-1">
                {errors.email.message}
              </p>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              {...register("password")}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                         focus:outline-none focus:ring-2 focus:ring-blue-500 
                         focus:border-blue-500 transition"
            />
            {errors?.password && (
              <p className="text-sm text-red-500 mt-1">
                {errors.password.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 hover:bg-blue-700 
                       text-white font-medium py-2.5 rounded-lg
                       transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? "Signing in..." : "Sign in"}
            </button>
          </div>
        </form>
        <p className="text-sm text-center text-gray-500 mt-6">
          Don't have an account?{" "}
          <Link to="/sign-up" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
