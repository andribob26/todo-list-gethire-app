import React, { useEffect, useLayoutEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { ActivityEmpty } from "../components/activity/ActivityEmpty";
import { ActivityList } from "../components/activity/ActivityList";
import { Button } from "../components/Button";
import { getAllActivity } from "../features/activity/getAllActivity";
import {
  selectDataActivity,
  selectDataDeleteActivity,
  resetDataActivity,
  selectDataCreateActivity,
} from "../features/activity/activitySlice";
import { MdAdd } from "react-icons/md";
import { DeleteModal } from "../components/modals/DeleteModal";
import { deleteActivity } from "../features/activity/deleteActivity";
import { AlertActivity } from "../components/modals/AlertActivity";
import { typeActivity } from "../constans/typeActivity";
import { createActivity } from "../features/activity/createActivity";
import { Loading } from "../components/Loading";

export const DasboardPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const dataActivity = useAppSelector(selectDataActivity);
  const dataDeleteActivity = useAppSelector(selectDataDeleteActivity);
  const dataCreateActivity = useAppSelector(selectDataCreateActivity);
  const createActivityHandler = () => {
    dispatch(createActivity());
  };

  useLayoutEffect(() => {
    dispatch(getAllActivity());
  }, []);

  let activityEl: React.ReactNode;
  if (dataActivity.data.length < 1) {
    activityEl = <ActivityEmpty />;
  } else {
    activityEl = <ActivityList />;
  }

  useEffect(() => {
    if (dataDeleteActivity.status === "Success") {
      const modalDeleteEl = (window as any).te.Modal.getOrCreateInstance(
        document.querySelector("#deleteModal")
      );
      const alertActivityEl = (window as any).te.Modal.getOrCreateInstance(
        document.querySelector("#alertActivity")
      );
      modalDeleteEl.hide();
      dispatch(getAllActivity());
      dispatch(resetDataActivity({ type: typeActivity.delete }));
      alertActivityEl.show();

      setTimeout(() => {
        alertActivityEl.hide();
      }, 2000);
    }
  }, [dataDeleteActivity]);

  useEffect(() => {
    if (dataCreateActivity.status === "Success") {
      dispatch(getAllActivity());
      dispatch(resetDataActivity({ type: typeActivity.create }));
    }
  }, [dataCreateActivity]);

  return (
    <>
      <div className="flex justify-between items-center">
        <h1
          data-cy="activity-title"
          className="text-[16px] lg:text-[36px] font-bold"
        >
          Activity
        </h1>
        <Button
          dataCy="activity-add-button"
          bgColor="bg-primary"
          icon={<MdAdd size={24} />}
          title="Tambah"
          onClick={createActivityHandler}
        />
      </div>

      {dataActivity.isLoading ? <Loading /> : activityEl}
      <DeleteModal
        title={dataDeleteActivity.title}
        isLoading={dataDeleteActivity.isLoading}
        onDeleteHandler={() => {
          if (dataDeleteActivity.id) {
            dispatch(deleteActivity(dataDeleteActivity.id));
          }
        }}
      />
      <AlertActivity />
    </>
  );
};
