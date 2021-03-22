import { IFiveDayMeteoListElement } from '../../../redux/types/interfaces';

export const renderHeadRow = (array: IFiveDayMeteoListElement[]) =>
    array.map((weatherElement: IFiveDayMeteoListElement, index: number) => {
        const { dt_txt } = weatherElement;

        const time = dt_txt.split(' ')[1].slice(0, -3);
        const date = dt_txt
            .split(' ')[0]
            .split('-')
            .reverse()
            .join('/');

        return (
            <th
                scope='col'
                key={`${time}_${date}_${index}`}
                style={{ minWidth: '150px' }}
            >
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <h5>{date}</h5>
                    <h6>{time}</h6>
                </div>
            </th>
        );
    });

export const renderIconsRow = (array: IFiveDayMeteoListElement[]) =>
    array.map((weatherElement: IFiveDayMeteoListElement, index: number) => {
        const { weather } = weatherElement;
        const { icon } = weather[0];
        const iconSrc = 'http://openweathermap.org/img/wn/' + icon + '@2x.png';

        return (
            <th scope='row' key={`${icon}_${index}`}>
                <div className='d-flex flex-column justify-content-center align-items-center'>
                    <img src={iconSrc} alt='icon' />
                </div>
            </th>
        );
    });

export const renderDescriptionRow = (array: IFiveDayMeteoListElement[]) =>
    array.map((weatherElement: IFiveDayMeteoListElement, index: number) => {
        const { weather } = weatherElement;
        const { description } = weather[0];

        return (
            <th scope='row' key={`${description}_${index}`}>
                <div className='text-center'>
                    <h6>{description}</h6>
                </div>
            </th>
        );
    });

export const renderTemperatureRow = (array: IFiveDayMeteoListElement[]) =>
    array.map((weatherElement: IFiveDayMeteoListElement, index: number) => {
        const {
            main: { temp },
        } = weatherElement;

        const temperature = '' + Math.round(temp);

        return (
            <th scope='row' key={`${temp}_${index}`}>
                <div className='text-center'>
                    <h6>{temperature}&#186;</h6>
                </div>
            </th>
        );
    });
