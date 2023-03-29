import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

export const AlertActivity: React.FC = () => {
  const alertActivityEl = document.querySelector("#alertActivity");
  return (
    <div
      onClick={() => {
        alertActivityEl?.setAttribute("style", "display: none");
      }}
      style={{ display: "none" }}
      className="fixed top-0 left-0 z-[1055] bg-black bg-opacity-30 h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="alertActivity"
    >
      <div
        data-cy="modal-information"
        className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-1 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
      >
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-lg border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div className="relative flex-auto text-center  p-4">
            <div className="flex justify-start items-center gap-2 px-5">
              <BsExclamationCircle
                data-cy="modal-information-icon"
                className="text-medium"
                size={24}
              />
              <p
                data-cy="modal-information-title"
                className="text-[14px] font-medium"
              >
                Activity berhasil dihapus
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
