import config from '@config/index';
import { merge } from 'lodash';

import request from '@utils/request';

const urls = {
  ping: 'ping.json',
  login: 'auth/login',
  register: 'auth/register',
  ticket: 'ticket/ticket',
  coupons: 'ticket/coupon',
};

export const callAPI = async (endpoint, method, header = {}, params = {}, data = {}) => {
  const defaultHeader = {
    'Content-Type': 'application/json; charset=UTF-8',
  };

  const headers = merge(defaultHeader, header);
  const options = {
    url: config.api.host + endpoint,
    method,
    headers,
    data,
    params,
  };

  return request(options).then((response) => {
    const responseAPI = response.data;
    return responseAPI;
  });
};

export const ping = () => callAPI(urls.ping, 'get');

// Auth
export const login = (formData) => callAPI(urls.login, 'post', {}, {}, formData);
export const register = (formData) => callAPI(urls.register, 'post', {}, {}, formData);

// Tickets
export const getAllTickets = (formData) => callAPI(urls.ticket, 'get', {}, formData);
export const getTicketDetailApi = (formData) => callAPI(`${urls.ticket}/detail`, 'get', {}, formData);
export const getMyAllTickets = (formData) => callAPI(`${urls.ticket}/mytickets`, 'get', {}, formData);
export const getMyTicketDetailApi = (formData) => callAPI(`${urls.ticket}/mytickets/detail`, 'get', {}, formData);
export const createNewTicket = (formData) => callAPI(`${urls.ticket}/create`, 'put', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } , {}, formData);
export const updateTicketApi = (formData) => callAPI(`${urls.ticket}/edit`, 'patch', { 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8' } , {}, formData)
export const deleteTicketApi = (formData) => callAPI(`${urls.ticket}/delete`, 'delete', {} , {}, formData);

// Coupons
export const getAllCoupons = () => callAPI(urls.coupons, 'get');
export const createNewCoupon = (formData) => callAPI(`${urls.coupons}/create`, 'post', {}, {}, formData);
export const deleteCoupon = (formData) => callAPI(`${urls.coupons}/delete`, 'delete', {}, {}, formData);
