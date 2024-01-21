import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";
import CompletedTodo from "./CompletedTodo";

interface TodoItem {
  id: number;
  todo: string;
  isDone: boolean;
}
interface Props {
  data: TodoItem;
  todos: Array<{
    id: number;
    todo: string;
    isDone: boolean;
  }>;
  setTodos: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: number;
        todo: string;
        isDone: boolean;
      }>
    >
  >;

  completedTask: Array<{
    id: number;
    todo: string;
    isDone: boolean;
  }>;

  setCompletedTask: React.Dispatch<
    React.SetStateAction<
      Array<{
        id: number;
        todo: string;
        isDone: boolean;
      }>
    >
  >;
}

const PendingTodo = ({
  data,
  todos,
  setTodos,
  completedTask,
  setCompletedTask,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<string>(data.todo);

  const handleClick = (id: number) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
    todos.forEach((todo) => {
      if (todo.id === id) {
        setCompletedTask((prev) => [...prev, todo]);
        return;
      }
    });
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleDelete = (id: number) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id)); // this will return the id only matches the condition both same id is not returned
  };

  const handleEdit = () => {
    if (!edit && !data.isDone) {
      setEdit(!edit);
    }
  };
  const handleSubmit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, todo: editedTodo } : todo
      )
    );
    setEdit(false);
  };

  const inputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  return (
    <form className="todos_single" onSubmit={(e) => handleSubmit(e, data.id)}>
      <div>
        {edit ? (
          <input
            ref={inputRef}
            value={editedTodo}
            onChange={(e) => setEditedTodo(e.target.value)}
            className="todos_single_text"
          />
        ) : data.isDone ? (
          <s className="todos_single_text">{data.todo}</s>
        ) : (
          <span className="todos_single_text">{data.todo}</span>
        )}
      </div>

      <div>
        <span className="todos_single_icon">
          <AiFillEdit onClick={handleEdit} />
        </span>
        <span
          className="todos_single_icon"
          onClick={() => {
            handleDelete(data.id);
          }}
        >
          <MdDelete />
        </span>
        <span
          className="todos_single_icon"
          onClick={() => {
            handleClick(data.id);
          }}
        >
          <MdDone />
        </span>
      </div>
    </form>
  );
};

export default PendingTodo;
