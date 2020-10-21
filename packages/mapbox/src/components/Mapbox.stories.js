import React from 'react';

import Mapbox from './Mapbox';

export default {
  component: Mapbox,
  title: 'Visualization/Mapbox'
};

export const primary = () =>
  <Mapbox
    defaultViewport={{
      zoom: 11,
      latitude: 40.74,
      longitude: -73.96,
    }}
    {...props}
  />;
