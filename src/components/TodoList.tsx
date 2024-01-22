import React from "react";
import "./style.css";

import PendingTodo from "./PendingTodo";
import CompletedTodo from "./CompletedTodo";
interface Props {
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
export const TodoList: React.FC<Props> = ({
  todos,
  setTodos,
  completedTask,
  setCompletedTask,
}) => {
  const todosLength: number = todos.length;
  const completedLength: number = completedTask.length;

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6">
          <h4 className="todo-list-heading">Pending Task ({todosLength})</h4>
          {todos?.map((data) => (
            <PendingTodo
              key={data.id}
              data={data}
              todos={todos}
              setTodos={setTodos}
              setCompletedTask={setCompletedTask}
              completedTask={completedTask}
            />
          ))}
        </div>
        <div className="col-md-6">
          <h4 className="todo-list-heading">
            Completed Task ({completedLength})
          </h4>
          {completedTask?.map((data) => (
            <CompletedTodo
              key={data.id}
              data={data}
              todos={todos}
              setTodos={setTodos}
              setCompletedTask={setCompletedTask}
              completedTask={completedTask}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
