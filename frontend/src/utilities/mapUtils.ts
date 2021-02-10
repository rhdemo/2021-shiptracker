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
import Shanghai from '../images/shangai-port.svg';

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
    case 'Shanghai':
      return Shanghai;
    default:
      return '';
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

const getBezier = (C1, C2, C3, C4, percent): google.maps.LatLng => {
  return new google.maps.LatLng(
    C1.x * B1(percent) + C2.x * B2(percent) + C3.x * B3(percent) + C4.x * B4(percent),
    C1.y * B1(percent) + C2.y * B2(percent) + C3.y * B3(percent) + C4.y * B4(percent),
  );
};

const getCubicBezierLinePath = (
  startPos: google.maps.LatLng,
  endPos: google.maps.LatLng,
): google.maps.LatLng[] => {
  const lineLength = google.maps.geometry.spherical.computeDistanceBetween(startPos, endPos);
  const lineHeading = google.maps.geometry.spherical.computeHeading(startPos, endPos);

  const posA = google.maps.geometry.spherical.computeOffset(
    startPos,
    lineLength / 4,
    lineHeading - 60,
  );
  const posB = google.maps.geometry.spherical.computeOffset(
    endPos,
    lineLength / 4,
    -lineHeading + 120,
  );

  const lat1 = startPos.lat();
  const long1 = startPos.lng();

  const lat2 = posA.lat();
  const long2 = posA.lng();
  const lat3 = posB.lat();
  const long3 = posB.lng();
  const lat4 = endPos.lat();
  const long4 = endPos.lng();

  const points: google.maps.LatLng[] = [];

  for (let it = 0; it <= 1; it += 0.01) {
    points.push(
      getBezier(
        {
          x: lat1,
          y: long1,
        },
        {
          x: lat2,
          y: long2,
        },
        {
          x: lat3,
          y: long3,
        },
        {
          x: lat4,
          y: long4,
        },
        it,
      ),
    );
  }

  return points.reverse();
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

const getCurvedPath = (
  startPos: google.maps.LatLng,
  endPos: google.maps.LatLng,
): google.maps.LatLng[] => {
  const angle = Math.PI / 2;
  const distance = google.maps.geometry.spherical.computeDistanceBetween(endPos, startPos);
  const midPointDistance = distance / 2.0;
  const radius = midPointDistance / Math.sin(angle / 2.0);
  const midPointOffset = radius * Math.cos(angle / 2.0);
  const path: google.maps.LatLng[] = [];

  const lineHeading = google.maps.geometry.spherical.computeHeading(startPos, endPos);

  const midPoint = google.maps.geometry.spherical.computeOffset(
    startPos,
    midPointDistance,
    lineHeading,
  );
  const direction = startPos.lng() - endPos.lat() > 0 ? 1.0 : -1.0;
  const angleFromCenter = 90.0 * direction;
  const midArcPoint = google.maps.geometry.spherical.computeOffset(
    midPoint,
    midPointOffset,
    lineHeading + angleFromCenter,
  );

  const numPoints = 100;
  const initialHeading = google.maps.geometry.spherical.computeHeading(midArcPoint, endPos);
  const degree = (180.0 * angle) / Math.PI;

  for (let i = 0; i <= numPoints; i++) {
    const step = i * (degree / numPoints);
    const heading = -1.0 * direction;
    path.push(
      google.maps.geometry.spherical.computeOffset(
        midArcPoint,
        radius,
        initialHeading + heading * step,
      ),
    );
  }

  return path;
};

export { getCubicBezierLinePath, getCurvedPath, getGeodesicPath };
