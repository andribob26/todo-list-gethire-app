import React from "react";
import { BsExclamationTriangle } from "react-icons/bs";
import { Button } from "../Button";

interface IDeleteModalProps {
  title: string;
  isLoading: boolean;
  onDeleteHandler: () => void;
}
export const DeleteModal: React.FC<IDeleteModalProps> = (props) => {
  return (
    <div
      data-te-modal-init
      className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="deleteModal"
      tabIndex={-1}
      aria-labelledby="deleteModalLabel"
      aria-hidden="true"
    >
      <div
        data-cy="modal-delete"
        data-te-modal-dialog-ref
        className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[576px]:max-w-[500px]"
      >
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-lg border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600">
          <div
            className="relative flex-auto text-center  p-4"
            data-te-modal-body-ref
          >
            <div
              data-cy="modal-delete-icon"
              className="flex justify-center items-center h-36"
            >
              <BsExclamationTriangle className="text-very-high" size={54} />
            </div>
            <p data-cy="modal-delete-title" className="text-[18px]">
              Apakah anda yakin menghapus activity{" "}
              <span className="font-bold">"{props.title}"</span>?
            </p>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-center gap-4 rounded-b-md p-4 ">
            <Button
              dataCy="modal-delete-cancel-button"
              modalDismiss={true}
              bgColor="bg-light"
              color="text-black"
              title="Batal"
            />
            <Button
              onClick={props.onDeleteHandler}
              dataCy="modal-delete-confirm-button"
              bgColor="bg-very-high"
              title="Hapus"
              isLoading={props.isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
