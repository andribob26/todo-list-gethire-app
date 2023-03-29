import React from "react";
import { BsExclamationCircle } from "react-icons/bs";

export const AlertActivity: React.FC = () => {
  return (
    <div
      data-te-modal-init
      className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="alertActivity"
      tabIndex={-1}
      aria-labelledby="alertActivityLabel"
      aria-hidden="true"
    >
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
      >
        <div
          data-cy="modal-information"
          className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-lg border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600"
        >
          <div
            className="relative flex-auto text-center  p-4"
            data-te-modal-body-ref
          >
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
