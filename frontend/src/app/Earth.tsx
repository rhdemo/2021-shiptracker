import * as React from 'react';
import { GoogleMap, useJsApiLoader } from '@react-google-maps/api';
import { Libraries } from '@react-google-maps/api/dist/utils/make-load-script-url';
import { ShippingType } from './types';
import Shipment from './Shipment';
import { googleMapsApiKey } from '../utilities/const';

interface MapContainerProps {
  lat: number;
  lng: number;
  zoom: number;
  arcDistMultiplier: number;
  geodesic: boolean;
  shipments?: ShippingType[];
  onMapFocus: () => void;
}

const GoogleLibs: Libraries = ['geometry'];

const Earth: React.FC<MapContainerProps> = ({
  lat,
  lng,
  zoom,
  shipments,
  onMapFocus,
  arcDistMultiplier,
  geodesic,
}) => {
  const [center, setCenter] = React.useState<{ lat: number; lng: number }>({ lat, lng });
  const [map, setMap] = React.useState(null);

  const onLoad = React.useCallback((gMap) => {
    setMap(gMap);
  }, []);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: googleMapsApiKey,
    libraries: GoogleLibs,
  });

  React.useEffect(() => {
    if (isLoaded) {
      setCenter({ lat, lng });
    }
  }, [isLoaded, lat, lng]);

  const mapStyles: React.CSSProperties = {
    height: '100%',
    width: '100%',
    position: 'absolute',
    top: 0,
  };

  const mapOptions: google.maps.MapOptions = {
    scrollwheel: false,
    draggable: false,
    disableDefaultUI: true,
    panControl: false,
    keyboardShortcuts: false,
    gestureHandling: 'none',
    zoom: zoom,
    noClear: true,
    styles: [
      {
        elementType: 'labels',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.land_parcel',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative.neighborhood',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'administrative',
        elementType: 'geometry',
        stylers: [{ visibility: 'off' }],
      },
      {
        featureType: 'water',
        elementType: 'all',
        stylers: [{ color: '#00ccff' }],
      },
      {
        featureType: 'landscape',
        elementType: 'all',
        stylers: [{ color: '#609907' }],
      },
    ],
  };

  return (
    <div className="csd-shipping__earth" onFocus={onMapFocus}>
      {isLoaded && (
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={zoom}
          center={center}
          options={mapOptions}
          onLoad={onLoad}
        >
          {shipments?.length
            ? shipments.map((shipment) => (
                <Shipment
                  key={shipment.id}
                  shipment={shipment}
                  map={map}
                  arcDistMultiplier={arcDistMultiplier}
                  geodesic={geodesic}
                />
              ))
            : null}
        </GoogleMap>
      )}
    </div>
  );
};

export default React.memo(Earth);
