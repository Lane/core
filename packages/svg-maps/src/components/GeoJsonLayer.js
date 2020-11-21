import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import Shapes from "./Shapes";
import GeoJsonLabels from "./GeoJsonLabels";
import { Geographies } from "react-simple-maps";
import useMapHovered from "../hooks/useMapHovered";
import useMapSelected from "../hooks/useMapSelected";

import { withStyles } from "@material-ui/styles";

const styles = {
  root: {},
};

const GeoJsonLayer = ({
  classes,
  className,
  source,
  interactive = false,
  showLabels = false,
  metadata,
  metaDataSelector,
  labelSelector,
  labelProps,
  shapeProps,
  onHover,
  onSelect,
  children,
  ...props
}) => {
  const [hovered, setHovered] = useMapHovered();
  const [selected, setSelected] = useMapSelected();
  const handleHover = (geo) => {
    if (!interactive) return;
    setHovered(geo);
    onHover && onHover(geo);
  };
  const handleSelect = (geo) => {
    if (!interactive) return;
    setSelected(geo);
    onSelect && onSelect(geo);
  };
  return (
    <Geographies
      className={clsx("svg-map__geographies", classes.root, className)}
      geography={source}
      {...props}
    >
      {({ geographies }) => (
        <>
          <Shapes
            selected={selected}
            hovered={hovered}
            geographies={geographies}
            onHover={handleHover}
            onSelect={handleSelect}
            {...shapeProps}
          />
          {showLabels && (
            <GeoJsonLabels
              geographies={geographies}
              metadata={metadata}
              metadataSelector={metaDataSelector}
              labelSelector={labelSelector}
              {...labelProps}
            />
          )}
          {children}
        </>
      )}
    </Geographies>
  );
};

GeoJsonLayer.propTypes = {
  classes: PropTypes.object,
  className: PropTypes.string,
  source: PropTypes.string,
  interactive: PropTypes.bool,
  showLabels: PropTypes.bool,
  metadata: PropTypes.array,
  metaDataSelector: PropTypes.func,
  labelProps: PropTypes.object,
  onHover: PropTypes.func,
  onSelect: PropTypes.func,
};

export default withStyles(styles, { name: "HypSvgMapGeoJsonLayer" })(
  GeoJsonLayer
);
