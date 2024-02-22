const BASE_URL = 'http://localhost:3000/api/v1';

export const API_ENDPOINTS = {
  CREATE_USER: `${BASE_URL}/users/`,
  USERNAME_AVAILABILITY: `${BASE_URL}/users/username/`,
  IS_REGISTERED_USER: `${BASE_URL}/users/registered/`,
  GET_CURRENT_USER_DATA: `${BASE_URL}/users/email/`,
  GET_USER_DATA: `${BASE_URL}/users/`,
  UPDATE_USER_PROFILE: `${BASE_URL}/users/profile`,

  // Posts
  CREATE_POST: `${BASE_URL}/posts/`,
  UPDATE_MEDIA_URLS: `${BASE_URL}/posts/mediaUrls/`,
}