import axios from "axios";
import { useForm } from "react-hook-form";

const Register = () => {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    try {
      await axios.post("/api/auth/register", data);
      alert("Registration successful!");
    } catch (error) {
      alert("Registration failed!");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register("username")} placeholder="Username" />
      <input {...register("password")} placeholder="Password" type="password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;