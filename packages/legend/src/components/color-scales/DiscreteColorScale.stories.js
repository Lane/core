import React from "react";
import DiscreteColorScale from "./DiscreteColorScale";

export default {
  component: DiscreteColorScale,
  title: "Legend/color scales/Discrete",
  args: {},
};

/**
 * A base map with no overlays or additional styles
 */
export const Base = ({ ...args }) => <DiscreteColorScale {...args} />;
Base.args = {};
