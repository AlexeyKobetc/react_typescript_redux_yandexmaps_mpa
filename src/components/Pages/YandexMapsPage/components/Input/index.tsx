import React from "react";
import { ymInputValueBlur, ymInputValueChange } from "../../../../../redux/actions/yandexmapsActions";
import { IInput } from "../../../../../redux/types/interfaces";
import { store } from "../../../../../redux/Store";

type Props = {
  name: string;
  inputProps: IInput;
};

export const Input = ({ name, inputProps }: Props) => {
  const {
    textarea,
    labelText,
    placeHolder,
    errorLabel,
    value,
    isValid,
    isDisable,
    isYandex,
    regEx,
    maxLen
  } = inputProps;
  return (
    <React.Fragment>
      <div className="form-floating">
        {textarea ? (
          <textarea
            className={
              "form-control bg-secondary bg-light border-dark text-dark mt-2 mb-2" +
              (isValid !== null ? (isValid ? " is-valid " : " is-invalid ") : "")
            }
            style={{ minHeight: "6rem" }}
            id={name}
            name={name}
            placeholder={placeHolder}
            disabled={isDisable}
            value={value}
            onBlur={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const {
                currentTarget: { name, value }
              } = event;
              store.dispatch(ymInputValueBlur(name, value, isYandex));
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const {
                currentTarget: { name, value }
              } = event;
              store.dispatch(ymInputValueChange(name, value, regEx, maxLen, isYandex));
            }}
          />
        ) : (
          <input
            className={
              "form-control bg-secondary bg-light border-dark text-dark mt-2 mb-2" +
              (isValid !== null ? (isValid ? " is-valid " : " is-invalid ") : "")
            }
            id={name}
            name={name}
            placeholder={placeHolder}
            disabled={isDisable}
            value={value}
            onBlur={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const {
                currentTarget: { name, value }
              } = event;
              store.dispatch(ymInputValueBlur(name, value, isYandex));
            }}
            onChange={(event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
              const {
                currentTarget: { name, value }
              } = event;
              store.dispatch(ymInputValueChange(name, value, regEx, maxLen, isYandex));
            }}
          />
        )}
        <label
          htmlFor={name}
          className={`form-label ${isValid === false ? "text-danger" : "text-secondary"}`}
        >
          {isValid === false ? <strong>{isValid === false && errorLabel}</strong> : labelText}
        </label>
      </div>
    </React.Fragment>
  );
};
