import { ShippingType } from '../app/types';

const MockShipping: ShippingType[] = [
  {
    id: 1,
    ship: {
      id: 1,
      name: 'MAERSK',
    },
    containers: [],
    startPort: {
      id: 1,
      latitude: 51.51281107850145,
      longitude: 0.48012948664782146,
      name: 'London',
    },
    endPort: {
      id: 2,
      latitude: 44.65,
      longitude: -63.567,
      name: 'Halifax',
    },
    percentTravelled: 25,
    travelTime: '14 days 3 hours',
  },
  {
    id: 2,
    ship: {
      id: 2,
      name: 'Hapag-Lloyd',
    },
    containers: [],
    startPort: {
      id: 4,
      latitude: 40.61555785493085,
      longitude: -74.17908961253214,
      name: 'New York',
    },
    endPort: {
      id: 3,
      latitude: 35.766667,
      longitude: -5.8,
      name: 'Tangier',
    },
    percentTravelled: 65,
    travelTime: '16 days 14 hours',
  },
  {
    id: 3,
    ship: {
      id: 1,
      name: 'MAERSK',
    },
    containers: [],
    startPort: {
      id: 1,
      latitude: 9.359,
      longitude: -79.901,
      name: 'Colon City',
    },
    endPort: {
      id: 2,
      latitude: 38.725267,
      longitude: -9.150019,
      name: 'Lisbon',
    },
    percentTravelled: 25,
    travelTime: '14 days 3 hours',
  },
  {
    id: 4,
    ship: {
      id: 2,
      name: 'Hapag-Lloyd',
    },
    containers: [],
    startPort: {
      id: 4,
      latitude: 14.692778,
      longitude: -17.446667,
      name: 'Dakar',
    },
    endPort: {
      id: 3,
      latitude: 36.92981451764536,
      longitude: -76.32490750852378,
      name: 'Norfolk',
    },
    percentTravelled: 65,
    travelTime: '16 days 14 hours',
  },
  {
    id: 5,
    ship: {
      id: 1,
      name: 'MAERSK',
    },
    containers: [],
    startPort: {
      id: 1,
      latitude: 37.7775,
      longitude: -122.416389,
      name: 'San Francisco',
    },
    endPort: {
      id: 2,
      latitude: 35.67476174951276,
      longitude: 139.75255503193452,
      name: 'Tokyo',
    },
    percentTravelled: 25,
    travelTime: '14 days 3 hours',
  },
  {
    id: 6,
    ship: {
      id: 2,
      name: 'Hapag-Lloyd',
    },
    containers: [],
    startPort: {
      id: 4,
      latitude: 13.433137582706019,
      longitude: -87.45608639795651,
      name: 'San Lorenzo',
    },
    endPort: {
      id: 3,
      latitude: 25.16797030516383,
      longitude: 121.39034580394188,
      name: 'Taipei',
    },
    percentTravelled: 65,
    travelTime: '16 days 14 hours',
  },
  {
    id: 7,
    ship: {
      id: 2,
      name: 'Hapag-Lloyd',
    },
    containers: [],
    startPort: {
      id: 3,
      latitude: 31.35728222631696,
      longitude: 121.83165269674852,
      name: 'Shangai',
    },
    endPort: {
      id: 4,
      latitude: 16.85316515599431,
      longitude: -99.82177984012193,
      name: 'Acapulco',
    },
    percentTravelled: 50,
    travelTime: '16 days 14 hours',
  },
];

export { MockShipping };
