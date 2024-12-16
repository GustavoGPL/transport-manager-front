import axios, { AxiosError, AxiosInstance } from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:8080',
	timeout: 10 * 1000,
	headers: {
		Accept: 'application/json',

		'Content-Type': 'application/json',
	},
});
export default api;
