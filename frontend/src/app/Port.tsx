import * as React from 'react';
import { Marker } from '@react-google-maps/api';
import { PortType } from './types';
import { getPortImage } from '../utilities/mapUtils';
import ReadonlyIcon = google.maps.ReadonlyIcon;
import DestinationPort from '../images/destination-target.svg';
import OriginPort from '../images/origin-target.svg';

interface MapPortProps {
  port: PortType;
  isDestination?: boolean;
}

const Port: React.FC<MapPortProps> = ({ port, isDestination }) => {
  const initializeMarker = (newMarker) => {
    const portImage = getPortImage(port.name);
    const url = portImage || (isDestination ? DestinationPort : OriginPort);
    const icon: ReadonlyIcon = {
      url,
      origin: new google.maps.Point(0, 0),
      anchor: portImage ? new google.maps.Point(29.33, 44) : new google.maps.Point(10, 10),
      scaledSize: portImage ? new google.maps.Size(60, 60) : new google.maps.Size(15, 15),
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
