import React from "react";
import { ymButtonsClick } from "../../../../../redux/actions/yandexmapsActions";
import { store } from "../../../../../redux/Store";
import { IButton } from "../../../../../redux/types/interfaces";

type Props = {
  name: string;
  buttonsProps: IButton;
};

export const Button = ({ name, buttonsProps }: Props) => {
  const { labelText, disabled } = buttonsProps;
  return (
    <React.Fragment>
      <button
        disabled={disabled}
        className="btn btn-outline-secondary mt-2 mb-2"
        id={name}
        name={name}
        onClick={() => {
          store.dispatch(ymButtonsClick(name));
        }}
      >
        {labelText}
      </button>
    </React.Fragment>
  );
};
