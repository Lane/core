import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { getStatesArray } from "@hyperobjekt/us-states";

import { withStyles } from "@material-ui/styles";
import GeoJsonLayer from "../GeoJsonLayer";

/**
 * URL to state level GeoJSON
 */
const geoUrl = "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json";

/**
 * offsets for states
 */
const stateOffsets = {
  VT: [50, -8],
  NH: [34, 2],
  MA: [30, -1],
  RI: [28, 2],
  CT: [35, 10],
  NJ: [34, 1],
  DE: [33, 0],
  MD: [47, 10],
  DC: [49, 21],
};

/**
 * associated state level metadata
 */
const stateMetadata = getStatesArray().map((s) => ({
  id: s.id,
  val: s.abbr,
  offset: stateOffsets[s.abbr],
}));

/**
 * thunk that takes the geography, then returns a selector function
 * to match the related metadata
 */
const stateMetadataSelector = (geo) => (data) => data.id === geo.id;

/**
 * selector function to get the state label
 */
const stateLabelSelector = (d) => d && d.val;

const styles = {
  root: {},
  shape: {},
  hovered: {},
  selected: {},
  label: {},
  marker: {},
  annotation: {},
  text: {},
};

/**
 * Renders US state level shapes
 */
const StateLayer = ({
  classes,
  className,
  shapeProps,
  labelProps,
  ...props
}) => {
  return (
    <GeoJsonLayer
      className={clsx(classes.root, className)}
      source={geoUrl}
      metadata={stateMetadata}
      metaDataSelector={stateMetadataSelector}
      labelSelector={stateLabelSelector}
      shapeProps={{
        classes: {
          shape: classes.shape,
          hovered: classes.hovered,
          selected: classes.selected,
        },
        ...shapeProps,
      }}
      labelProps={{
        classes: {
          label: classes.label,
          marker: classes.marker,
          annotation: classes.annotation,
          text: classes.text,
        },
        ...labelProps,
      }}
      {...props}
    />
  );
};

StateLayer.propTypes = {
  labelProps: {},
  shapeProps: {},
};

StateLayer.propTypes = GeoJsonLayer.propTypes;

/** add the display name */
const exportComponent = withStyles(styles, { name: "HypStateLayer" })(
  StateLayer
);
exportComponent.displayName = "StateLayer";
export default exportComponent;
