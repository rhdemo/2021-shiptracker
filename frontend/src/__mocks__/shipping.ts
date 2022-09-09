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
      latitude: 40.61555785493085,
      longitude: -74.17908961253214,
      name: 'New York',
    },
    endPort: {
      id: 2,
      latitude: -33.843174,
      longitude: 18.830705,
      name: 'Cape Town',
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
      id: 3,
      latitude: 33.763663,
      longitude: -118.378756,
      name: 'Los Angeles',
    },
    endPort: {
      id: 4,
      latitude: 35.092835,
      longitude: 136.758316,
      name: 'Nagoya',
    },
    percentTravelled: 65,
    travelTime: '16 days 14 hours',
  },
  {
    id: 3,
    ship: {
      id: 3,
      name: 'MAERSK',
    },
    containers: [],
    startPort: {
      id: 5,
      latitude: 51.908774,
      longitude: 4.150368,
      name: 'Rotterdam',
    },
    endPort: {
      id: 6,
      latitude: 36.845846,
      longitude: -76.310805,
      name: 'Norfolk',
    },
    percentTravelled: 25,
    travelTime: '14 days 3 hours',
  },
  {
    id: 4,
    ship: {
      id: 4,
      name: 'Hapag-Lloyd',
    },
    containers: [],
    startPort: {
      id: 7,
      latitude: -33.987613,
      longitude: 151.141125,
      name: 'Sydney',
    },
    endPort: {
      id: 8,
      latitude: 47.620431,
      longitude: -122.353497,
      name: 'Seattle',
    },
    percentTravelled: 65,
    travelTime: '16 days 14 hours',
  },
  // {
  //   id: 5,
  //   ship: {
  //     id: 1,
  //     name: 'MAERSK',
  //   },
  //   containers: [],
  //   startPort: {
  //     id: 1,
  //     latitude: 37.7775,
  //     longitude: -122.416389,
  //     name: 'San Francisco',
  //   },
  //   endPort: {
  //     id: 2,
  //     latitude: 35.67476174951276,
  //     longitude: 139.75255503193452,
  //     name: 'Tokyo',
  //   },
  //   percentTravelled: 25,
  //   travelTime: '14 days 3 hours',
  // },
  // {
  //   id: 6,
  //   ship: {
  //     id: 2,
  //     name: 'Hapag-Lloyd',
  //   },
  //   containers: [],
  //   startPort: {
  //     id: 4,
  //     latitude: 13.433137582706019,
  //     longitude: -87.45608639795651,
  //     name: 'San Lorenzo',
  //   },
  //   endPort: {
  //     id: 3,
  //     latitude: 25.16797030516383,
  //     longitude: 121.39034580394188,
  //     name: 'Taipei',
  //   },
  //   percentTravelled: 65,
  //   travelTime: '16 days 14 hours',
  // },
  // {
  //   id: 7,
  //   ship: {
  //     id: 2,
  //     name: 'Hapag-Lloyd',
  //   },
  //   containers: [],
  //   startPort: {
  //     id: 3,
  //     latitude: 31.35728222631696,
  //     longitude: 121.83165269674852,
  //     name: 'Shangai',
  //   },
  //   endPort: {
  //     id: 4,
  //     latitude: 16.85316515599431,
  //     longitude: -99.82177984012193,
  //     name: 'Acapulco',
  //   },
  //   percentTravelled: 50,
  //   travelTime: '16 days 14 hours',
  // },
];

export { MockShipping };
