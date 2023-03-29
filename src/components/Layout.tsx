import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";

export const Layout: React.FC = () => {
  return (
    <>
      <Header />
      <main className="px-[20px] lg:px-[220px] py-[43px]">
        <Outlet />
      </main>
    </>
  );
};
