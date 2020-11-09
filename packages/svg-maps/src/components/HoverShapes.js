import { withStyles } from "@material-ui/core";
import Shapes from "./Shapes";

export const styles = {
  geography: {
    fill: "transparent",
    stroke: "transparent",
    strokeWidth: 2,
  },
  hovered: {
    stroke: "#999",
  },
};

export default withStyles(styles, { name: "HypHoverShapes" })(Shapes);
