import React, { useEffect } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import {
    renderHeadRow,
    renderIconsRow,
    renderDescriptionRow,
    renderTemperatureRow,
} from './functions';
import { setCountMeteoCellsOnScreen } from '../../../redux/actions/meteoActions';
import { IAppStore } from '../../../redux/types/interfaces';
import {
    getCountMeteoCellsOnScreen,
    getFiveDayMeteo,
    isFiveDayMeteoLoad,
} from '../../../redux/selectors/meteoSelectors';

import Loading from '../../../sharedcomponents/Loading';

const MeteoPage = ({
    isFiveDayMeteoLoad,
    getFiveDayMeteo,
    setCountMeteoCellsOnScreen,
    getCountMeteoCellsOnScreen,
}: Props) => {
    const countsMeteoCellsOnScreen = (): void => {
        const widthMeteoCellInPx = 200;
        let countCells = Math.floor(
            document.body.clientWidth / widthMeteoCellInPx
        );
        countCells = countCells < 1 ? 1 : countCells;
        if (countCells !== getCountMeteoCellsOnScreen)
            setCountMeteoCellsOnScreen(countCells);
    };

    useEffect(() => {
        countsMeteoCellsOnScreen();

        window.addEventListener('resize', countsMeteoCellsOnScreen);
        return () => {
            window.removeEventListener('resize', countsMeteoCellsOnScreen);
        };
    });

    return (
        <React.Fragment>
            {!isFiveDayMeteoLoad || !getFiveDayMeteo.length ? (
                <Loading text={`Загружается прогноз погоды ...`} />
            ) : (
                <React.Fragment>
                    <div className='row justify-content-center align-items-center'>
                        <div className='col d-flex flex-column justify-content-center align-items-center m-4'>
                            <h1 className='text-secondary'>
                                {' '}
                                {`Прогноз погоды`}{' '}
                            </h1>
                            <h5 className='text-secondary text-muted'>
                                {' '}
                                {`Анапа`}{' '}
                            </h5>
                        </div>
                    </div>

                    <div className='row justify-content-center align-items-center'>
                        <div className='col-12 col-sm-11 mt-5 mb-5'>
                            <table className='table'>
                                <thead>
                                    <tr>{renderHeadRow(getFiveDayMeteo)}</tr>
                                </thead>
                                <tbody>
                                    <tr>{renderIconsRow(getFiveDayMeteo)}</tr>
                                    <tr>
                                        {renderDescriptionRow(getFiveDayMeteo)}
                                    </tr>
                                    <tr>
                                        {renderTemperatureRow(getFiveDayMeteo)}
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </React.Fragment>
            )}
        </React.Fragment>
    );
};

const mapState = (store: IAppStore) => ({
    isFiveDayMeteoLoad: isFiveDayMeteoLoad(store),
    getFiveDayMeteo: getFiveDayMeteo(store),
    getCountMeteoCellsOnScreen: getCountMeteoCellsOnScreen(store),
});

const mapDispatch = {
    setCountMeteoCellsOnScreen,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

export default connector(MeteoPage);
