import React from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { ymButtons } from '../../../../../redux/selectors/yandexmapsSelectors';
import { IAppState } from '../../../../../redux/types/interfaces';

import { Button } from '../Button';

const SubmitForm = ({ ymButtons }: Props) => {
    return (
        <React.Fragment>
            {Object.keys(ymButtons).map((buttonName: string, index: number) => {
                return (
                    <div
                        className='col-12 col-sm-4 d-grid'
                        key={`${buttonName}_____${index}`}
                    >
                        <Button
                            name={buttonName}
                            buttonsProps={ymButtons[buttonName]}
                        />
                    </div>
                );
            })}
        </React.Fragment>
    );
};

const mapState = (state: IAppState) => ({ ymButtons: ymButtons(state) });

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

export default connector(SubmitForm);
