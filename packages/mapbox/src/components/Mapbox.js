import React, { useEffect, useMemo, useCallback } from "react";
import useResizeAware from "react-resize-aware";
import ReactMapGL from "react-map-gl";
import PropTypes from "prop-types";
import { getClosest } from "../utils";
import { useMapStore, useMapViewport } from "../hooks";
import shallow from "zustand/shallow";
import useCombinedRefs from "../hooks/useCombinedRefs";

/**
 * A component for rendering an interactive Mapbox map based off of [ReactMapGL](https://github.com/visgl/react-map-gl)
 *
 * To use this component add it to your project
 *
 * ```
 * npm install @hyperobjekt/mapbox
 * ```
 * or
 * ```
 * yarn add @hyperobjekt/mapbox
 * ```
 *
 * Then import it into your project with:
 *
 * ```
 * import Mapbox from "@hyperobjekt/mapbox"
 * ```
 */
const Mapbox = React.forwardRef(
  (
    {
      mapStyle,
      style: styleOverrides,
      children,
      defaultViewport,
      maxBounds,
      minZoom,
      ariaLabel,
      MapGLProps,
      onHover,
      onClick,
      onLoad,
      ...rest
    },
    ref
  ) => {
    // loaded value and setter
    const [loaded, setLoaded] = useMapStore(
      (state) => [state.loaded, state.setLoaded],
      shallow
    );

    // hovered feature and setter
    const [hoveredFeature, setHoveredFeature] = useMapStore(
      (state) => [state.hoveredFeature, state.setHoveredFeature],
      shallow
    );

    // resize listener for map size
    const [resizeListener, sizes] = useResizeAware();

    // get map viewport and setter from store
    const [viewport, setViewport] = useMapViewport();

    // function to set the reset viewport
    const setResetViewport = useMapStore((state) => state.setResetViewport);

    // get the map instance from the ref
    const innerRef = React.useRef(null);
    const combinedRef = useCombinedRefs(ref, innerRef);
    const currentMap = useMemo(
      () =>
        combinedRef.current &&
        combinedRef.current.getMap &&
        combinedRef.current.getMap(),
      [combinedRef.current]
    );

    // canvas element
    const canvas = currentMap && currentMap.getCanvas();

    // handler for map load
    const handleLoad = (e) => {
      if (!loaded) {
        setLoaded(true);
        // HACK: remove tabindex from map div
        const tabindexEl = document.querySelector(".map:first-child");
        if (tabindexEl) {
          tabindexEl.children[0].removeAttribute("tabindex");
        }
        // add screen reader content for map
        if (canvas) {
          canvas.setAttribute("role", "img");
          canvas.setAttribute("aria-label", ariaLabel);
        }
        // trigger load callback
        onLoad && onLoad(e);
      }
    };

    // handler for viewport change
    const handleViewportChange = useCallback(
      (vp) => {
        if (!loaded) return;
        if (vp.zoom && vp.zoom < minZoom) vp.zoom = minZoom;
        // Patch in support for Mapbox GL viewport.maxBounds, https://github.com/visgl/react-map-gl/issues/442
        if (!!maxBounds && maxBounds.length > 0) {
          if (vp.longitude < maxBounds[0][0]) {
            vp.longitude = maxBounds[0][0];
          }
          if (vp.longitude > maxBounds[1][0]) {
            vp.longitude = maxBounds[1][0];
          }
          if (vp.latitude < maxBounds[0][1]) {
            vp.latitude = maxBounds[0][1];
          }
          if (vp.latitude > maxBounds[1][1]) {
            vp.latitude = maxBounds[1][1];
          }
        }
        setViewport(vp);
      },
      [setViewport, maxBounds, minZoom, loaded]
    );

    // handler for feature hover
    const handleHover = ({ features, point, srcEvent }) => {
      const newHoveredFeature =
        features && features.length > 0 ? features[0] : null;
      setHoveredFeature(newHoveredFeature);
      onHover && onHover(newHoveredFeature, { features, point, srcEvent });
    };

    // handler for feature click
    const handleClick = ({ features, srcEvent, ...rest }) => {
      // was the click on a control
      const isControl = getClosest(srcEvent.target, ".mapboxgl-ctrl-group");
      // activate feature if one was clicked and this isn't a control click
      features &&
        features.length > 0 &&
        !isControl &&
        onClick &&
        onClick(features[0], { features, srcEvent, ...rest });
    };

    // set the aria label on the canvas element
    useEffect(() => {
      if (canvas) {
        canvas.setAttribute("aria-label", ariaLabel);
      }
    }, [ariaLabel, canvas]);

    // set the default / reset viewport when it changes
    useEffect(() => {
      defaultViewport && setResetViewport({ ...defaultViewport });
    }, [defaultViewport, setResetViewport]);

    // set the map dimensions when the size changes
    useEffect(() => {
      setViewport({
        width: sizes.width,
        height: sizes.height,
      });
    }, [sizes, setViewport]);

    // TODO: set hovered outline when hoveredFeatureId changes
    // useEffect(() => {
    //   prev &&
    //     prev.hoveredFeature &&
    //     setFeatureState(prev.hoveredFeature, {
    //       hover: false
    //     })
    //   hoveredFeature && setFeatureState(hoveredFeature.id, { hover: true })
    // }, [hoveredFeature]);

    return (
      <div
        id="map"
        className="map"
        style={{
          position: "relative",
          width: "100%",
          minHeight: 400,
          ...styleOverrides,
        }}
        onMouseLeave={(e) =>
          handleHover({
            features: null,
            point: [null, null],
            srcEvent: e,
          })
        }
        {...rest}
      >
        {resizeListener}
        <ReactMapGL
          ref={combinedRef}
          mapStyle={mapStyle}
          dragRotate={false}
          touchRotate={false}
          dragPan={true}
          touchZoom={true}
          onViewportChange={handleViewportChange}
          onHover={handleHover}
          onClick={handleClick}
          onLoad={handleLoad}
          {...viewport}
          {...MapGLProps}
        >
          {children}
        </ReactMapGL>
      </div>
    );
  }
);

Mapbox.defaultProps = {
  style: {},
  mapStyle: "mapbox://styles/hyperobjekt/cke1roqr302yq19jnlpc8dgr9",
  MapGLProps: {},
  minZoom: 2,
  ariaLabel: "map",
  onHover: () => {},
  onClick: () => {},
  onLoad: () => {},
};

Mapbox.propTypes = {
  /** style overrides for the map container */
  style: PropTypes.object,
  /** URL to the mapbox style */
  mapStyle: PropTypes.string,
  /** props to pass to the ReactMapGL component  */
  MapGLProps: PropTypes.object,
  /** handler for when an interactive feature layer is hovered */
  onHover: PropTypes.func,
  /** handler for when an interactive feature is clicked */
  onClick: PropTypes.func,
  /** handler for when the map loads */
  onLoad: PropTypes.func,
  children: PropTypes.node,
};

export default Mapbox;
