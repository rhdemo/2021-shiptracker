import London from '../images/london-port.svg';
import NewYork from '../images/new-york-port.svg';
import Norfolk from '../images/norfolk-port.svg';
import Halifax from '../images/halifax-port.svg';
import ColonCity from '../images/colon-city-port.svg';
import Tangier from '../images/tangier-port.svg';
import Lisbon from '../images/lisbon-port.svg';
import Dakar from '../images/dakar-port.svg';
import SanFrancisco from '../images/sanfran-port.svg';
import Acapulco from '../images/acapulco-port.svg';
import SanLorenzo from '../images/sanlorenzo-port.svg';
import Tokyo from '../images/tokyo-port.svg';
import Taipei from '../images/TAIPEI-port.svg';
import Shangai from '../images/shangai-port.svg';

export const ATLANTIC_REGION = 'Atlantic';
export const PACIFIC_REGION = 'Pacific';
export const ATLANTIC_LOCATION = { latitude: 30, longitude: -38 };
export const PACIFIC_LOCATION = { latitude: 30, longitude: -162 };

const ARC_DIST_MULTIPLIER = 0.2;

export const getPortImage = (portName: string): string => {
  switch (portName) {
    case 'London':
    case 'London Gateway':
      return London;
    case 'New York':
      return NewYork;
    case 'Norfolk':
      return Norfolk;
    case 'Halifax':
      return Halifax;
    case 'Colon City':
      return ColonCity;
    case 'Tangier':
      return Tangier;
    case 'Lisbon':
      return Lisbon;
    case 'Dakar':
      return Dakar;
    case 'San Francisco':
      return SanFrancisco;
    case 'Acapulco':
      return Acapulco;
    case 'San Lorenzo':
      return SanLorenzo;
    case 'Tokyo':
      return Tokyo;
    case 'Taipei':
      return Taipei;
    case 'Shangai':
      return Shangai;
    default:
      return '';
  }
};

export const getPortRegion = (portName: string): string => {
  switch (portName) {
    case 'London':
    case 'London Gateway':
    case 'New York':
    case 'Norfolk':
    case 'Halifax':
    case 'Colon City':
    case 'Tangier':
    case 'Lisbon':
    case 'Dakar':
      return ATLANTIC_REGION;
    case 'San Francisco':
    case 'Acapulco':
    case 'San Lorenzo':
    case 'Tokyo':
    case 'Taipei':
    case 'Shangai':
      return PACIFIC_REGION;
    default:
      return ATLANTIC_REGION;
  }
};

export const directionEast = (startLong: number, endLong: number): boolean => {
  const originLng = startLong + 180;
  const destinationLng = endLong + 180;
  return destinationLng > originLng && Math.abs(destinationLng - originLng) <= 180;
};

export const directionSouth = (startLat: number, endLat: number): boolean => {
  return startLat > endLat;
};

const B1 = function (t) {
  return t * t * t;
};
const B2 = function (t) {
  return 3 * t * t * (1 - t);
};
const B3 = function (t) {
  return 3 * t * (1 - t) * (1 - t);
};
const B4 = function (t) {
  return (1 - t) * (1 - t) * (1 - t);
};

const getBezierPoint = (C1, C2, C3, C4, percent) => {
  return {
    x: C1.x * B1(percent) + C2.x * B2(percent) + C3.x * B3(percent) + C4.x * B4(percent),
    y: C1.y * B1(percent) + C2.y * B2(percent) + C3.y * B3(percent) + C4.y * B4(percent),
  };
};

const convertToPoint = (position: google.maps.LatLng, map: google.maps.Map) => {
  const projection = map?.getProjection();
  const bounds = map?.getBounds();
  if (!projection || !bounds) {
    return null;
  }
  const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
  const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
  const scale = Math.pow(2, map.getZoom());
  const worldPoint = projection.fromLatLngToPoint(position);

  return {
    x: Math.floor((worldPoint.x - bottomLeft.x) * scale),
    y: Math.floor((worldPoint.y - topRight.y) * scale),
  };
};

const convertToLatLng = (point, map) => {
  const projection = map?.getProjection();
  const bounds = map?.getBounds();
  if (!projection || !bounds) {
    return null;
  }
  const topRight = projection.fromLatLngToPoint(bounds.getNorthEast());
  const bottomLeft = projection.fromLatLngToPoint(bounds.getSouthWest());
  const scale = Math.pow(2, map.getZoom());

  const worldPoint = new google.maps.Point(
    point.x / scale + bottomLeft.x,
    point.y / scale + topRight.y,
  );
  return map.getProjection().fromPointToLatLng(worldPoint);
};

const getCurvedPath = (
  startPos: google.maps.LatLng,
  endPos: google.maps.LatLng,
  map: google.maps.Map,
  arcDistMultiplier: number = ARC_DIST_MULTIPLIER,
): google.maps.LatLng[] => {
  const startPoint = convertToPoint(startPos, map);
  const endPoint = convertToPoint(endPos, map);
  if (!startPoint || !endPoint) {
    return [startPos, endPos];
  }

  const xDistance = endPoint.x - startPoint.x;
  const yDistance = endPoint.y - startPoint.y;

  const distance = Math.abs(Math.sqrt(xDistance * xDistance + yDistance * yDistance));
  const midPoint = { x: startPoint.x + xDistance / 2.0, y: startPoint.y + yDistance / 2.0 };
  const arcDist = distance * arcDistMultiplier;

  const angle = Math.atan2(endPoint.y - startPoint.y, endPoint.x - startPoint.x);

  const points = [];

  let t;
  const arcPoint = {
    x: -Math.sin(angle) * arcDist + midPoint.x,
    y: Math.cos(angle) * arcDist + midPoint.y,
  };

  for (t = 0.0; t <= 1; t += 0.01) {
    points.push(getBezierPoint(startPoint, arcPoint, arcPoint, endPoint, t));
  }
  points.push(startPoint);
  points.reverse();

  return points.map((point) => convertToLatLng(point, map));
};

const getGeodesicPath = (
  startPos: google.maps.LatLng,
  endPos: google.maps.LatLng,
): google.maps.LatLng[] => {
  const path: google.maps.LatLng[] = [];
  const distance = google.maps.geometry.spherical.computeDistanceBetween(endPos, startPos);
  const lineHeading = google.maps.geometry.spherical.computeHeading(startPos, endPos);
  const numPoints = 100;
  const increment = distance / numPoints;

  for (let i = 0; i <= numPoints; i++) {
    path.push(google.maps.geometry.spherical.computeOffset(startPos, increment * i, lineHeading));
  }
  return path;
};

export { getCurvedPath, getGeodesicPath };
