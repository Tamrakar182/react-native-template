import axios from 'axios';
import { BASE_API } from './config-global';
import { getItem } from './AsyncStorage';
import { QueryClient } from '@tanstack/react-query';
import { PageSearchType } from '@/types';

let logoutCallback: (() => void) | null = null;

const api = axios.create({
  baseURL: BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

api.interceptors.request.use(async config => {
  const storedUser = await getItem('user');
  const token = storedUser ? JSON.parse(storedUser).token : null;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  response => response,
  async error => {
    if (error.response && error.response.status === 401) {
      if (logoutCallback) {
        logoutCallback();
      }
    }
    return Promise.reject(error);
  },
);

export const queryClient = new QueryClient();

export const setLogoutCallback = (callback: () => void) => {
  logoutCallback = callback;
};

export const endpoints = {
  auth: {
    editProfile: '/admin/edit-profile',
    login: '/admin/login',
    register: '/admin/register',
    logout: '/logout',
  },
  password: {
    changePassword: '/admin/change-password',
    forgotPassword: '/password/forgot',
    resetPassword: '/password/reset',
  },
  package: {
    create: '/admin/packages/create',
    update: (id: string) => `/admin/packages/update/${id}`,
    delete: (id: string) => `/admin/packages/delete/${id}`,
    list: '/admin/packages/list',
  } 
};

export const queryKeys = {
  packages: {
    list: ['packages'],
    search: ({ page, perPage, search }: PageSearchType) => [
      'packages',
      page,
      perPage,
      search,
    ],
    infiniteScroll: ({
      perPage,
      search,
    }: {
      perPage: number;
      search: string;
    }) => ['packages', perPage, search],
  },
  user: {
    profile: ["profile"]
  }
};

export default api;
