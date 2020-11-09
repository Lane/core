import React from "react";
import clsx from "clsx";
import { geoCentroid } from "d3-geo";
import { Marker, Annotation } from "react-simple-maps";
import { getStatesArray } from "@hyperobjekt/us-states";
import { withStyles } from "@material-ui/core";

const allStates = getStatesArray().map((s) => ({ id: s.abbr, val: s.id }));

const defaultOffsets = {
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

export const styles = {
  root: {},
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

const StateLabels = ({
  geographies,
  offsets = defaultOffsets,
  classes,
  className,
  ...props
}) => {
  return (
    <g className={clsx("svg-map__labels", classes.root, className)} {...props}>
      {geographies.map((geo) => {
        const centroid = geoCentroid(geo);
        const cur = allStates.find((s) => s.val === geo.id);
        return (
          <g
            key={geo.rsmKey + "-name"}
            className={clsx("svg-map__label", classes.label)}
          >
            {cur &&
              centroid[0] > -160 &&
              centroid[0] < -67 &&
              (Object.keys(offsets).indexOf(cur.id) === -1 ? (
                <Marker
                  className={clsx("svg-map__marker", classes.marker)}
                  coordinates={centroid}
                >
                  <text
                    className={clsx("svg-map__text", classes.text)}
                    y="2"
                    textAnchor="middle"
                  >
                    {cur.id}
                  </text>
                </Marker>
              ) : (
                <Annotation
                  subject={centroid}
                  dx={offsets[cur.id][0]}
                  dy={offsets[cur.id][1]}
                  className={clsx("svg-map__annotation", classes.annotation)}
                >
                  <text
                    className={clsx("svg-map__text", classes.text)}
                    x={4}
                    alignmentBaseline="middle"
                  >
                    {cur.id}
                  </text>
                </Annotation>
              ))}
          </g>
        );
      })}
    </g>
  );
};

export default withStyles(styles, { name: "HypStateMapLabels" })(StateLabels);
