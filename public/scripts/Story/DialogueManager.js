import RendererMixin from "./Mixins/RendererMixin.js";
import { compose } from "../utility.js";
import { on } from "../publishSubscribe.js";
import DialogueRenderer from "./DialogueRenderer.js";

class DialogueManager {
  dialogueData;

  constructor({ dialogueParent, dialogueData }) {
    this.dialogueData = dialogueData;

    const Renderer = RendererMixin(dialogueParent);

    compose(this, [Renderer]);

    on("storystatechange", (state) => {
      const result = this.dialogueData[state];
      if (result) {
        this.render(DialogueRenderer(result.background), {
          funct: result.typeFunction,
          data: result.string,
          delay: result.delay,
        });
      }
    });
  }
}

export default DialogueManager;
