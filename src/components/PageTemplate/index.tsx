import React, { Children, cloneElement, isValidElement } from 'react';

const PageTemplate: React.FC<{}> = ({ children }) => (
    <div className='container-fluid p-0 m-0'>
        {Children.map(children, child => {
            if (isValidElement(child)) {
                return (
                    <div className='container-fluid'>{cloneElement(child)}</div>
                );
            }
        })}
    </div>
);

export default PageTemplate;
