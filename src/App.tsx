import React, { FormEvent, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import InputFeild from "./components/InputFeild";
import { TodoList } from "./components/TodoList";

interface Todo {
  id: number;
  isDone: boolean;
  todo: string;
}

const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [completedTask, setCompletedTask] = useState<Todo[]>([]);
  console.log(completedTask, "completedTask");
  console.log(todos, "todos");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos((prev) => [...prev, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      <span className="heading">Taskify</span>

      <InputFeild todo={todo} setTodo={setTodo} handleSubmit={handleSubmit} />

      <TodoList
        todos={todos}
        setTodos={setTodos}
        setCompletedTask={setCompletedTask}
        completedTask={completedTask}
      />
    </div>
  );
};

export default App;
