import React, { useState, useEffect, useRef } from "react";
import { connect, ConnectedProps } from "react-redux";
import { destroyMap, initMapEnvironment } from "../../../redux/actions/yandexmapsActions";
import { getYm, isYmScriptLoad } from "../../../redux/selectors/yandexmapsSelectors";
import { IAppStore } from "../../../redux/types/interfaces";

import styles from "./index.module.css";

const YandexMapsPage = ({ isYmScriptLoad, initMapEnvironment, destroyMap }: Props) => {
  const divRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    initMapEnvironment(divRef.current, isYmScriptLoad);

    // const orderDiv = document.querySelector("#orderDiv");
    // const mapDiv = document.querySelector("#mapDiv");

    // orderDiv?.addEventListener("hidden.bs.collapse", changeButtonLabel);
    // orderDiv?.addEventListener("shown.bs.collapse", changeButtonLabel);
    // mapDiv?.addEventListener("hidden.bs.collapse", changeButtonLabel);
    // mapDiv?.addEventListener("shown.bs.collapse", changeButtonLabel);
    // return () => {
    //   orderDiv?.removeEventListener("hidden.bs.collapse", changeButtonLabel);
    //   orderDiv?.removeEventListener("shown.bs.collapse", changeButtonLabel);
    //   mapDiv?.removeEventListener("hidden.bs.collapse", changeButtonLabel);
    //   mapDiv?.removeEventListener("shown.bs.collapse", changeButtonLabel);
    // };
    return () => {
      destroyMap();
    };
  });

  return (
    <React.Fragment>
      {/* <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-sm-11 mt-3 mb-3">
          {collapseButton("orderButton", "orderDiv")}
          <div className="collapse show" id="orderDiv">
            <OrderForm />
          </div>
        </div>
      </div>
      {helpRow()}
      <div className="row d-flex justify-content-center align-items-center">
        <div className="col-12 col-sm-11 mt-3 mb-3 d-grid">{collapseButton("mapButton", "mapDiv")}</div>
      </div> */}
      <div className="row">
        {/* <div className="collapse show" id="mapDiv"> */}
        <div className="col-12 bg-danger" style={{ position: "relative", minHeight: "40vh" }} ref={divRef}>
          {/* <div className={styles.loading}>
              <Loading text={`Загружается карта ...`} />
            </div> */}
        </div>
        {/* </div> */}
      </div>
      {/* {helpRow()}
      <div className="row d-flex flex-row justify-content-around align-items-center">
        <SubmitForm />
      </div> */}
    </React.Fragment>
  );
};

const mapState = (store: IAppStore) => ({
  isYmScriptLoad: isYmScriptLoad(store)
});

const mapDispatch = {
  initMapEnvironment,
  destroyMap
};

const connector = connect(mapState, mapDispatch);

type Props = ConnectedProps<typeof connector> & {};

export default connector(YandexMapsPage);
