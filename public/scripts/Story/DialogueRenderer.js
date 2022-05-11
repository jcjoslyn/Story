import { createElement } from "../utility.js";
import { emit } from "../publishSubscribe.js";

const DialogueRenderer = ({ background, text, typeFunction, delay, links }) => {
  let set = { text, delay, links };

  const dialogueWrapper = {
    type: "div",
    classes: ["dialogue-wrapper"],
  };

  const dialogueSpeaker = {
    type: "div",
    classes: ["dialogue-speaker"],
    text: text.speaker.name,
    styles: text.speaker.styles,
  };

  const dialogueText = {
    type: "div",
    classes: ["dialogue-text"],
  };

  const wrapper = createElement(dialogueWrapper);
  const speaker = createElement(dialogueSpeaker);
  const dialogue = createElement(dialogueText);

  wrapper.appendChild(speaker);
  wrapper.appendChild(dialogue);

  set.parent = wrapper;

  if (typeFunction)
    set.funct = typeDialogue(typeFunction, { speaker, dialogue });

  return set;
};

function typeDialogue(type, elements) {
  switch (type) {
    case "none":
      return (data) => {
        elements.dialogue.innerHTML = data.text.dialogue.text;
        emit("dialoguefinished", data);
      };
  }
}

export default DialogueRenderer;
