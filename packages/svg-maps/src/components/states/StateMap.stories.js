import { withStyles } from "@material-ui/core";
import React from "react";
import { StateMap } from "./StateMap";

export default {
  component: StateMap,
  title: "Visualization/StateMap",
  args: {
    showLabels: true,
    interactive: true,
    width: 800,
    height: 600,
  },
};

const StyledStatesMap = withStyles({
  hover: { strokeWidth: 4, stroke: "#669" },
  shape: { fill: "#ccf", stroke: "#99c" },
  hovered: { fill: "#eef" },
  text: { fill: "#444" },
})(StateMap);

/**
 * Use `withStyles` or provide a `classes` object with class names to override styles
 */
export const StyledStates = ({ ...args }) => <StyledStatesMap {...args} />;

/**
 * A base map with no overlays or additional styles
 */
export const Base = ({ ...args }) => <StateMap {...args} />;
Base.args = { showLabels: false, interactive: false };
