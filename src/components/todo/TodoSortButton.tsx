import React, { useState } from "react";
import {
  TbArrowsSort,
  TbSortAscending,
  TbSortAscendingLetters,
  TbSortDescending,
  TbSortDescendingLetters,
} from "react-icons/tb";
import { sortTodo } from "../../features/todo/todoSlice";
import { useAppDispatch } from "../../app/hooks";
import { MdOutlineDone } from "react-icons/md";
interface ISortItem {
  title: string;
  icon: React.ReactNode;
}

const listSortItems: ISortItem[] = [
  {
    title: "Terbaru",
    icon: <TbSortDescending size={18} className="text-primary" />,
  },
  {
    title: "Terlama",
    icon: <TbSortAscending size={18} className="text-primary" />,
  },
  {
    title: "A-Z",
    icon: <TbSortAscendingLetters size={18} className="text-primary" />,
  },
  {
    title: "Z-A",
    icon: <TbSortDescendingLetters size={18} className="text-primary" />,
  },
  {
    title: "Belum Selesai",
    icon: <TbArrowsSort size={18} className="text-primary" />,
  },
];
export const TodoSortButton: React.FC = () => {
  const [valSort, setValSort] = useState<string>("Terbaru");
  const dispatch = useAppDispatch();
  const sortHandler = (type: string) => {
    dispatch(sortTodo({ type: type }));
  };
  return (
    <>
      <button
        data-cy="todo-sort-button"
        type="button"
        id="dropDownSort"
        data-te-dropdown-toggle-ref
        aria-expanded="false"
        data-te-ripple-init
        data-te-ripple-color="light"
        className={` text-black100 bg-transparent border-gray-300 border h-[37px] w-[37px] lg:h-[54px] lg:w-[54px] px-2 lg:px-4 rounded-full flex justify-center items-center`}
      >
        <TbArrowsSort size={24} />
      </button>
      <ul
        className="absolute z-[1000] border divide-y float-left m-0 hidden w-52 list-none overflow-hidden rounded border-solid bg-white bg-clip-padding text-left text-base shadow-lg dark:bg-neutral-700 [&[data-te-dropdown-show]]:block"
        aria-labelledby="dropDownSort"
        data-te-dropdown-menu-ref
      >
        {listSortItems.map((item, i) => {
          return (
            <li key={i}>
              <button
                onClick={() => {
                  setValSort(item.title);
                  sortHandler(item.title);
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
