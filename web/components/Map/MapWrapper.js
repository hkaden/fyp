import React from 'react';
import { withScriptjs, withGoogleMap, GoogleMap } from 'react-google-maps';

const Map = withScriptjs(
  withGoogleMap((props) => <GoogleMap {...props}>{props.children}</GoogleMap>)
);

const MapWrapper = (props) => {
  return (
    <Map
      googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyDoDHlIuYTuEx43rW8sHWDT6wk1I_eWQkA&libraries=geometry,drawing,places`}
      loadingElement={<div style={{ height: `100%` }} />}
      {...props}
    >
      {props.children}
    </Map>
  );
};

export default MapWrapper;
