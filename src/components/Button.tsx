import React from "react";
interface IButtonProps {
  dataCy: string;
  title: string;
  icon?: React.ReactNode;
  color?: string;
  bgColor: string;
  isLoading?: boolean;
  onClick?: (e: React.MouseEvent) => void;
  disabled?: boolean;
}

export const Button: React.FC<IButtonProps> = (props) => {
  if (props.color) {
  }
  return (
    <button
      disabled={props.disabled}
      onClick={props.onClick}
      data-cy={props.dataCy}
      type="button"
      data-te-ripple-init
      data-te-ripple-color="light"
      className={`${props.bgColor} ${
        props.disabled && "bg-opacity-50"
      } h-[37px] lg:h-[54px] px-4 lg:px-[39px] min-w-[150px] rounded-[45px] flex justify-center items-center`}
    >
      <div
        className={`${props.color} font-semibold text-[12px] lg:text-[18px] flex items-center gap-1 lg:gap-2`}
      >
        {props.icon}
        {!props.isLoading ? (
          props.title
        ) : (
          <div
            className="inline-block h-6 w-6 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
      </div>
    </button>
  );
};

Button.defaultProps = {
  isLoading: false,
  disabled: false,
  color: "text-white",
};
