import React from "react";

export const Header: React.FC = () => {
  return (
    <header
      data-cy="header-background"
      className="h-[64px] lg:h-[105px] w-full bg-primary flex items-center px-[20px] lg:px-[220px] pt-[38px] pb-[31px]"
    >
      <p
        data-cy="header-title"
        className="text-white text-[18px]  lg:text-[24px] font-bold"
      >
        TO DO LIST APP
      </p>
    </header>
  );
};
