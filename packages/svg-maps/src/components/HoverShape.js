import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { Geography } from "react-simple-maps";
import useMapHovered from "../hooks/useMapHovered";

const styles = {
  root: { pointerEvents: "none" },
  shape: {},
};

const HoverShape = ({ classes, className, geo, ...props }) => {
  const [hovered] = useMapHovered();
  return (
    <g className={clsx("svg-map__hover", classes.root, className)} {...props}>
      {hovered && (
        <Geography
          className={clsx("svg-map__geography", classes.shape)}
          geography={hovered}
        />
      )}
    </g>
  );
};

HoverShape.propTypes = {
  /** Object of class names for the map */
  classes: PropTypes.object,
  /** Root class name for the map */
  className: PropTypes.string,
  /** Determines whether state level labels are shown */
  showLabels: PropTypes.bool,
  /** handler function for hover events */
  onHover: PropTypes.func,
  /** handler for selecting a location */
  onSelect: PropTypes.func,
};

export { HoverShape };

/** add the display name */
const exportComponent = withStyles(styles, { name: "HypSvgMapHoverShape" })(
  HoverShape
);
exportComponent.displayName = "HoverShape";
export default exportComponent;
