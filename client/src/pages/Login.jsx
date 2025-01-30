import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [user, setuser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const changeHandler = (e) => {
    setuser({ ...user, [e.target.name]: e.target.value });
  };

  const loginHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/user/login",
        user,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
     
      if (res.data.success) {    
        toast.success(res.data.message);
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="">
      <Input
        value={user.email}
        name="email"
        onChange={changeHandler}
        type="text"
        placeholder="Enter Email"
      />
      <Input
        value={user.password}
        name="password"
        onChange={changeHandler}
        type="password"
        placeholder="Enter Password"
      />
      <Button onClick={loginHandler}>Login</Button>
    </div>
  );
};

export default Login;
