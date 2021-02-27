import { select } from "d3-selection";
import clsx from "clsx";
import { withStyles } from "@material-ui/core";
const styles = (theme) => ({
  root: {
    marginLeft: -12,
    width: `calc(100% + 24px)`,
  },
  axis: {
    "& .domain": {
      color: "transparent",
    },
    "& .tick line": {
      stroke: "#ccc",
    },
    "& .tick text": {
      color: "#777",
      fontFamily: theme.typography.fontFamily,
      fontSize: theme.typography.pxToRem(11),
    },
  },
});

const Ticks = ({
  classes,
  className,
  axisCreator,
  width = 368,
  height,
  ...props
}) => {
  if (!axisCreator) return;

  const axisRef = (axis) => {
    axis && axisCreator(select(axis));
  };

  return (
    <svg
      className={clsx(classes.root, className)}
      viewBox={[0, 0, width + 24, 20]}
      {...props}
    >
      <g transform="translate(12 0)" className={classes.axis} ref={axisRef}></g>
    </svg>
  );
};

export default withStyles(styles)(Ticks);
