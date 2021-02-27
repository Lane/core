import QuantizeLegend from "./quantize";

/**
 * Gets the appropriate legend for the scale type
 * @param {*} type
 */
const getLegendComponent = (type) => {
  switch (type) {
    case "quantize":
      return QuantizeLegend;
    default:
      return QuantizeLegend;
  }
};

const Legend = ({ type, ...props }) => {
  const Component = getLegendComponent(type);
  return <Component {...props} />;
};

export default Legend;
