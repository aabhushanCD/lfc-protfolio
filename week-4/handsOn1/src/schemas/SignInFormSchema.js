import * as yup from "yup";

export const signInFormSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .min(8, "Minimum 8 characters")
    .required("Password is required"),
});
