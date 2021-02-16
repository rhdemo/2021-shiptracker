import * as React from 'react';
import * as _ from 'lodash';
import '@patternfly/react-core/dist/styles/base.css';
import Earth from './Earth';
import Cloud1 from '../images/cloud-1.svg';
import Cloud2 from '../images/cloud-2.svg';
import Sun from '../images/sun.svg';
import ShadowClip from './ShadowClip';
import { fetchShipping } from '../services/shippingService';
import { ShippingType } from './types';
import { POLL_MS } from '../utilities/const';
import {
  ATLANTIC_LOCATION,
  ATLANTIC_REGION,
  getPortRegion,
  PACIFIC_LOCATION,
  PACIFIC_REGION,
} from '../utilities/mapUtils';

import './App.scss';

const ZOOM_CHANGE_VALUE = 0.01;
let POSITION_CHANGE_VALUE = 5;

const App: React.FC = () => {
  const [location, setLocation] = React.useState<{ latitude: number; longitude: number }>(
    ATLANTIC_LOCATION,
  );
  const [endLocation, setEndLocation] = React.useState<{ latitude: number; longitude: number }>(
    ATLANTIC_LOCATION,
  );
  const [region, setRegion] = React.useState<string>(ATLANTIC_REGION);
  const [zoom, setZoom] = React.useState<number>(2.59);
  const [arcDistMultiplier, setArcDistMultiplier] = React.useState<number>(0.2);
  const [geodesic, setGeodesic] = React.useState<boolean>(true);
  const [shipping, setShipping] = React.useState<ShippingType[]>([]);
  const focusRef = React.useRef<HTMLInputElement | null>(null);
  const countdownInProgress = React.useRef<boolean>(false);
  const shiftCount = React.useRef<number>(0);
  const modMode = React.useRef<boolean>(false);

  const startCountdown = React.useCallback(() => {
    countdownInProgress.current = true;
    shiftCount.current = 1;
    setTimeout(() => {
      shiftCount.current = 0;
      countdownInProgress.current = false;
    }, 1000);
  }, []);

  React.useEffect(() => {
    let handle;
    const watchShipping = () => {
      fetchShipping()
        .then((updatedShipping: ShippingType[]) => {
          setShipping((prevShipping): ShippingType[] => {
            if (!_.isEqual(updatedShipping, prevShipping)) {
              return updatedShipping;
            }
            return prevShipping;
          });
        })
        .finally(() => {
          setTimeout(() => watchShipping(), POLL_MS);
        });
    };
    watchShipping();

    return () => clearTimeout(handle);
  }, []);

  React.useEffect(() => {
    if (
      location.latitude === endLocation.latitude &&
      location.longitude === endLocation.longitude
    ) {
      return;
    }

    const updatedLocation = { ...endLocation };
    if (location.latitude > endLocation.latitude) {
      updatedLocation.latitude = Math.max(
        location.latitude - POSITION_CHANGE_VALUE,
        endLocation.latitude,
      );
    } else {
      updatedLocation.latitude = Math.min(
        location.latitude + POSITION_CHANGE_VALUE,
        endLocation.latitude,
      );
    }
    if (location.longitude > endLocation.longitude) {
      updatedLocation.longitude = Math.max(
        location.longitude - POSITION_CHANGE_VALUE,
        endLocation.longitude,
      );
    } else {
      updatedLocation.longitude = location.longitude + POSITION_CHANGE_VALUE;
      updatedLocation.longitude = Math.min(
        location.longitude + POSITION_CHANGE_VALUE,
        endLocation.longitude,
      );
    }
    const handle = setTimeout(() => {
      setLocation(updatedLocation);
    }, 10);
    return () => {
      clearTimeout(handle);
    };
  }, [location, endLocation]);

  const handleKeyPress = (e) => {
    if (e.key === 'ArrowLeft') {
      setEndLocation({
        latitude: location.latitude,
        longitude: location.longitude - POSITION_CHANGE_VALUE * 2,
      });
    }
    if (e.key === 'ArrowRight') {
      setEndLocation({
        latitude: location.latitude,
        longitude: location.longitude + POSITION_CHANGE_VALUE * 2,
      });
    }
    if (e.key === 'Enter' || e.key === ' ') {
      setEndLocation(region === ATLANTIC_REGION ? PACIFIC_LOCATION : ATLANTIC_LOCATION);
      setRegion(region === ATLANTIC_REGION ? PACIFIC_REGION : ATLANTIC_REGION);
    }

    if (e.key === 'Shift') {
      if (!countdownInProgress.current) {
        startCountdown();
        return;
      }
      shiftCount.current++;
      if (shiftCount.current === 3) {
        modMode.current = !modMode.current;
        console.warn(`Navigation Dev Mode: ${modMode.current}`);
      }
      return;
    }
    if (!modMode.current) {
      return;
    }

    if (e.key === '+') {
      setZoom(zoom + ZOOM_CHANGE_VALUE);
    }
    if (e.key === '-') {
      setZoom(zoom - ZOOM_CHANGE_VALUE);
    }

    if (e.key === 'ArrowUp') {
      setEndLocation({
        latitude: location.latitude + POSITION_CHANGE_VALUE * 2,
        longitude: location.longitude,
      });
    }
    if (e.key === 'ArrowDown') {
      setEndLocation({
        latitude: location.latitude - POSITION_CHANGE_VALUE * 2,
        longitude: location.longitude,
      });
    }

    if (e.key === '*') {
      POSITION_CHANGE_VALUE = Math.min(POSITION_CHANGE_VALUE + 0.2, 10);
    }
    if (e.key === '/') {
      POSITION_CHANGE_VALUE = Math.max(POSITION_CHANGE_VALUE - 0.2, 0);
    }

    if (e.key === '(') {
      setArcDistMultiplier(arcDistMultiplier + 0.01);
    }
    if (e.key === ')') {
      setArcDistMultiplier(arcDistMultiplier - 0.01);
    }
    if (e.key === '^') {
      if (geodesic) {
        setGeodesic(false);
        return;
      }
      setArcDistMultiplier(arcDistMultiplier * -1);
    }
    if (e.key === 'v') {
      setGeodesic(true);
    }
  };

  const onMapFocus = () => {
    focusRef.current && (focusRef.current as HTMLElement).focus();
  };

  return (
    <div className="csd-shipping" onClick={onMapFocus}>
      <input
        className="csd-shipping__map-control"
        type="text"
        onKeyDown={handleKeyPress}
        autoFocus={true}
        onBlur={onMapFocus}
        ref={focusRef}
      />
      <div className="csd-shipping__atmosphere">
        <div className="csd-shipping__atmospheric-object csd-shipping__cloud-1">
          <img src={Cloud1} alt="Cloud 1" />
        </div>
        <div className="csd-shipping__atmospheric-object csd-shipping__cloud-2">
          <img src={Cloud2} alt="Cloud 2" />
        </div>
        <ShadowClip />
        <Earth
          onMapFocus={onMapFocus}
          lat={location.latitude}
          lng={location.longitude}
          zoom={zoom}
          shipments={shipping.filter((s) => getPortRegion(s.startPort.name) === region)}
          arcDistMultiplier={arcDistMultiplier}
          geodesic={geodesic}
        />
      </div>
      <div className="csd-shipping__atmospheric-object csd-shipping__sun">
        <img src={Sun} alt="sun" />
      </div>
    </div>
  );
};

export default App;
