import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { signInFormSchema } from "../schemas/SignInFormSchema";
import { login } from "../services/LoginService";
import { useNavigate } from "react-router-dom";

const SignInForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    resolver: yupResolver(signInFormSchema),
    mode: "onChange",
  });
const navigate = useNavigate();
  const onSubmit = async (data) => {
    try {
      const response = await login(data);
      if (response) {
        console.log("login successful", response.data);
        localStorage.setItem("accessToken", response.data.accessToken);
        localStorage.setItem("refreshToken", response.data.refreshToken);
        navigate('/')
      }
      console.log(response);
    } catch (error) {
      console.log("error message", error);
    }
  };
  return (
    <div>
      <h1>Sign In</h1>

      <form onSubmit={handleSubmit(onSubmit)} noValidate>
        <input type="email" placeholder="Email" {...register("email")} />

        <p>{errors?.email?.message}</p>

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <p>{errors?.password?.message}</p>

        <button type="submit" disabled={!isValid || isSubmitting}>
          {isSubmitting ? "Signing In..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default SignInForm;
