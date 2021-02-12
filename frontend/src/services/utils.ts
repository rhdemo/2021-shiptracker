import { API_PORT } from '../utilities/const';

const getBackendURL = (path: string): string => {
  return `${window.location.protocol}//${window.location.hostname}${
    API_PORT ? `:${API_PORT}` : ''
  }${path}`;
};

export { getBackendURL };
