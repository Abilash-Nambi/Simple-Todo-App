import React, { useEffect, useRef, useState } from "react";
import "./style.css";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { MdDone } from "react-icons/md";

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

const CompletedTodo = ({
  data,
  todos,
  setTodos,
  completedTask,
  setCompletedTask,
}: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editedTodo, setEditedTodo] = useState<string>(data.todo);

  const handleClick = (id: number) => {
    completedTask.forEach((todo) => {
      if (todo.id === id) {
        setTodos((prev) => [...prev, todo]);
        return;
      }
    });
    setCompletedTask((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleDelete = (id: number) => {
    setCompletedTask((prev) => prev.filter((todo) => todo.id !== id)); // this will return the id only matches the condition both same id is not returned
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
      <s className="todos_single_text">{data.todo}</s>

      <div>
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

export default CompletedTodo;
