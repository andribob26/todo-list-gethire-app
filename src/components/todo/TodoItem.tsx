import React from "react";
import { FaCircle } from "react-icons/fa";
import { TbPencil, TbTrash } from "react-icons/tb";
import { useAppDispatch } from "../../app/hooks";
import { typeTodo } from "../../constans/typeTodo";
import { saveDataToState } from "../../features/todo/todoSlice";

interface ITodoItemProps {
  id: number;
  title: string;
  priority: string;
  isActive: boolean;
  onCheckedHandler: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const TodoItem: React.FC<ITodoItemProps> = (props) => {
  const dispatch = useAppDispatch();

  const showModal = () => {
    dispatch(
      saveDataToState({
        id: props.id,
        title: props.title,
        priority: props.priority,
        type: typeTodo.update,
      })
    );
    const addModalEl = (window as any).te.Modal.getOrCreateInstance(
      document.querySelector("#editModal")
    );
    addModalEl.show();
  };
  return (
    <div data-cy="todo-item" className="bg-white shadow-lg rounded-[12px] p-7">
      <div className="flex justify-between items-center">
        <div className="flex gap-6 items-center">
          <input
            data-cy="todo-item-checkbox"
            onChange={props.onCheckedHandler}
            type="checkbox"
            defaultChecked={props.isActive}
            className="h-5 w-5 border-gray-300 text-primary bg-white focus:ring-0"
          />
          <FaCircle
            data-cy="todo-item-priority-indicator"
            className={`text-${props.priority}`}
            size={12}
          />
          <p
            data-cy="todo-item-title"
            className={`${
              props.isActive && "line-through text-black100"
            } text-[18px] font-medium`}
          >
            {props.title}
          </p>
          <TbPencil
            data-cy="todo-item-edit-button"
            onClick={showModal}
            className="text-black100 cursor-pointer"
            size={18}
          />
        </div>
        <button
          data-cy="todo-item-delete-button"
          onClick={() => {
            dispatch(
              saveDataToState({
                id: props.id,
                title: props.title,
                type: typeTodo.delete,
              })
            );
          }}
          className="z-50 text-black100"
          type="button"
          data-te-toggle="modal"
          data-te-target="#deleteModal"
        >
          <TbTrash size={22} />
        </button>
      </div>
    </div>
  );
};
