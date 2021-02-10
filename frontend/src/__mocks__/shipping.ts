import { ShippingType } from '../app/types';

const MockShipping: ShippingType[] = [
  {
    id: 1,
    ship: {
      id: 1,
      name: 'MAERSK',
      percentTravelled: 25,
      travelTime: '14 days 3 hours',
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
      latitude: 40.61555785493085,
      longitude: -74.17908961253214,
      name: 'New York',
    },
  },
  {
    id: 2,
    ship: {
      id: 2,
      name: 'Hapag-Lloyd',
      percentTravelled: 65,
      travelTime: '16 days 14 hours',
    },
    containers: [],
    startPort: {
      id: 4,
      latitude: 36.92981451764536,
      longitude: -76.32490750852378,
      name: 'Norfolk',
    },
    endPort: {
      id: 3,
      latitude: 14.692778,
      longitude: -17.446667,
      name: 'Dakar',
    },
  },
];

export { MockShipping };
