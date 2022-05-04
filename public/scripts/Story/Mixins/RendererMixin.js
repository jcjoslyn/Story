import { removeAllChildNodes } from "../../utility.js";

const RendererMixin = (parent) => {
  const scope = {
    render: (renderInstruction, callback) => {
      removeAllChildNodes(parent);
      parent.appendChild(renderInstruction);
      if (callback) {
        setTimeout(() => {
          callback.funct(callback.data);
        }, callback.delay);
      }
    },
  };
  return scope;
};

export default RendererMixin;
