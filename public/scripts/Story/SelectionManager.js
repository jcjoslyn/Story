import { on } from "../publishSubscribe.js";
import SelectionRenderer from "./SelectionRenderer.js";

class SelectionManager {
  constructor(parent) {
    on("dialoguefinished", (state) => {
      console.log(state);
      const parent = document.getElementsByClassName("dialogue-wrapper")[0];
      if (
        state.links &&
        state.links.length > 0 &&
        state.links[0].event != state.links[0].target
      )
        parent.appendChild(SelectionRenderer(state.links));
    });
  }
}

export default SelectionManager;
