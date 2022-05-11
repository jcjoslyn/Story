import RendererMixin from "./Mixins/RendererMixin.js";
import { compose, createElement } from "../utility.js";
import { on, emit } from "../publishSubscribe.js";
import DialogueRenderer from "./DialogueRenderer.js";
import SelectionManager from "./SelectionManager.js";

class DialogueManager {
  links;
  constructor(parent) {
    const Renderer = RendererMixin(
      parent,
      createElement({ type: "div", id: "dialogue" })
    );

    new SelectionManager();

    compose(this, [Renderer]);

    document.addEventListener("keydown", (ev) => {
      if (
        this.links &&
        this.links.length > 0 &&
        this.links[0].event === this.links[0].target &&
        ev.key === "Enter"
      ) {
        emit("framefinished", { name: this.links[0].event, data: {} });
      }
    });

    on("storystatechange", (state) => {
      console.log(state);
      const result = state.dialogue;
      if (result) {
        this.links = state.links;
        const set = Object.assign(result, { links: state.links });
        const renderInstructions = DialogueRenderer(set);
        this.render(renderInstructions.parent, renderInstructions);
      }
    });
  }
}

export default DialogueManager;
