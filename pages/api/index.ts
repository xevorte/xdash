import axios, { AxiosRequestConfig } from 'axios'

const callApi = ({ method, url, params, data, timeout }: AxiosRequestConfig) => {
  const property = {
    baseURL: 'https://dummyjson.com',
    method,
    url,
    params,
    data,
    timeout,
  };

  return axios(property);
}

export const getProductsApi = (data?: any) => (
  callApi({
    method: 'get',
    url: '/products',
    data,
    timeout: 5000,
  })
)

export const getCartsApi = (data?: any) => (
  callApi({
    method: 'get',
    url: '/carts',
    data,
    timeout: 5000,
  })
)

export const getCartDetailApi = (params?: any) => (
  callApi({
    method: 'get',
    url: `/carts/${params}`,
    timeout: 5000,
  })
)

export const getUserDetailApi = (params?: any) => (
  callApi({
    method: 'get',
    url: `/users/${params}`,
    timeout: 5000,
  })
)