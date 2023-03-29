import React from "react";

export const TodoEmpty: React.FC = () => {
  return (
    <div className="flex justify-center my-12 h-[60vh]">
      <img
        data-cy="todo-empty-state"
        src="/images/todo-empty-state.png"
        style={{
          objectFit: "contain",
        }}
        alt="todo-empty-state.png"
      />
    </div>
  );
};
