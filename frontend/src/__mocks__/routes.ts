import { RouteType } from '../app/types';

const MockRoutes: RouteType[] = [
  {
    name: 'MAERSK',
    lat: 46.07315107850145,
    lng: -36.849480062942159,
    origin: 'New York',
    destination: 'London',
    headingWest: false,
    travelTime: '14 days 3 hours',
  },
  {
    name: 'Hapag-Lloyd',
    lat: 28.048332777646804,
    lng: -46.88578725426189,
    origin: 'Dakar',
    destination: 'Norfolk',
    headingWest: true,
    travelTime: '16 days 14 hours',
  },
];

export { MockRoutes };
