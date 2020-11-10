import { withStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";
import PropTypes from "prop-types";
import { Geography } from "react-simple-maps";

const styles = {
  root: {},
  shape: {
    fill: "#eee",
    stroke: "#fff",
  },
  hovered: {
    fill: "#f6f6f6",
  },
  selected: {},
};

const Shapes = ({
  classes,
  className,
  selected,
  hovered,
  geographies,
  onHover,
  onSelect,
  children,
  ...props
}) => {
  return (
    <g className={clsx("svg-map__shapes", classes.root, className)} {...props}>
      {geographies.map((geo) => (
        <Geography
          className={clsx("svg-map__geography", classes.shape, {
            [classes.hovered]: hovered && geo.rsmKey === hovered.rsmKey,
            [classes.selected]: selected && geo.rsmKey === selected.rsmKey,
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
      {children}
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

export default withStyles(styles, { name: "HypSvgMapShapes" })(Shapes);
