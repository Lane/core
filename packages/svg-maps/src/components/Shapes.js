import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { Geography } from "react-simple-maps";

const styles = {
  root: {},
  geography: {
    fill: "#eee",
    stroke: "#fff",
  },
  hovered: {
    fill: "#f6f6f6",
  },
};

const Shapes = ({
  classes,
  className,
  hovered,
  geographies,
  onHover,
  onSelect,
  ...props
}) => {
  return (
    <g className={clsx("svg-map__shapes", classes.root, className)} {...props}>
      {geographies.map((geo) => (
        <Geography
          className={clsx("svg-map__geography", classes.geography, {
            [classes.hovered]: hovered && geo.rsmKey === hovered.rsmKey,
          })}
          key={geo.rsmKey}
          geography={geo}
          onClick={(e) => {
            onSelect && onSelect(geo, e);
          }}
          onMouseEnter={(e) => {
            onHover && onHover(geo, e);
          }}
          onMouseLeave={(e) => {
            onHover && onHover(null, e);
          }}
        />
      ))}
    </g>
  );
};

Shapes.propTypes = {
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

export default withStyles(styles, { name: "HypBaseShapes" })(Shapes);
