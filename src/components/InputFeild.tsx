import React, { useRef } from "react";
import "./style.css";
import Button from "./Button";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  handleSubmit: (e: React.FormEvent) => void;
}

const InputFeild = ({ todo, setTodo, handleSubmit }: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form
      className="todo_container"
      onSubmit={(e) => {
        handleSubmit(e);
        inputRef.current?.blur();
      }}
    >
      <input
        ref={inputRef}
        value={todo}
        placeholder="Enter the todo list..."
        onChange={(e) => setTodo(e.target.value)}
      />
      <Button type="submit"> GO</Button>
    </form>
  );
};

export default InputFeild;
