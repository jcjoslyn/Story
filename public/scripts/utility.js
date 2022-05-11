export const compose = (target, sources) => {
  sources.forEach((s) => {
    Object.assign(target, s);
  });
};

export const removeAllChildNodes = (parent) => {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
};

export const createElement = ({
  type = "div",
  id,
  classes = [],
  attributes,
  text = "",
  styles = {},
  events = [],
}) => {
  const element = document.createElement(type);
  if (id) element.id = id;

  classes.forEach((c) => {
    element.classList.add(c);
  });

  if (attributes) {
    Array.from(Object.keys(attributes)).forEach((key) => {
      element[key] = attributes[key];
    });
  }

  if (text) {
    element.innerHTML = text;
  }

  if (styles) {
    Array.from(Object.keys(styles)).forEach((key) => {
      element.style[key] = styles[key];
    });
  }

  if (events) {
    events.forEach((ev) => {
      element.addEventListener(ev.type, ev.function);
    });
  }

  return element;
};
