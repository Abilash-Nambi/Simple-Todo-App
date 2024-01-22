import React, { FormEvent, useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import InputFeild from "./components/InputFeild";
import { TodoList } from "./components/TodoList";
import { json } from "stream/consumers";
import { Triangle } from "react-loader-spinner";

interface Todo {
  id: number;
  isDone: boolean;
  todo: string;
}

const App = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const storedTodos = localStorage.getItem("todos");
    if (storedTodos) {
      return JSON.parse(storedTodos);
    }
    return [];
  });
  const [completedTask, setCompletedTask] = useState<Todo[]>(() => {
    const storedCompletedTodos = localStorage.getItem("completedTask");
    if (storedCompletedTodos) {
      return JSON.parse(storedCompletedTodos);
    }
    return [];
  });
  const [loader, setLoader] = useState(true);
  setTimeout(() => {
    setLoader(false);
  }, 3000);

  //console.log(completedTask, "completedTask");
  //console.log(todos, "todos");

  useEffect(() => {
    const storedTodos = localStorage.getItem("todos");
    const storedCompletedTodos = localStorage.getItem("completedTask");
    if (storedTodos) {
      setTodos(JSON.parse(storedTodos));
    }
    if (storedCompletedTodos) {
      setCompletedTask(JSON.parse(storedCompletedTodos));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("completedTask", JSON.stringify(completedTask));
  }, [todos, completedTask]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      setTodos((prev) => [...prev, { id: Date.now(), todo, isDone: false }]);
      setTodo("");
    }
  };

  return (
    <div className="App">
      {loader ? (
        <Triangle
          visible={true}
          height="600"
          width="80"
          color="#4fa94d"
          ariaLabel="triangle-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <>
          <span className="heading">Taskify</span>

          <InputFeild
            todo={todo}
            setTodo={setTodo}
            handleSubmit={handleSubmit}
          />

          <TodoList
            todos={todos}
            setTodos={setTodos}
            setCompletedTask={setCompletedTask}
            completedTask={completedTask}
          />
        </>
      )}
    </div>
  );
};

export default App;
