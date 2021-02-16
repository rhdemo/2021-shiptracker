import * as React from 'react';
import { Marker } from '@react-google-maps/api';
import { PortType } from './types';
import { getPortImage } from '../utilities/mapUtils';
import ReadonlyIcon = google.maps.ReadonlyIcon;

interface MapPortProps {
  port: PortType;
}

const Port: React.FC<MapPortProps> = ({ port }) => {
  const initializeMarker = (newMarker) => {
    const icon: ReadonlyIcon = {
      url: getPortImage(port.name),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(29.33, 44),
      scaledSize: new google.maps.Size(60, 60),
    };
    newMarker.setIcon(icon);
  };

  return (
    <Marker
      position={{ lat: port.latitude, lng: port.longitude }}
      draggable={false}
      onLoad={initializeMarker}
      title={port.name}
    />
  );
};

export default React.memo(Port);
