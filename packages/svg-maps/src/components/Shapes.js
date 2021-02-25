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
  isHoveredMatch = (geo, hovered) => hovered && geo.rsmKey === hovered.rsmKey,
  isSelectedMatch = (geo, selected) => selected && geo.rsmKey === selected.rsmKey,
  children,
  ...props
}) => {
  return (
    <g className={clsx("svg-map__shapes", classes.root, className)} {...props}>
      {geographies.map((geo) => (
        <Geography
          className={clsx("svg-map__geography", classes.shape, {
            [classes.hovered]: isHoveredMatch(geo, hovered),
            [classes.selected]: isSelectedMatch(geo, selected),
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
  /** geography currently hovered */
  hovered: PropTypes.object,
  /** geography currently selected */
  selected: PropTypes.object,
  /** handler function for hover events */
  onHover: PropTypes.func,
  /** handler for selecting a location */
  onSelect: PropTypes.func,
  /** function for determining if a geography matches hovered */
  isHoveredMatch: PropTypes.func,
  /** function for determining if a geography matches selected */
  isSelectedMatch: PropTypes.func,
};

export default withStyles(styles, { name: "HypSvgMapShapes" })(Shapes);
