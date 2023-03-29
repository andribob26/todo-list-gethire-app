import React from "react";

export const ActivityEmpty: React.FC = () => {
  return (
    <div className="flex justify-center my-12 h-[60vh]">
      <img
        data-cy="activity-empty-state"
        src="/images/activity-empty-state.png"
        style={{
          objectFit: "contain",
        }}
        alt="activity-empty-state.png"
      />
    </div>
  );
};
