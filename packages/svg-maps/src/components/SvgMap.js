import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { ComposableMap } from "react-simple-maps";
import HoverShape from "./HoverShape";

const styles = {
  root: {},
  hover: { stroke: "#f00", fill: "transparent" },
};

/**
 * Base SVG Map
 */
const SvgMap = ({ className, classes, children, ...props }) => {
  return (
    <ComposableMap
      className={clsx("svg-map", classes.root, className)}
      projection="geoAlbersUsa"
      {...props}
    >
      {children}
      <HoverShape className={classes.hover} />
    </ComposableMap>
  );
};

SvgMap.propTypes = {
  className: PropTypes.string,
};

export { SvgMap };

/** add the display name */
const exportComponent = withStyles(styles, { name: "HypSvgMap" })(SvgMap);
exportComponent.displayName = "SvgMap";
export default exportComponent;
