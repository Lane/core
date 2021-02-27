import React from "react";
import PropTypes from "prop-types";

/**
 * Shows a discrete number of colors, with an optional distribution of colors.
 */
const DiscreteColorScale = ({
  colors,
  distribution,
  width,
  height,
  vertical,
  style,
  ...props
}) => {
  const styleOverrides = style || {};
  let pos = 0;
  return (
    <svg
      viewBox={`0 0 ${vertical ? 1 : 100} ${vertical ? 100 : 1}`}
      style={{
        display: "block",
        shapeRendering: "crispEdges",
        width: width,
        height: height,
        ...styleOverrides,
      }}
      preserveAspectRatio="none"
      {...props}
    >
      {colors.map((c, i) => {
        const colorSize = distribution
          ? (isNaN(Number(distribution[i])) ? 0 : Number(distribution[i])) * 100
          : (1 / colors.length) * 100;
        const colorPos = pos;
        pos = colorPos + colorSize;
        return (
          <rect
            key={i}
            x={vertical ? 0 : colorPos}
            y={vertical ? colorPos : 0}
            width={vertical ? 1 : colorSize}
            height={vertical ? colorSize : 1}
            fill={c}
          />
        );
      })}
    </svg>
  );
};

DiscreteColorScale.defaultProps = {
  colors: ["#333", "#555", "#777", "#999", "#bbb"],
  width: "100%",
  height: 24,
  vertical: false,
};

DiscreteColorScale.propTypes = {
  /** array of colors to use in the scale (e.g. ["#f00", "#0f0", "#00f"]) */
  colors: PropTypes.arrayOf(PropTypes.string),
  /** array of the color distributions.  should be same length as `colors` and sum to 1. (e.g. [0.2, 0.6, 0.2]) */
  distribution: PropTypes.arrayOf(PropTypes.number),
  /** width of color scale */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** height of color scale */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** show vertical color scale when true  */
  vertical: PropTypes.bool,
};

export default DiscreteColorScale;
