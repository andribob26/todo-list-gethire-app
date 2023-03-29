import React, { useEffect, useState, useRef, useLayoutEffect } from "react";
import {
  TbArrowsSort,
  TbPencil,
  TbPlus,
  TbSortAscendingLetters,
} from "react-icons/tb";
import { FaChevronLeft } from "react-icons/fa";
import { Button } from "../components/Button";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AddModal } from "./../components/modals/AddModal";
import { updateActivity } from "../features/activity/updateActivity";
import { IData } from "./../interfaces/IData";
import { createTodo } from "../features/todo/createTodo";
import { getAllTodo } from "../features/todo/getAllTodo";
import {
  resetDataTodo,
  selectDataCreateTodo,
  selectDataTodo,
  selectDataUpdateTodo,
  selectDataDeleteTodo,
} from "../features/todo/todoSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { TodoEmpty } from "../components/todo/TodoEmpty";
import { Loading } from "../components/Loading";
import { TodoList } from "../components/todo/TodoList";
import { typeTodo } from "../constans/typeTodo";
import { TodoSortButton } from "../components/todo/TodoSortButton";
import { EditModal } from "../components/modals/EditModal";
import { updateTodo } from "../features/todo/updateTodo";
import { DeleteModal } from "../components/modals/DeleteModal";
import { deleteTodo } from "../features/todo/deleteTodo";
import { AlertActivity } from "../components/modals/AlertActivity";

export const DetailPage: React.FC = () => {
  const modalDeleteEl = document.querySelector("#deleteModal");
  const modalAddEl = document.querySelector("#addModal");
  const modalEditEl = document.querySelector("#editModal");
  const alertActivityEl = document.querySelector("#alertActivity");
  const refEditTitle = useRef<HTMLInputElement>(null);
  const refHEditTitle = useRef<HTMLHeadingElement>(null);
  const [isEditTitle, setIsEditTitle] = useState<boolean>(false);
  const [count, setCount] = useState(0);
  const [valueInputTitle, setValueInputTitle] = useState<string>("");
  const location: {
    state: IData;
  } = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const dataCreateTodo = useAppSelector(selectDataCreateTodo);
  const dataTodo = useAppSelector(selectDataTodo);
  const dataUpdateTodo = useAppSelector(selectDataUpdateTodo);
  const dataDeleteTodo = useAppSelector(selectDataDeleteTodo);

  const editTitleHandler = () => {
    setIsEditTitle(true);
  };

  const addTodoHandler = (title: string, priority: string) => {
    dispatch(
      createTodo({
        activity_group_id: location.state.id,
        priority: priority,
        title: title,
      })
    );
  };

  const editHandler = (title: string, priority: string) => {
    if (dataUpdateTodo.singleData.id) {
      dispatch(
        updateTodo({
          id: dataUpdateTodo.singleData.id,
          title: title,
          priority: priority,
        })
      );
    }
  };

  const updateActivityHandler = (id: number, title: string) => {
    dispatch(updateActivity({ id: id, title: title }));
  };

  const clickOutSideHandler = (e: MouseEvent) => {
    if (
      refEditTitle.current &&
      !refEditTitle.current.contains(e.target as Node)
    ) {
      setCount((count) => count + 1);
      if (count > 0) {
        updateActivityHandler(location.state.id, valueInputTitle);
        setIsEditTitle((isEditTitle) => {
          setCount(0);
          return !isEditTitle;
        });
      }
    }
  };

  const showModalAdd = () => {
    modalAddEl?.setAttribute("style", "display: block");
  };

  const onChangeEditHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValueInputTitle(e.target.value);
  };

  useLayoutEffect(() => {
    dispatch(getAllTodo(location.state.id));
  }, []);

  let todoEl: React.ReactNode;
  if (dataTodo.data.length < 1) {
    todoEl = <TodoEmpty />;
  } else {
    todoEl = <TodoList />;
  }

  useEffect(() => {
    if (!location.state.title) {
      navigate("/", { replace: true });
    } else {
      setValueInputTitle(location.state.title);
    }
  }, []);

  useEffect(() => {
    document.addEventListener("click", clickOutSideHandler, false);
    return () => {
      document.removeEventListener("click", clickOutSideHandler, false);
    };
  }, [count, valueInputTitle]);

  useEffect(() => {
    if (dataCreateTodo.status === "Success") {
      modalAddEl?.setAttribute("style", "display: none");
      dispatch(getAllTodo(location.state.id));
      dispatch(resetDataTodo({ type: typeTodo.create }));
    }
  }, [dataCreateTodo]);

  useEffect(() => {
    if (dataUpdateTodo.status === "Success") {
      modalEditEl?.setAttribute("style", "display: none");
      dispatch(getAllTodo(location.state.id));
      dispatch(resetDataTodo({ type: typeTodo.update }));
    }
  }, [dataUpdateTodo]);

  useEffect(() => {
    if (dataDeleteTodo.status === "Success") {
      modalDeleteEl?.setAttribute("style", "display: none");
      dispatch(getAllTodo(location.state.id));
      dispatch(resetDataTodo({ type: typeTodo.delete }));
      alertActivityEl?.setAttribute("style", "display: block");

      setTimeout(() => {
        alertActivityEl?.setAttribute("style", "display: none");
      }, 2000);
    }
  }, [dataDeleteTodo]);

  return (
    <>
      <div className="flex flex-col lg:flex-row justify-between lg:items-center">
        <div className="flex items-center gap-6 text-[16px] lg:text-[36px] font-bold">
          <Link data-cy="todo-back-button" to={"/"}>
            <FaChevronLeft size={28} />
          </Link>
          {isEditTitle ? (
            <input
              ref={refEditTitle}
              style={{
                borderWidth: 0,
                borderBottomWidth: 1,
              }}
              className="form-input text-[16px] lg:text-[36px] p-0 block min-h-[auto] w-full bg-transparent outline-none focus:outline-none focus:ring-0 focus:border-black "
              type="text"
              defaultValue={valueInputTitle}
              onChange={onChangeEditHandler}
            />
          ) : (
            <h1
              ref={refHEditTitle}
              data-cy="todo-title"
              onClick={editTitleHandler}
              className="cursor-pointer"
            >
              {valueInputTitle}
            </h1>
          )}
          <button data-cy="todo-title-edit-button" onClick={editTitleHandler}>
            <TbPencil className="text-black100" size={24} />
          </button>
        </div>
        <div className="flex items-center gap-4 ml-auto lg:ml-0 mt-8 lg:mt-0">
          <TodoSortButton />
          <Button
            dataCy="todo-add-button"
            bgColor="bg-primary"
            icon={<TbPlus size={24} />}
            title="Tambah"
            onClick={showModalAdd}
          />
        </div>
      </div>
      {dataTodo.isLoading ? <Loading /> : todoEl}

      <AddModal onAddHandler={addTodoHandler} />
      <EditModal
        onEditHandler={editHandler}
        id={dataUpdateTodo.singleData.id}
        title={dataUpdateTodo.singleData.title}
        priority={dataUpdateTodo.singleData.priority!}
      />
      <DeleteModal
        title={dataDeleteTodo.singleData.title}
        isLoading={dataDeleteTodo.isLoading}
        onDeleteHandler={() => {
          if (dataDeleteTodo.singleData.id) {
            dispatch(deleteTodo(dataDeleteTodo.singleData.id));
          }
        }}
      />
      <AlertActivity />
    </>
  );
};
