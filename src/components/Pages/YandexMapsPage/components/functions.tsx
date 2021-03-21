export const fadeOut = (root: HTMLDivElement) => {
  let loadingDiv = root.querySelector("div");
  if (loadingDiv !== null) {
    loadingDiv.style.opacity = "0";
    setTimeout(() => {
      if (loadingDiv) {
        loadingDiv.style.display = "none";
      }
    }, 2000);
  }
};

export const changeButtonLabel = (event: any) => {
  const { target, type } = event;

  const { id } = target;

  if (type === "shown.bs.collapse") {
    if (id === "orderDiv") {
      const orderButton = document.querySelector("#orderButton");

      if (orderButton) orderButton.textContent = `unfold_less`;
    }
    if (id === "mapDiv") {
      const mapButton = document.querySelector("#mapButton");
      if (mapButton) mapButton.textContent = `unfold_less`;
    }
  }
  if (type === "hidden.bs.collapse") {
    if (id === "orderDiv") {
      const orderButton = document.querySelector("#orderButton");

      if (orderButton) orderButton.textContent = `unfold_more`;
    }
    if (id === "mapDiv") {
      const mapButton = document.querySelector("#mapButton");
      if (mapButton) mapButton.textContent = `unfold_more`;
    }
  }
};

export const collapseButton = (idButton: string, idCollapseChild: string) => (
  <span
    className="btn btn-outline-secondary btn-sm material-icons"
    style={{ width: "2rem" }}
    id={idButton}
    data-bs-toggle="collapse"
    data-bs-target={`#${idCollapseChild}`}
    aria-expanded="false"
    aria-controls="collapseExample"
  >
    unfold_less
  </span>
);

export const helpRow = () => (
  <div className="row d-flex justify-content-center align-items-center">
    <div className="col-12 d-flex flex-row flex-wrap justify-content-around align-items-center bg-dark text-light pt-1">
      <h6>
        <strong>Левая клавиша мыши</strong> - установить маркер отправления
      </h6>
      <h6>
        <strong>Правая клавиша мыши</strong> - установить маркер назначения
      </h6>
    </div>
  </div>
);
