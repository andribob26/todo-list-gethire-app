import React, { useEffect, useState } from "react";
import moment from "moment";
import { saveIdToDelete } from "../../features/activity/activitySlice";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { TbTrash } from "react-icons/tb";

interface IActivityItemProps {
  id: number;
  title: string;
  createdAt: string;
}

export const ActivityItem: React.FC<IActivityItemProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const onClickHandler = () => {
    navigate(`/detail-activity/${props.id}`, {
      state: {
        id: props.id,
        title: props.title,
      },
    });
  };
  return (
    <>
      <div
        data-cy="activity-item"
        className="flex flex-col bg-white h-[150px] lg:h-[234px] shadow-lg rounded-[12px]"
      >
        <div
          onClick={onClickHandler}
          className="cursor-pointer h-full px-6 pt-6"
        >
          <p
            data-cy="activity-item-title"
            className="text-[14px] lg:text-[18px] font-bold"
          >
            {props.title}
          </p>
        </div>
        <div className="flex justify-between items-center text-black100 px-6 pb-6">
          <p
            data-cy="activity-item-date"
            className="text-[10px] lg:text-[14px]"
          >
            {moment(props.createdAt).format("D MMMM YYYY")}
          </p>
          <button
            data-cy="activity-item-delete-button"
            onClick={() => {
              dispatch(saveIdToDelete({ id: props.id, title: props.title }));
            }}
            className="z-50"
            type="button"
            data-te-toggle="modal"
            data-te-target="#deleteModal"
          >
            <TbTrash size={22} />
          </button>
        </div>
      </div>
    </>
  );
};
