
const API_BASE_URL = 'https://coofee.azurewebsites.net/api';

export const COFFEE_ITEMS_URL = `${API_BASE_URL}/coffee-items`;
export const USERS_URL = `${API_BASE_URL}/auth/users`;

export const ADD_COFFEE_URL = `${API_BASE_URL}/add-coffee`;

export const UPDATE_COFFEE_ITEM_URL = itemId =>
  `${API_BASE_URL}/update-coffee/${itemId}`;

export const REGISTER_URL = `${API_BASE_URL}/auth/register`;

export const LOGIN_URL = `${API_BASE_URL}/auth/login`;