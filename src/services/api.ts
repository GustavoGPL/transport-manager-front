import axios, { AxiosError, AxiosInstance } from 'axios';

const api = axios.create({
	baseURL: process.env.baseURL,
	timeout: 10 * 1000,
	headers: {
		Accept: 'application/json',

		'Content-Type': 'application/json',
	},
});
export default api;
