import React, { useEffect, useMemo, useRef } from "react";
import PropTypes from "prop-types";
import { interpolate } from "d3-interpolate";
import { rgb } from "d3-color";

const drawGradient = (width, cxt, color) => {
  // map distribution to values between 0 and 1
  // [0.25, 0.25, 0.25, 0.25] => [0, 0.25, 0.5, 0.75, 1] => [0, 0.3333, 0.6666, 1]
  let dist = [0.25, 0.25, 0.25, 0.25];
  // step1: [0.25, 0.25, 0.25, 0.25] => [0, 0.25, 0.5, 0.75, 1]
  let step1 = [0];
  for (let i = 0; i < dist.length; i++) {
    step1.push(dist[i] + step1[i]);
  }
  console.log(step1);

  // step2: [0, 0.25, 0.5, 0.75, 1] => [0, 0.3333, 0.6666, 1]
  // pull first and last, then get midpoints between remaining
  let step2 = step1.reduce((result, current, i, original) => {
    if (i === 0) {
      result.push(current);
    } else {
      if (original[i + 1]) {
        result.push((original[i] + original[i + 1]) / 2);
      }
    }
    return result;
  }, []);
  console.log(step2);

  const min = Math.min(...values);
  const max = Math.max(...values);
  const step = (max - min) / steps;
  const maxGradientWidth = width;
  let gradientStepWidth = Math.floor(
    maxGradientWidth / ((max - min) / step + 1)
  ); // pixels
  if (gradientStepWidth < 1) gradientStepWidth = 1;
  const gradientWidth = ((max - min) / step + 1) * gradientStepWidth;
  const gradientHeight = 30;
  const xPos = scaleLinear().domain([min, max]).range([0, width]);
  for (let i = min; i <= max; i += step) {
    cxt.fillStyle = color(i);
    cxt.fillRect(xPos(i), 0, gradientStepWidth + 0, gradientHeight);
  }
  return cxt.canvas;
};

const ContinuousColorScale = ({
  colors,
  distribution,
  points,
  width,
  height,
  vertical,
  ...props
}) => {
  const canvasRef = useRef(null);
  console.log(colors);

  // get all of the colors for the number of points
  const colorArray = useMemo(() => {
    if (!colors) return [];
    const color = interpolate(...colors);
    const result = [];
    for (let i = 0; i < points; ++i) {
      console.log(i, i / (points - 1), color(i / (points - 1)));
      result.push(rgb(color(i / (points - 1))).hex());
    }
    // console.log(result);
    return result;
  }, [points, colors]);

  // draw the colors
  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.style.width = width;
    canvas.style.height = height;
    const context = canvas.getContext("2d");
    // drawGradient(points, height, context, color);
    // for (let i = 0; i < points; ++i) {
    //   context.fillStyle = colorArray[i];
    //   context.fillRect(i, 0, 1, 1);
    // }
  }, [width, height, points, colorArray]);

  if (!colors) return null;
  return <canvas width={points} height={1} ref={canvasRef} {...props} />;
};

ContinuousColorScale.defaultProps = {
  colors: ["#333", "#555", "#777", "#999", "#bbb"],
  points: 256,
  width: "100%",
  height: "24px",
  vertical: false,
};

ContinuousColorScale.propTypes = {
  /** array of colors to use in the scale (e.g. ["#f00", "#0f0", "#00f"]) */
  colors: PropTypes.arrayOf(PropTypes.string),
  /** the number of color points to sample */
  points: PropTypes.number,
  /** width of color scale */
  width: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** height of color scale */
  height: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /** show vertical color scale when true  */
  vertical: PropTypes.bool,
};

export default ContinuousColorScale;
