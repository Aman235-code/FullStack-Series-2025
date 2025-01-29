import { Todo } from "../models/todo.js";

export const createTodo = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) {
      return res.status(403).json({
        success: false,
        message: "All fields are required",
      });
    }
    const todo = await Todo({ title, description });
    todo.save();
    return res.status(201).json({
      success: true,
      message: "Todo Created",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getAllTodos = async (req, res) => {
  try {
    const todos = await Todo.find();
    return res.status(200).json({
      success: true,
      todos: todos.length === 0 ? [] : todos,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    // const todo = await Todo.findById({todoId});
    const { title } = req.body;
    const todo = await Todo.findByIdAndUpdate(todoId, { title }, { new: true });
    console.log(todo);
    await todo.save();
    console.log(todo);
    return res.status(200).json({
      success: true,
      message: "Todo Updated",
      todo,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTodo = async (req, res) => {
  try {
    const todoId = req.params.todoId;
    await Todo.findByIdAndDelete(todoId);
    return res.status(200).json({
      success: true,
      message: "Todo Deleted Successfully",
    });
  } catch (error) {
    console.log(error);
  }
};
