import React, { useEffect, useRef } from 'react';
import { connect, ConnectedProps } from 'react-redux';

import { IAppState } from '../../../redux/types/interfaces';
import {
    changeButtonLabel,
    collapseButton,
    fadeOut,
    helpRow,
} from './components/functions';

import styles from './index.module.css';

import Loading from '../../../sharedcomponents/Loading';
import OrderForm from './components/OrderForm';
import SubmitForm from './components/SubmitForm';

import { ym } from '../../../redux/Store';

const YandexMapsPage = ({}: Props) => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        ym.initMapEnvironment(divRef.current);

        divRef.current && fadeOut(divRef.current);

        const orderDiv = document.querySelector('#orderDiv');
        const mapDiv = document.querySelector('#mapDiv');

        orderDiv?.addEventListener('hidden.bs.collapse', changeButtonLabel);
        orderDiv?.addEventListener('shown.bs.collapse', changeButtonLabel);
        mapDiv?.addEventListener('hidden.bs.collapse', changeButtonLabel);
        mapDiv?.addEventListener('shown.bs.collapse', changeButtonLabel);
        return () => {
            orderDiv?.removeEventListener(
                'hidden.bs.collapse',
                changeButtonLabel
            );
            orderDiv?.removeEventListener(
                'shown.bs.collapse',
                changeButtonLabel
            );
            mapDiv?.removeEventListener(
                'hidden.bs.collapse',
                changeButtonLabel
            );
            mapDiv?.removeEventListener('shown.bs.collapse', changeButtonLabel);
        };
    });

    return (
        <React.Fragment>
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-12 col-sm-11 mt-3 mb-3'>
                    {collapseButton('orderButton', 'orderDiv')}
                    <div className='collapse show' id='orderDiv'>
                        <OrderForm />
                    </div>
                </div>
            </div>
            {helpRow()}
            <div className='row d-flex justify-content-center align-items-center'>
                <div className='col-12 col-sm-11 mt-3 mb-3 d-grid'>
                    {collapseButton('mapButton', 'mapDiv')}
                </div>
            </div>
            <div className='row'>
                <div className='collapse show' id='mapDiv'>
                    <div
                        className='col-12'
                        style={{ position: 'relative', minHeight: '50vh' }}
                        ref={divRef}
                    >
                        <div className={styles.loading}>
                            <Loading text={`Загружается карта ...`} />
                        </div>
                    </div>
                </div>
            </div>
            {helpRow()}
            <div className='row d-flex flex-row justify-content-around align-items-center'>
                <SubmitForm />
            </div>
        </React.Fragment>
    );
};

const mapState = (state: IAppState) => ({});

const mapDispatch = {};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

export default connector(YandexMapsPage);
