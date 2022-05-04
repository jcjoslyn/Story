import RendererMixin from "./Mixins/RendererMixin.js";
import { compose } from "../utility.js";
import { on } from "../publishSubscribe.js";
import CharacterRenderer from "./CharacterRenderer.js";

class CharacterManager {
  characterData;

  constructor({ characterParent, characterData }) {
    this.characterData = characterData;

    const Renderer = RendererMixin(characterParent);

    compose(this, [Renderer]);

    on("storystatechange", (state) => {
      if (this.characterData[state])
        this.render(CharacterRenderer(this.characterData[state]));
    });
  }
}

export default CharacterManager;
