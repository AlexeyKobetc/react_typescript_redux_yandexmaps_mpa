import React from 'react';

import { connect, ConnectedProps } from 'react-redux';

import { ymInputs } from '../../../../../redux/selectors/yandexmapsSelectors';
import { IAppState } from '../../../../../redux/types/interfaces';

import { Input } from '../Input';

const OrderForm = ({ ymInputs }: Props) => {
    return (
        <React.Fragment>
            {Object.keys(ymInputs).map((inputName: string, index: number) => {
                return (
                    <Input
                        name={inputName}
                        inputProps={ymInputs[inputName]}
                        key={`${inputName}____${index}`}
                    />
                );
            })}
        </React.Fragment>
    );
};

const mapState = (state: IAppState) => ({ ymInputs: ymInputs(state) });

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

export default connector(OrderForm);
