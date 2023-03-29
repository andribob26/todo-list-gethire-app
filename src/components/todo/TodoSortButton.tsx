import React, { useState, useRef, useEffect } from "react";
import {
  TbArrowsSort,
  TbSortAscending,
  TbSortAscendingLetters,
  TbSortDescending,
  TbSortDescendingLetters,
} from "react-icons/tb";
import {
  selectDataDeleteTodo,
  selectDataUpdateTodo,
  sortTodo,
} from "../../features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { MdOutlineDone } from "react-icons/md";
import { selectDataCreateTodo } from "./../../features/todo/todoSlice";
interface ISortItem {
  title: string;
  icon: React.ReactNode;
  value: string;
}

const listSortItems: ISortItem[] = [
  {
    title: "Terbaru",
    icon: <TbSortDescending size={18} className="text-primary" />,
    value: "sort-latest",
  },
  {
    title: "Terlama",
    icon: <TbSortAscending size={18} className="text-primary" />,
    value: "sort-oldest",
  },
  {
    title: "A-Z",
    icon: <TbSortAscendingLetters size={18} className="text-primary" />,
    value: "sort-az",
  },
  {
    title: "Z-A",
    icon: <TbSortDescendingLetters size={18} className="text-primary" />,
    value: "sort-za",
  },
  {
    title: "Belum Selesai",
    icon: <TbArrowsSort size={18} className="text-primary" />,
    value: "sort-unfinished",
  },
];
export const TodoSortButton: React.FC = () => {
  const [valSort, setValSort] = useState<string>("Terbaru");
  const dropDownSortEl = document.querySelector("#dropDownSort");
  const dataCreteTodo = useAppSelector(selectDataCreateTodo);
  const dataUpdateTodo = useAppSelector(selectDataUpdateTodo);
  const dataDeleteTodo = useAppSelector(selectDataDeleteTodo);
  const dispatch = useAppDispatch();
  const sortHandler = (type: string) => {
    dispatch(sortTodo({ type: type }));
  };

  useEffect(() => {
    if (
      dataCreteTodo.status === "Success" ||
      dataUpdateTodo.status === "Success" ||
      dataDeleteTodo.status === "Success"
    ) {
      setTimeout(() => {
        dispatch(sortTodo({ type: valSort }));
      }, 50);
    }
  }, [dataCreteTodo, dataUpdateTodo, dataDeleteTodo]);

  return (
    <>
      <button
        onClick={() => {
          dropDownSortEl?.setAttribute("style", "display: block");
        }}
        data-cy="todo-sort-button"
        type="button"
        data-te-ripple-init
        data-te-ripple-color="light"
        className={` text-black100 bg-transparent border-gray-300 border h-[37px] w-[37px] lg:h-[54px] lg:w-[54px] px-2 lg:px-4 rounded-full flex justify-center items-center`}
      >
        <TbArrowsSort size={24} />
      </button>
      <ul
        style={{ display: "none" }}
        id="dropDownSort"
        data-cy="sort-parent"
        className="absolute z-[1000] translate-y-36 border divide-y float-left m-0 hidden w-52 list-none overflow-hidden rounded border-solid bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
      >
        {listSortItems.map((item, i) => {
          return (
            <li key={i}>
              <button
                data-cy="sort-selection"
                onClick={() => {
                  setValSort(item.title);
                  sortHandler(item.title);
                  dropDownSortEl?.setAttribute("style", "display: none");
                }}
                className="flex items-center justify-between w-full whitespace-nowrap bg-transparent py-3 px-4 text-sm font-normal text-neutral-700 hover:bg-neutral-100 active:text-neutral-800 active:no-underline disabled:pointer-events-none disabled:bg-transparent disabled:text-neutral-400 dark:text-neutral-200 dark:hover:bg-neutral-600"
                data-te-dropdown-item-ref
              >
                <div className="flex items-center gap-4">
                  {item.icon}
                  <p className="capitalize">{item.title}</p>
                </div>
                {valSort === item.title && <MdOutlineDone />}
              </button>
            </li>
          );
        })}
      </ul>
    </>
  );
};
