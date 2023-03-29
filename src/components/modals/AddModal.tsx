import React, { useEffect, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { listPiority } from "../../constans/listPiority";
import { IPriority } from "../../interfaces/IPriority";
import { Button } from "../Button";

interface IAddModalProps {
  onAddHandler: (title: string, priority: string) => void;
}

export const AddModal: React.FC<IAddModalProps> = (props) => {
  const [valPriority, setValPriority] = useState<IPriority | null>(null);
  const [valItemName, setValItemName] = useState<string>("");
  const [isDesabled, setIsDesabled] = useState<boolean>(true);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.value.trim().length === 0)) {
      setValItemName(e.target.value);
    } else {
      setIsDesabled(true);
    }
  };

  const addHandler = () => {
    if (valPriority) {
      props.onAddHandler(valItemName, valPriority.priority);
    }
  };

  useEffect(() => {
    if (!(valItemName.trim().length === 0) && valPriority) {
      setIsDesabled(false);
    } else {
      setIsDesabled(true);
    }
  }, [valItemName, valPriority]);

  return (
    <div
      data-te-modal-init
      className="fixed top-0 left-0 z-[1055] hidden h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="addModal"
      tabIndex={-1}
      aria-labelledby="addModalLabel"
      aria-hidden="true"
    >
      <div
        data-te-modal-dialog-ref
        className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-0 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[992px]:max-w-[800px]"
      >
        <div
          data-cy="modal-add"
          className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 px-4"
        >
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <h5
              data-cy="modal-add-title"
              className="text-[18px] font-semibold leading-normal text-neutral-800 dark:text-neutral-200"
              id="addModalLabel"
            >
              Tambah List Item
            </h5>
            <button
              data-cy="modal-add-close-button"
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
              data-te-modal-dismiss
              aria-label="Close"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
          <div
            className="relative flex gap-8 flex-col flex-auto p-4"
            data-te-modal-body-ref
          >
            <div>
              <label
                data-cy="modal-add-name-title"
                htmlFor="nameListItem"
                className="block text-[12px] font-semibold mb-2"
              >
                NAMA LIST ITEM
              </label>
              <input
                data-cy="modal-add-name-input"
                onChange={onChangeHandler}
                type="text"
                value={valItemName}
                className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent py-4 px-4 outline-primary transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                id="nameListItem"
                placeholder="Tambahkan nama list item"
              />
            </div>

            <div className="flex flex-col justify-start">
              <label
                data-cy="modal-add-priority-title"
                htmlFor="nameListItem"
                className="block text-[12px] font-semibold mb-2"
              >
                PRIORITY
              </label>
              <div className="w-full">
                <div className="relative" data-te-dropdown-ref>
                  <button
                    data-cy="modal-add-priority-dropdown"
                    className="flex items-center min-h-[auto] w-full lg:w-52 rounded border border-gray-300 bg-transparent py-4 px-4 transition-all duration-200 ease-linear"
                    type="button"
                    id="dropDownPiority"
                    data-te-dropdown-toggle-ref
                    aria-expanded="false"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <div
                      data-cy="modal-add-priority-item"
                      className="flex gap-4 items-center"
                    >
                      {!valPriority ? (
                        <p>Pilih Piority</p>
                      ) : (
                        <>
                          <FaCircle className={`${valPriority.color}`} />
                          <p className="capitalize">{valPriority.priority}</p>
                        </>
                      )}
                    </div>
                    <span className="ml-auto w-5">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        className="h-5 w-5"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </span>
                  </button>
                  <ul
                    className="absolute divide-y border-solid border z-[1000] float-left m-0 hidden w-full lg:w-52 list-none overflow-hidden rounded bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
                    aria-labelledby="dropDownPiority"
                    data-te-dropdown-menu-ref
                  >
                    {listPiority.map((item, i) => {
                      return (
                        <li key={i}>
                          <button
                            data-cy={`modal-add-priority-${item.priority}`}
                            onClick={() => {
                              setValPriority({
                                color: item.color,
                                priority: item.priority,
                              });
                            }}
                            className="flex items-center justify-between w-full whitespace-nowrap bg-transparent py-3 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                            data-te-dropdown-item-ref
                          >
                            <div className="flex items-center gap-4">
                              <FaCircle className={`${item.color}`} />
                              <p className="capitalize">{item.priority}</p>
                            </div>
                            {valPriority?.priority === item.priority && (
                              <MdOutlineDone />
                            )}
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="flex flex-shrink-0 flex-wrap items-center justify-end rounded-b-md border-t-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <Button
              disabled={isDesabled}
              bgColor="bg-primary"
              dataCy="modal-add-save-button"
              title="Simpan"
              onClick={addHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
