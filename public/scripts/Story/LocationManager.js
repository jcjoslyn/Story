import RendererMixin from "./Mixins/RendererMixin.js";
import { compose, createElement } from "../utility.js";
import { on } from "../publishSubscribe.js";
import LocationRenderer from "./LocationRenderer.js";

class LocationManager {
  constructor(parent) {
    const Renderer = RendererMixin(
      parent,
      createElement({ type: "div", id: "location" })
    );

    compose(this, [Renderer]);

    on("storystatechange", (state) => {
      if (state.location) this.render(LocationRenderer(state.location));
    });
  }
}

export default LocationManager;
