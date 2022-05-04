import RendererMixin from "./Mixins/RendererMixin.js";
import { compose } from "../utility.js";
import { on } from "../publishSubscribe.js";
import LocationRenderer from "./LocationRenderer.js";

class LocationManager {
  locationData;

  constructor({ locationParent, locationData }) {
    this.locationData = locationData;

    const Renderer = RendererMixin(locationParent);

    compose(this, [Renderer]);

    on("storystatechange", (state) => {
      if (this.locationData[state])
        this.render(LocationRenderer(this.locationData[state]));
    });
  }
}

export default LocationManager;
