import React, { useEffect, useRef, useState } from "react";
import { FaCircle } from "react-icons/fa";
import { MdOutlineDone } from "react-icons/md";
import { listPiority } from "../../constans/listPiority";
import { IPriority } from "../../interfaces/IPriority";
import { Button } from "../Button";

interface IEditModalProps {
  id: number | null;
  title: string;
  priority: string;
  onEditHandler: (title: string, priority: string) => void;
}

export const EditModal: React.FC<IEditModalProps> = (props) => {
  const [valPriority, setValPriority] = useState<IPriority | null>(null);
  const refEditModal = useRef<HTMLDivElement | null>(null);
  const [valItemName, setValItemName] = useState<string>("");
  const [isDesabled, setIsDesabled] = useState<boolean>(true);
  const modalEditEl = document.querySelector("#editModal");
  const dropDownPiorityEl = document.querySelector("#dropDownEPiority");

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!(e.target.value.trim().length < 0)) {
      setValItemName(e.target.value);
    } else {
      setIsDesabled(true);
    }
  };

  const closeModalEditHandler = (e: React.MouseEvent) => {
    console.log("ok");

    if (
      refEditModal.current &&
      !refEditModal.current.contains(e.target as Node)
    ) {
      modalEditEl?.setAttribute("style", "display: none");
    }
  };

  const editHandler = () => {
    if (valPriority) {
      props.onEditHandler(valItemName, valPriority.priority);
    }
  };

  useEffect(() => {
    if (!(valItemName.trim().length === 0) && valPriority) {
      setIsDesabled(false);
    } else {
      setIsDesabled(true);
    }
  }, [valItemName, valPriority]);

  useEffect(() => {
    setValItemName(props.title);
    setValPriority((valPriority) => {
      return {
        ...valPriority,
        priority: props.priority,
        color: `text-${props.priority}`,
      };
    });
  }, [props]);

  return (
    <div
      style={{ display: "none" }}
      onClick={closeModalEditHandler}
      className="fixed top-0 left-0 z-[1055] bg-black bg-opacity-30 h-full w-full overflow-y-auto overflow-x-hidden outline-none"
      id="editModal"
    >
      <div
        ref={refEditModal}
        className="pointer-events-none relative flex min-h-[calc(100%-1rem)] w-auto translate-y-[-50px] items-center opacity-1 transition-all duration-300 ease-in-out min-[576px]:mx-auto min-[576px]:mt-7 min-[576px]:min-h-[calc(100%-3.5rem)] min-[992px]:max-w-[800px]"
      >
        <div className="min-[576px]:shadow-[0_0.5rem_1rem_rgba(#000, 0.15)] pointer-events-auto relative flex w-full flex-col rounded-md border-none bg-white bg-clip-padding text-current shadow-lg outline-none dark:bg-neutral-600 px-4">
          <div className="flex flex-shrink-0 items-center justify-between rounded-t-md border-b-2 border-neutral-100 border-opacity-100 p-4 dark:border-opacity-50">
            <h5
              className="text-[18px] font-semibold leading-normal text-neutral-800 dark:text-neutral-200"
              id="editModalLabel"
            >
              Edit List Item
            </h5>
            <button
              onClick={() => {
                modalEditEl?.setAttribute("style", "display: none");
              }}
              type="button"
              className="box-content rounded-none border-none hover:no-underline hover:opacity-75 focus:opacity-100 focus:shadow-none focus:outline-none"
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
          <div className="relative flex gap-8 flex-col flex-auto p-4">
            <div>
              <label
                htmlFor="nameListItem"
                className="block text-[12px] font-semibold mb-2"
              >
                NAMA LIST ITEM
              </label>
              <input
                onChange={onChangeHandler}
                value={valItemName}
                type="text"
                className="block min-h-[auto] w-full rounded border border-gray-300 bg-transparent py-4 px-4 outline-primary transition-all duration-200 ease-linear focus:placeholder:opacity-100"
                id="nameListItem"
                placeholder="Tambahkan nama list item"
              />
            </div>

            <div className="flex justify-start">
              <div className="w-full">
                <div className="relative" data-te-dropdown-ref>
                  <button
                    onClick={() => {
                      dropDownPiorityEl?.setAttribute(
                        "style",
                        "display: block"
                      );
                    }}
                    className="flex items-center min-h-[auto] w-full lg:w-52 rounded border border-gray-300 bg-transparent py-4 px-4 transition-all duration-200 ease-linear"
                    type="button"
                    data-te-ripple-init
                    data-te-ripple-color="light"
                  >
                    <div className="flex gap-4 items-center">
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
                    style={{ display: "none" }}
                    id="dropDownEPiority"
                    className="absolute divide-y border-solid border z-[1000] float-left m-0 hidden w-full lg:w-52 list-none overflow-hidden rounded bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
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
                              dropDownPiorityEl?.setAttribute(
                                "style",
                                "display: none"
                              );
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
              dataCy="ok"
              title="Simpan"
              onClick={editHandler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
