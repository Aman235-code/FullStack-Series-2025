import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

import Navbar from "./Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const Home = () => {
  const [title, settitle] = useState("");
  const [desc, setdesc] = useState("");
  const [todos, settodo] = useState([]);

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
        setdesc("");
        settitle("");
        settodo([...todos, res.data.todo]);
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  useEffect(() => {
    const fetchTodo = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8000/api/v1/todo/getTodos"
        );
        if (res.data.success) {
          settodo(res.data.todos);
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchTodo();
  }, []);
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

      <div className="grid grid-cols-5 gap-2">
        {todos.map((todo) => (
          <Card key={todo._id} className="bg-gray-800 text-white mt-5">
            <CardHeader>
              <CardTitle>
                <h1>{todo.title}</h1>
              </CardTitle>
            </CardHeader>
            <CardDescription>
              <p>{todo.description}</p>
            </CardDescription>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Home;
