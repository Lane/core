import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/styles";

const styles = (theme) => ({
  root: {
    background: "#f00",
  },
});

/**
 * # Quantize Legend
 *
 * TODO: write usage examples
 */
const QuantizeLegend = ({ label, ...props }) => {
  return <div>Quantize {label}</div>;
};

QuantizeLegend.propTypes = {
  /** Label for the legend metric */
  label: PropTypes.string,
  /** Secondary label for the legend */
  secondary: PropTypes.string,
  /** Data to build the legend off of */
  data: PropTypes.array,
  /** Formatter function for legend ticks */
  tickFormatter: PropTypes.func,
  /** Data item for current value */
  value: PropTypes.object,
  /** Formatter function to create label from selected value */
  valueFormatter: PropTypes.func,
};

export default withStyles(styles)(QuantizeLegend);
