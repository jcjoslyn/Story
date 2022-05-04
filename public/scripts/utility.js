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
