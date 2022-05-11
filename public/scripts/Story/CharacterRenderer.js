import { createElement } from "../utility.js";

const CharacterRenderer = ({
  src,
  classNames = {},
  position = "left",
  rotation = "",
}) => {
  const wrapperData = {
    type: "div",
    classes: classNames.wrapper || [
      `character-wrapper`,
      `${position}${rotation}`,
    ],
  };

  const imageData = {
    type: "img",
    classes: classNames.image || ["character-image"],
    attributes: { src },
  };

  const wrapper = createElement(wrapperData);
  const image = createElement(imageData);

  wrapper.appendChild(image);

  return wrapper;
};

export default CharacterRenderer;
