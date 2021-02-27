import { withStyles } from "@material-ui/styles";
import QuantizeLegend from "./QuantizeLegend";
import React from "react";

export default {
  component: QuantizeLegend,
  title: "Legend/QuantizeLegend",
  args: {
    label: "default",
  },
};

const StyledQuantizeLegend = withStyles({
  root: {
    background: "#0f0",
  },
})(QuantizeLegend);

/**
 * Use `withStyles` or provide a `classes` object with class names to override styles
 */
export const StyledQuantize = ({ ...args }) => (
  <StyledQuantizeLegend {...args} />
);

/**
 * A base map with no overlays or additional styles
 */
export const Base = ({ ...args }) => <QuantizeLegend {...args} />;
Base.args = { label: "base" };
