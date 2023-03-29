import React, { ChangeEvent, useState } from "react";
import { selectDataTodo } from "../../features/todo/todoSlice";
import { updateTodo } from "../../features/todo/updateTodo";
import { useAppSelector, useAppDispatch } from "../../app/hooks";
import { TodoItem } from "./TodoItem";
import { ITodoItem } from "../../interfaces/ITodoItem";

export const TodoList: React.FC = () => {
  const dispatch = useAppDispatch();
  const dataTodo = useAppSelector(selectDataTodo);

  const checkedHandler = (id: number, is_active: boolean) => {
    dispatch(updateTodo({ id: id, is_active: !is_active }));
  };


  return (
    <div className="flex flex-col mt-12 gap-4">
      {dataTodo.data.map((item) => {
        return (
          <TodoItem
            key={item.id}
            id={item.id}
            title={item.title}
            priority={item.priority}
            isActive={!item.is_active}
            onCheckedHandler={(e) => {
              checkedHandler(item.id, e.target.checked);
            }}
          />
        );
      })}
    </div>
  );
};

