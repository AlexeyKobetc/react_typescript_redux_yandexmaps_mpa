import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { setActivePath } from "../../redux/actions/pagesActions";
import { getPages, getActivePath } from "../../redux/selectors/pageSelectors";
import { IAppStore, IPages, IAction } from "../../redux/types/interfaces";

import styles from "./index.module.css";

const Header = ({ getPages, getActivePath, setActivePath }: IProps) => {
  return (
    <div className="row d-flex flex-row flex-wrap justify-content-center align-items-center bg-dark text-light pt-4 pb-4">
      <div className="col-12 col-sm-3 text-center text-sm-start">
        <NavLink
          to="/"
          exact
          className="text-light text-decoration-none "
          onClick={() => {
            setActivePath("/");
          }}
        >
          <div>
            <h2>Тестовый сайт</h2>
          </div>
        </NavLink>
      </div>

      <div className="col-12 col-sm-6 d-flex flex-row flex-wrap justify-content-center align-items-center">
        {Object.keys(getPages).map((pageName: string, index: number) => {
          const { path, isExact } = getPages[pageName];
          const isActive = getActivePath === path;
          return (
            <NavLink
              to={path}
              exact={isExact}
              key={`${pageName}__${index}`}
              onClick={() => {
                setActivePath(path);
              }}
              className={`text-decoration-none ${styles.nav_link} me-3 ms-3`}
            >
              {/* {path === "/meteo" && isCurrentMeteoLoad ? (
                <div className={`d-flex flex-row flex-wrap pt-1 pb-2 `}>
                  <img src={getCurrentMeteo.icon} style={{ height: "3rem" }} />
                  <div style={{ height: "3rem" }}>
                    <h6
                      className={`${isActive ? styles.nav_item_active : `text-secondary`} small text-center`}
                    >
                      {getCurrentMeteo.temp}&#186;
                    </h6>
                    <h6
                      className={`${isActive ? styles.nav_item_active : `text-secondary`} small text-center`}
                    >
                      {getCurrentMeteo.description}
                    </h6>
                  </div>
                </div>
              ) : ( */}
              <div
                className={` ${isActive ? styles.nav_item_active : ``} text-decoration-none ${
                  styles.nav_item
                }`}
              >
                <h6>{pageName}</h6>
              </div>
              {/* )} */}
            </NavLink>
          );
        })}
      </div>

      <div className="col-12 col-sm-3 text-center text-sm-end">
        <h4>TEST</h4>
      </div>
    </div>
  );
};

export default connect(
  (store: IAppStore) => ({
    getPages: getPages(store),
    getActivePath: getActivePath(store)
  }),
  {
    setActivePath: setActivePath
  }
)(Header);

interface IProps {
  getPages: IPages;
  getActivePath: string;

  setActivePath: (pathName: string) => IAction;
}