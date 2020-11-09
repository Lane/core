import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import { geoCentroid } from "d3-geo";
import { Marker, Annotation } from "react-simple-maps";
import { withStyles } from "@material-ui/styles";

const styles = {
  root: { pointerEvents: "none" },
  label: {},
  marker: {},
  annotation: {
    "& path": {
      stroke: "#ccc",
    },
  },
  text: {
    fontSize: 14,
    fontFamily: "sans-serif",
    fill: "#ccc",
  },
};

function GeoJsonLabels({
  geographies = [],
  classes,
  className,
  metadata,
  metadataSelector,
  labelSelector = (d) => d && d.id,
  offsetSelector = (d) => d && d.offset,
  ...props
}) {
  return (
    <g className={clsx("svg-map__labels", classes.root, className)} {...props}>
      {geographies.map((geo) => {
        const centroid = geoCentroid(geo);
        const selector = metadata && metadataSelector && metadataSelector(geo);
        const cur = selector ? metadata.find(selector) : geo;
        const offset = offsetSelector(cur);
        const label = labelSelector(cur);
        const valid = cur && centroid[0] > -160 && centroid[0] < -67;
        return (
          <g
            key={geo.rsmKey + "-name"}
            className={clsx("svg-map__label", classes.label)}
          >
            {valid &&
              (!offset ? (
                <Marker
                  className={clsx("svg-map__marker", classes.marker)}
                  coordinates={centroid}
                >
                  <text
                    className={clsx("svg-map__text", classes.text)}
                    y="2"
                    textAnchor="middle"
                  >
                    {label}
                  </text>
                </Marker>
              ) : (
                <Annotation
                  subject={centroid}
                  dx={offset[0]}
                  dy={offset[1]}
                  className={clsx("svg-map__annotation", classes.annotation)}
                >
                  <text
                    className={clsx("svg-map__text", classes.text)}
                    x={4}
                    alignmentBaseline="middle"
                  >
                    {label}
                  </text>
                </Annotation>
              ))}
          </g>
        );
      })}
    </g>
  );
}

GeoJsonLabels.propTypes = {
  geographies: PropTypes.array,
  classes: PropTypes.object,
  className: PropTypes.string,
  metadata: PropTypes.array,
  metadataSelector: PropTypes.func,
  labelSelector: PropTypes.func,
  offsetSelector: PropTypes.func,
};

export default withStyles(styles, { name: "HypSvgMapGeoJsonLabels" })(
  GeoJsonLabels
);
