import { removeAllChildNodes } from "../../utility.js";

const RendererMixin = (parent, renderElement) => {
  parent.appendChild(renderElement);
  const scope = {
    render: (renderInstruction, callback) => {
      removeAllChildNodes(renderElement);
      renderElement.appendChild(renderInstruction);
      if (callback) {
        console.log("calling callback");
        setTimeout(() => {
          callback.funct(callback);
        }, callback.delay);
      }
    },
  };
  return scope;
};

export default RendererMixin;
