import React from "react";
import { ActivityItem } from "./ActivityItem";
import { selectDataActivity } from "../../features/activity/activitySlice";
import { useAppSelector } from "../../app/hooks";

export const ActivityList: React.FC = () => {
  const dataActivity = useAppSelector(selectDataActivity);
  return (
    <div className="grid grid-cols-2 lg:grid-cols-4 mt-12 gap-4">
      {dataActivity.data.map((item, i) => {
        return (
          <ActivityItem
            key={item.id}
            id={item.id}
            title={item.title}
            createdAt={item.created_at}
          />
        );
      })}
    </div>
  );
};
