import { withStyles } from "@material-ui/core";
import clsx from "clsx";
import React, { useState } from "react";
import PropTypes from "prop-types";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import StateLabels from "./StateLabels";
import Shapes from "./Shapes";
import useMapHovered from "../hooks/useMapHovered";
import HoverShapes from "./HoverShapes";

const styles = {
  root: {},
  geographies: {},
  geography: {
    fill: "#eee",
    stroke: "#fff",
  },
  hovered: {
    stroke: "#f00",
  },
};

const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

{
  /* <SvgMap>
  <StatesLayer interactive />
</SvgMap>; */
}

const SvgMap = ({
  source = geoUrl,
  classes,
  className,
  hover = false,
  showLabels = false,
  onHover,
  onSelect,
  children,
  ...props
}) => {
  const [hovered, setHovered] = useMapHovered();
  const [selected, setSelected] = useMapHovered();
  const handleHover = (geo) => {
    setHovered(geo);
    onHover && onHover(geo);
  };
  const handleSelect = (geo) => {
    setSelected(geo);
    onSelect && onSelect(geo);
  };
  return (
    <ComposableMap
      className={clsx("svg-map", classes.root, className)}
      projection="geoAlbersUsa"
      {...props}
    >
      <Geographies
        className={clsx(
          "svg-map__geographies",
          "svg-map__geographies--states",
          classes.geographies
        )}
        geography={source}
      >
        {({ geographies }) => (
          <>
            <Shapes hovered={hovered} geographies={geographies} />
            {showLabels && <StateLabels geographies={geographies} />}
            {hover && (
              <HoverShapes
                hovered={hovered}
                geographies={geographies}
                onHover={handleHover}
                onSelect={handleSelect}
              />
            )}
          </>
        )}
      </Geographies>
      {children}
    </ComposableMap>
  );
};

SvgMap.propTypes = {
  /** GeoJSON URL for base map geographies */
  source: PropTypes.string,
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

export default withStyles(styles, { name: "HypSvgMap" })(SvgMap);
