import { Button } from "@/components/ui/button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Navbar = () => {
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      const res = await axios.get("http://localhost:8000/api/v1/user/logout");
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="bg-gray-600">
      <div className="flex items-center justify-between p-2">
        <h1 className="font-bold text-lg">{"Aman Ahamed"}</h1>
        <Button onClick={logoutHandler}>Logout</Button>
      </div>
    </div>
  );
};

export default Navbar;
