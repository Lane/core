import React from "react";

import Mapbox from "./Mapbox";

export default {
  component: Mapbox,
  title: "Visualization/Mapbox",
  args: {
    MapGLProps: {
      mapboxApiAccessToken:
        "pk.eyJ1IjoiaHlwZXJvYmpla3QiLCJhIjoiY2pzZ3Bnd3piMGV6YTQzbjVqa3Z3dHQxZyJ9.rHobqsY_BjkNbqNQS4DNYw",
    },
    defaultViewport: {
      zoom: 11,
      latitude: 40.74,
      longitude: -73.96,
      // Uncomment to test maxBounds patch.
      // maxBounds: [
      //   [-107.6, 33.8],
      //   [-65, 49.9],
      // ],
    },
  },
};

/**
 * A base map with no overlays or additional styles
 */
export const Base = (args) => <Mapbox {...args} />;
