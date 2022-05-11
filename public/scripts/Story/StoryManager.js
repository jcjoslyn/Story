import { StateMap, StateEvent } from "../stateManager.js";
import { on, emit } from "../publishSubscribe.js";
import LocationManager from "./LocationManager.js";
import CharacterManager from "./CharacterManager.js";
import DialogueManager from "./DialogueManager.js";

class StoryManager {
  state = new StateMap();
  story;
  modules = {};
  constructor({ stateData, parent }) {
    this.story = stateData;
    const links = {};

    Array.from(Object.keys(stateData)).forEach((key) => {
      links[key] = stateData[key].links;
    });
    this.state.addLinks(links);

    this.modules.location = new LocationManager(parent);
    this.modules.characters = new CharacterManager(parent);
    this.modules.dialogue = new DialogueManager(parent);

    on("framefinished", (data) => {
      console.log(data);
      this.nextFrame.apply(this, [data]);
    });

    emit("storystatechange", this.story.default);
  }

  nextFrame(data) {
    const result = this.state.triggerStateEvent(
      new StateEvent({ name: data.name, data: data.data })
    );
    if (result)
      emit("storystatechange", Object.assign(this.story[result], result));
  }
}

export default StoryManager;
