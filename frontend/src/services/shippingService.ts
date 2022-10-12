import axios from 'axios';
import { getBackendURL } from './utils';
import { ShippingType } from '../app/types';
import { DEV_MODE } from '../utilities/const';
import { MockShipping } from '../__mocks__/shipping';

export const fetchShipping = (): Promise<ShippingType[]> => {
  // Burr
  // const getUrl = getBackendURL('/shipments');
  const getUrl = getBackendURL('/shipments/mockshipments');
  if (DEV_MODE) {
    return new Promise<ShippingType[]>((resolve) => {
      setTimeout(() => {
        resolve(MockShipping);
      }, 100);
    });
  }
  return axios
    .get(getUrl)
    .then((response) => {
      return response.data;
    })
    .catch((e) => {
      console.error(`Error getting shipping data: ${e.response.data}`);
    });
};
