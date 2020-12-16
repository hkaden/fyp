import React, { useState } from 'react';
import { Marker } from 'react-google-maps';
import HotelInfoWindow from './MapInfoWindow';
import MakerImage from './hotelMapMarker.png';

const SingleMapDisplay = ({ location }) => {
  let hotelData = [];
  const [isOpen, setIsOpen] = useState(false);
  const [markerIndex, setMarkerIndex] = useState(0);

  const infoWindowToggle = (index) => {
    setIsOpen(!isOpen);
    setMarkerIndex(index);
  };

  hotelData.push({
    lat: Number.parseFloat(location.lat),
    lng: Number.parseFloat(location.lng),
    id: location.id,
    title: location.title,
    thumbUrl: location.gallery,
    formattedAddress: location.location,
    price: location.price,
    //rating: location?.location.rating,
    //ratingCount: location?.ratingCount,
  });

  return hotelData.map((singlePostLoaction, index) => {
    return (
      <Marker
        key={index}

        position={singlePostLoaction}
        onClick={() => {
          infoWindowToggle(singlePostLoaction.id);
        }}
      >
        {isOpen && markerIndex === singlePostLoaction.id ? (
          <HotelInfoWindow
            data={singlePostLoaction}
            onCloseClick={() => {
              infoWindowToggle(singlePostLoaction.id);
            }}
          />
        ) : (
          ''
        )}
      </Marker>
    );
  });
};

const HotelMapMarkerSingle = (props) => {
  return <SingleMapDisplay {...props} />;
};

export default HotelMapMarkerSingle;
