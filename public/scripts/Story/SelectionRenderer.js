import { createElement } from "../utility.js";
import { emit } from "../publishSubscribe.js";

const SelectionRenderer = (data) => {
  console.log(data);
  const wrapperData = {
    type: "div",
    classes: ["selection-wrapper"],
  };

  const buttonData = {
    type: "button",
    classes: ["selection-button"],
  };

  const wrapper = createElement(wrapperData);

  data.forEach((d) => {
    const elementData = JSON.parse(JSON.stringify(buttonData));

    elementData.text = d.event;
    elementData.events = [
      {
        type: "click",
        function: (ev) => {
          emit("framefinished", { name: d.event, data: {} });
        },
      },
    ];

    wrapper.appendChild(createElement(elementData));
  });

  return wrapper;
};

export default SelectionRenderer;
