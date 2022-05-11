import { createElement } from "../utility.js";

const LocationRenderer = ({ src, classNames = {} }) => {
  const wrapperData = {
    type: "div",
    classes: classNames.wrapper || ["location-wrapper"],
  };

  const imageData = {
    type: "img",
    classes: classNames.image || ["location-image"],
    attributes: { src },
  };

  const wrapper = createElement(wrapperData);
  const image = createElement(imageData);

  wrapper.appendChild(image);

  return wrapper;
};

export default LocationRenderer;
