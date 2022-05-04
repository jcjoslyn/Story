import { StateMap, StateEvent } from "../stateManager.js";
import { on, emit } from "../publishSubscribe.js";
import LocationManager from "./LocationManager.js";
import CharacterManager from "./CharacterManager.js";
import DialogueManager from "./DialogueManager.js";

class StoryManager {
  state = new StateMap();
  modules = {};
  constructor({ stateData, locationData, characterData, dialogueData }) {
    this.state.addLinks(stateData);

    this.modules.location = new LocationManager(locationData);
    this.modules.characters = new CharacterManager(characterData);
    this.modules.dialogue = new DialogueManager(dialogueData);

    on("framefinished", (data) => {
      const result = this.state.triggerStateEvent(
        new StateEvent({ name: data.name, data: data.data })
      );
      if (result) emit("storystatechange", result);
    });
  }
}

export default StoryManager;
