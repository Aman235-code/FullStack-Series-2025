import { useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const Home = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");

  const addTodoHandler = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8000/api/v1/todo/create",
        { title: title, description: desc },
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <div>
      <Navbar />
      <div className="flex items-center gap-5 mt-5">
        <Input
          value={title}
          onChange={(e) => settitle(e.target.value)}
          type="text"
          placeholder="Add a new todo"
          className="w-1/4"
        />

        <Button onClick={addTodoHandler}>Add Todo </Button>
      </div>
      <Textarea
        value={desc}
        onChange={(e) => setdesc(e.target.value)}
        placeholder="write a description"
        className="w-1/4 mt-2"
      />
    </div>
  );
};

export default Home;
