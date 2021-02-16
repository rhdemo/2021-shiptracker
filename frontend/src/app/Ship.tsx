import * as React from 'react';
import { Marker, InfoWindow } from '@react-google-maps/api';
import ShipImageEast from '../images/ship-east.svg';
import ShipImageWest from '../images/ship-west.svg';
import { ShippingType } from './types';
import { directionEast } from '../utilities/mapUtils';

interface ShipProps {
  shipment: ShippingType;
  location?: google.maps.LatLng;
}

const Ship: React.FC<ShipProps> = ({ shipment, location }) => {
  const [marker, setMarker] = React.useState<google.maps.Marker>();
  const [isOpen, setIsOpen] = React.useState<boolean>(false);
  const infoWindowOptions = {
    disableAutoPan: true,
    pixelOffset: new google.maps.Size(0, 10),
  };

  const headEast = React.useCallback(() => {
    if (shipment.startPort && shipment.endPort) {
      return directionEast(shipment.startPort.longitude, shipment.endPort.longitude);
    }
    return true;
  }, [shipment]);

  const initializeMarker = (newMarker) => {
    const icon = {
      url: headEast() ? ShipImageEast : ShipImageWest,
      anchor: new google.maps.Point(25, 33),
      scaledSize: new google.maps.Size(50, 50),
    };
    newMarker.setIcon(icon);
    setMarker(newMarker);
  };

  React.useEffect(() => {
    if (marker) {
      const icon = {
        url: headEast() ? ShipImageEast : ShipImageWest,
        anchor: new google.maps.Point(25, 33),
        scaledSize: new google.maps.Size(50, 50),
      };
      marker.setIcon(icon);
    }
  }, [marker, headEast]);

  return (
    <Marker
      position={
        location ||
        new google.maps.LatLng(shipment.startPort.latitude, shipment.startPort.longitude)
      }
      draggable={false}
      onLoad={initializeMarker}
      title={shipment.ship.name}
      onClick={() => setIsOpen(!isOpen)}
    >
      {marker && isOpen ? (
        <InfoWindow anchor={marker} options={infoWindowOptions}>
          <div className="csd-shipping__ship-info" onClick={() => setIsOpen(false)}>
            <div>
              <span className="csd-shipping__ship-info__category">Origin:</span>
              {shipment.startPort.name}
            </div>
            <div>
              <span className="csd-shipping__ship-info__category">Destination:</span>
              {shipment.endPort.name}
            </div>
            <div>{shipment.travelTime}</div>
          </div>
        </InfoWindow>
      ) : null}
    </Marker>
  );
};

export default React.memo(Ship);
