# Components

## `<Mapbox />`

### Props

- `defaultViewport`: object containing `zoom`, `latitude`, and `longitude` properties that define the default / reset viewport
- `mapStyle`: mapbox stlye string or map style JSON
- `children`: any children (e.g. legend)
- `ariaLabel`: label for map that is read by screen readers
- `onHover`: handler function for hovering over a feature
- `onClick`: handler function for clicking on a feature
- `onLoad`: handler function for when the map has loaded
- `MapGLProps`: an object of props to be passed through to the ReactMapGL component (ie. Mapbox API access token)
- `maxBounds`: form of a [Mapbox LngLatBoundsLike](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike) array of arrays, `[[lng,lat], [lng,lat]]`.

Any additional props are passed on to the [ReactMapGL Interactive Map](https://visgl.github.io/react-map-gl/docs/api-reference/interactive-map)

### Example

**A map centered on New York City**

```js
const CustomMap = (props) => (
  <Mapbox
    defaultViewport={{
      zoom: 11,
      latitude: 40.74,
      longitude: -73.96,
    }}
    {...props}
  />
);
```

### Setting Map Bounds

Use the `maxBounds` prop in the form of a [Mapbox LngLatBoundsLike](https://docs.mapbox.com/mapbox-gl-js/api/geography/#lnglatboundslike) array of arrays, `[[lng,lat], [lng,lat]]`.

```js
const BoundMap = (props) => (
  <Mapbox
    defaultViewport={{
      zoom: 11,
      latitude: 40.74,
      longitude: -73.96,
    }}
    maxBounds={[
      [-107.6, 33.8],
      [-65, 49.9],
    ]}
    {...props}
  />
);
```

### Getting the ReactMapGL ref

The component forwards the ref to ReactMapGL ref, so you can get the mapboxgl map for advanced usage.

```js
const AdvancedMap = (props) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (mapRef.current) {
      // gives you access to StaticMap methods from ReactMapGL
      // https://visgl.github.io/react-map-gl/docs/api-reference/static-map#methods
      const map = mapRef.current.getMap()
      // do something with the map
    }

  }, [mapRef.current])

  return (
    <Mapbox
      ref={mapRef}
      {...props}
    >
  )
}
```

# Hooks

A collection of hooks are provided to allow access to map viewport information and manipulation.

## useMapViewport()

Provides map viewport value and setter

```js
const [viewport, setViewport] = useMapViewport();
```

Viewport value looks like:

```js
{
  width: 400,
  height: 400,
  latitude: 37.7577,
  longitude: -122.4376,
  zoom: 8
}
```

## useMapSize()

Provides pixel dimensions of the map viewport

```js
const [width, height] = useMapSize();
```

## useFlyToState()

Provides a function that will fly the map to a state when given a fips code.

```js
const flyToState = useFlyToState();
flyToState("06");
```

## useFlyToFeature()

Provides a function that will fly the map to a GeoJSON feature

```js
const flyToFeature = useFlyToFeature();
flyToFeature(feature);
```

## useFlyToLatLon()

Provides a function that will fly the map to a provided latitude, longitude, and zoom;

```js
const flyToLatLon = useFlyToLatLon();
flyToLatLon(37, -122, 8);
```

## useFlyToReset()

Provides a function that flies the viewport back to the default viewport (set on the `<MapBase />` component with `defaultViewport` prop).

```js
const flyToReset = useFlyToReset();
flyToReset();
```

## useMapStore()

This is the store where all the other hooks pull from. You can access parts of the other hooks from this one. Helpful if you want to be able to access a setter but avoid re-renders, for example, with `useMapViewport()`.

The following can be retrieved from the store:

```js
const setViewport = useMapStore((state) => state.setViewport);
```

- `loaded`: true or false, depending on if the map is loaded or not
- `setLoaded`: setter for loaded state
- `resetViewport`: the default viewport object
- `setResetViewport`: setter for reset viewport
- `viewport`: the current viewport object
- `setViewport`: setter for current viewport
- `hoveredFeature`: the currently hovered feature (if any)
- `setHoveredFeature`: setter for hovered feature
