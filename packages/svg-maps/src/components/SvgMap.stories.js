import React from "react";

import SvgMap from "./SvgMap";

export default {
  component: SvgMap,
  title: "Visualization/SvgMap",
  args: {
    showLabels: true,
    hover: true,
  },
};

/**
 * A base map with no overlays or additional styles
 */
export const Base = (args) => <SvgMap {...args} />;
