const BASE_URL = 'http://localhost:3000/api/v1';

export const API_ENDPOINTS = {
  CREATE_USER: `${BASE_URL}/users/`,
  USERNAME_AVAILABILITY: `${BASE_URL}/users/`,
  IS_REGISTERED_USER: `${BASE_URL}/users/registered/`,
  GET_USER_DATA: `${BASE_URL}/users/email/`,
}