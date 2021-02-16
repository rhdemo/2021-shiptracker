type PortType = {
  id: number;
  name: string;
  latitude: number;
  longitude: number;
};

type RouteType = {
  name: string;
  lat: number;
  lng: number;
  origin: string;
  destination: string;
  headingWest: boolean;
  travelTime: string;
};

type ShipType = {
  id: number;
  name: string;
};

type ShippingType = {
  id: number;
  ship: ShipType;
  containers: [];
  startPort: PortType;
  endPort: PortType;
  percentTravelled: number;
  travelTime: string;
};

export { PortType, RouteType, ShipType, ShippingType };
