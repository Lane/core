import React from "react";
import PropTypes from "prop-types";
import clsx from "clsx";
import SvgMap from "../SvgMap";
import StateLayer from "./StateLayer";
import { withStyles } from "@material-ui/core";

const styles = {};

/**
 * A simple state level map based on `react-simple-maps`.  This map uses @material-ui/styles for theming.
 *
 * any additional props are passed to the [Composable Map Component](https://www.react-simple-maps.io/docs/composable-map/)
 *
 * To override styles use the [Higher-order Component API](https://material-ui.com/styles/basics/#hook-api) or [Hook API](https://material-ui.com/styles/basics/#hook-api)
 *
 * **Higher-order Component API example:**
 *
 *     const StyledStatesMap = withStyles({
 *       hover: { strokeWidth: 4, stroke: "#669" },
 *       hovered: { fill: "#eef" },
 *       shape: { fill: "#ccf", stroke: "#99c" },
 *       text: { fill: "#444" },
 *     })(StateMap);
 *
 * <br />
 *
 * ## Class names
 *
 * These keys can be used to override styles on the map
 *
 * | key          |                                              |
 * |--------------|----------------------------------------------|
 * | `root`       | root of the map                              |
 * | `group`      | group of state layers                        |
 * | `shape`      | individual state shapes                      |
 * | `hovered`    | state shape style when hovered               |
 * | `selected`   | state shape style when selected              |
 * | `hover`      | the hover outline                            |
 * | `label`      | the label container (`<g>`)                    |
 * | `marker`     | marker group for state label                 |
 * | `annotation` | annotation group for state pointer and label |
 * | `text`       | text element with state label                |
 */
const StateMap = ({
  showLabels,
  interactive,
  onHover,
  onSelect,
  layerProps,
  source,
  classes: {
    root: rootClass,
    group: groupClass,
    hover: hoverClass,
    ...remainingClasses
  },
  className,
  ...props
}) => {
  return (
    <SvgMap
      className={clsx(rootClass, className)}
      classes={{ hover: hoverClass }}
      {...props}
    >
      <StateLayer
        className={groupClass}
        classes={remainingClasses}
        source={source}
        onHover={onHover}
        onSelect={onSelect}
        showLabels={showLabels}
        interactive={interactive}
        {...layerProps}
      />
    </SvgMap>
  );
};

StateMap.defaultProps = {
  source: "https://cdn.jsdelivr.net/npm/us-atlas@3/states-10m.json",
  layerProps: {},
  classes: {},
};

StateMap.propTypes = {
  /** URL to geojson source */
  source: PropTypes.string,
  /** show state labels on the map */
  showLabels: PropTypes.bool,
  /** allow hover / click on the state layer */
  interactive: PropTypes.bool,
  /** props to forward to the GeoJsonLayer */
  layerProps: PropTypes.object,
  /** object of class names to use for the component */
  classes: PropTypes.object,
  /** handler for when shape is hovered */
  onHover: PropTypes.func,
  /** handler for when shape is selected */
  onSelect: PropTypes.func,
};

export { StateMap };
const exportComponent = withStyles(styles, { name: "HypStateMap" })(StateMap);
exportComponent.displayName = "StateMap";
export default exportComponent;
