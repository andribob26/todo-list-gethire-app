import React from "react";

export const Loading: React.FC = () => {
  return (
    <div className="flex h-[60vh] justify-center items-center">
      <div
        className="text-primary inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
        role="status"
      ></div>
    </div>
  );
};

