import React from "react";
import ContinuousColorScale from "./ContinuousColorScale";

export default {
  component: ContinuousColorScale,
  title: "Legend/color scales/Continuous",
  args: {},
};

/**
 * A base map with no overlays or additional styles
 */
export const Continuous = ({ ...args }) => <ContinuousColorScale {...args} />;
Continuous.args = {
  colors: ["#6c6", "#c66", "#66c"],
};
