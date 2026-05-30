import { useState } from "react";

const SignupForm = () => {
  const [form, setForm] = useState({ username: "", password: "" });
  const [error, setError] = useState({});

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  function validateForm() {
    let errors = {};

    if (form.username.length < 3) {
      errors.username = "Username must be at least 3 characters long";
    }

    if (form.password.length < 8) {
      errors.password = "Password must be at least 8 characters long";
    }

    return errors;
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    setError(errors);
    if (Object.keys(errors).length > 0) {
      return;
    }
    console.log(form);
  };
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="">Username</label>
      <input type="text" name="username" onChange={handleChange} />
      <p>{error?.username}</p>
      <label htmlFor="">Password</label>
      <input type="text" name="password" onChange={handleChange} />
      <p>{error?.password}</p>
      <button type="submit">Submit</button>
    </form>
  );
};

export default SignupForm;
