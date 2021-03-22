import React, { useEffect, useState } from 'react';
import { connect, ConnectedProps } from 'react-redux';
import { Route, Switch, useLocation } from 'react-router-dom';

import { setActivePath } from '../../redux/actions/pagesActions';
import { getPages } from '../../redux/selectors/pageSelectors';

import { IAppStore } from '../../redux/types/interfaces';

import NoPage from '../Pages/NoPage';

const App = ({ getPages, setActivePath }: Props) => {
    const [currentPath] = useState(useLocation().pathname);

    useEffect(() => {
        setActivePath(currentPath);
    }, []);

    return (
        <React.Fragment>
            <Switch>
                {Object.keys(getPages).map(
                    (pageName: string, index: number) => {
                        const { path, component, isExact } = getPages[pageName];
                        return (
                            <Route
                                path={path}
                                component={component}
                                exact={isExact}
                                key={`${pageName}_${index}`}
                            />
                        );
                    }
                )}
                <Route component={NoPage} />
            </Switch>
        </React.Fragment>
    );
};

const mapState = (store: IAppStore) => ({
    getPages: getPages(store),
});

const mapDispatch = {
    setActivePath,
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

export default connector(App);
