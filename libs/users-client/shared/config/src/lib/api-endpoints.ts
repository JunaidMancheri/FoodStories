const BASE_URL = 'http://localhost:3000/api/v1';

export const API_ENDPOINTS = {
  // users;
  CREATE_USER: `${BASE_URL}/users/`,
  USERNAME_AVAILABILITY: `${BASE_URL}/users/username/`,
  IS_REGISTERED_USER: `${BASE_URL}/users/registered/`,
  GET_CURRENT_USER_DATA: `${BASE_URL}/users/email/`,
  GET_USER_DATA: `${BASE_URL}/users/`,
  UPDATE_USER_PROFILE: `${BASE_URL}/users/profile`,
  Users: {
    makeAccountPublic: (userId: string) => `${BASE_URL}/users/privacy/${userId}/public`,
    makeAccountPrivate: (userId: string) => `${BASE_URL}/users/privacy/${userId}/private`
  },

  // Posts
  CREATE_POST: `${BASE_URL}/posts/`,
  UPDATE_MEDIA_URLS: `${BASE_URL}/posts/mediaUrls/`,
  Posts: {
    getUsersPosts: (userId: string) => `${BASE_URL}/posts/user/${userId}`,
  },

  Likes: {
    isPostLiked: (postId: string) => `${BASE_URL}/likes/liked/${postId}`,
    unlikeAPost: (postId: string) => `${BASE_URL}/likes/${postId}`,
    likeAPost: (postId: string) => `${BASE_URL}/likes/${postId}`,
  },

  Comments: {
    addComment: (postId: string) => `${BASE_URL}/comments/${postId}`,
    getComments: (postId: string) => `${BASE_URL}/comments/${postId}/`,
  },

  SocialNetworks: {
    followAUser: (userId: string) => `${BASE_URL}/social-networks/${userId}`,
    unFollowAUser: (userId: string) => `${BASE_URL}/social-networks/${userId}`
  }

}