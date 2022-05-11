import RendererMixin from "./Mixins/RendererMixin.js";
import { compose, createElement } from "../utility.js";
import { on } from "../publishSubscribe.js";
import CharacterRenderer from "./CharacterRenderer.js";

class CharacterManager {
  constructor(parent) {
    const Renderer = RendererMixin(
      parent,
      createElement({ type: "div", id: "character" })
    );

    compose(this, [Renderer]);

    on("storystatechange", (state) => {
      if (state.characters) {
        const charactersWrapper = createElement({
          type: "div",
          id: "characters-wrapper",
        });
        state.characters.forEach((character) => {
          charactersWrapper.appendChild(CharacterRenderer(character));
        });
        this.render(charactersWrapper);
      }
    });
  }
}

export default CharacterManager;
