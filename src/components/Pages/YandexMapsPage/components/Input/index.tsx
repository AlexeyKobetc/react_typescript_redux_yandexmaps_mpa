import React, { useEffect, useRef } from 'react';
import { ym } from '../../../../../redux/Store';

import { IInput } from '../../../../../redux/types/interfaces';

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
        maxLen,
    } = inputProps;
    const inputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        isYandex && ym.getInputDomElement(name, inputRef.current);
    });
    return (
        <React.Fragment>
            <div className='form-floating'>
                {textarea ? (
                    <textarea
                        className={
                            'form-control bg-secondary bg-light border-dark text-dark mt-2 mb-2' +
                            (isValid !== null
                                ? isValid
                                    ? ' is-valid '
                                    : ' is-invalid '
                                : '')
                        }
                        style={{ minHeight: '6rem' }}
                        id={name}
                        name={name}
                        placeholder={placeHolder}
                        disabled={isDisable}
                        value={value}
                        onBlur={(
                            event: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) => {
                            const {
                                currentTarget: { name, value },
                            } = event;
                            ym.ymInputBlurHandler(name, value, isYandex);
                        }}
                        onChange={(
                            event: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) => {
                            const {
                                currentTarget: { name, value },
                            } = event;
                            ym.ymInputChangeHandler(
                                name,
                                value,
                                regEx,
                                maxLen,
                                isYandex
                            );
                        }}
                    />
                ) : (
                    <input
                        className={
                            'form-control bg-secondary bg-light border-dark text-dark mt-2 mb-2' +
                            (isValid !== null
                                ? isValid
                                    ? ' is-valid '
                                    : ' is-invalid '
                                : '')
                        }
                        ref={inputRef}
                        id={name}
                        name={name}
                        placeholder={placeHolder}
                        disabled={isDisable}
                        value={value}
                        onBlur={(
                            event: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) => {
                            const {
                                currentTarget: { name, value },
                            } = event;
                            ym.ymInputBlurHandler(name, value, isYandex);
                        }}
                        onChange={(
                            event: React.ChangeEvent<
                                HTMLInputElement | HTMLTextAreaElement
                            >
                        ) => {
                            const {
                                currentTarget: { name, value },
                            } = event;
                            ym.ymInputChangeHandler(
                                name,
                                value,
                                regEx,
                                maxLen,
                                isYandex
                            );
                        }}
                    />
                )}
                <label
                    htmlFor={name}
                    className={`form-label ${
                        isValid === false ? 'text-danger' : 'text-secondary'
                    }`}
                >
                    {isValid === false ? (
                        <strong>{isValid === false && errorLabel}</strong>
                    ) : (
                        labelText
                    )}
                </label>
            </div>
        </React.Fragment>
    );
};
