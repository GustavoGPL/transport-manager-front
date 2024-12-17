import api from '../api';
import { TCreateDriver, TDriver } from '@/types/drivers';

export const DriversService = {
	// getAll: (): Promise<TAis[]> => api.get('/ccds/ais'),
	getAll: async (): Promise<TDriver[]> => {
		const response = await api.get<TDriver[]>(`/drivers`); // Tipando a resposta
		return response.data; // Retorna os dados do array diretamente
	},
	getById: async (id: string): Promise<TDriver> => {
		const response = await api.get(`/drivers/${id}`);
		return response.data;
	},

	create: async (data: TCreateDriver): Promise<TDriver> =>
		await api.post('/drivers', data),

	update: async (driverId: string, body: TCreateDriver): Promise<TDriver> =>
		await api.put(`/drivers/${driverId}`, body),

	delete: async (id: string) => await api.delete(`/drivers/${id}`),

	// create: async (data: TCreateUser): Promise<TCreateUser> =>
	// 	await api.post('/auth/save', data),

	// update: (userId: number, body: TUpdateUser) => {
	// 	api.put(`/usuarios/update/admin/${userId}`, body);
	// },

	// // função usada apenas por ADMINS (edita todo o usuário)
	// updateAdmin: (userId: number, body: TUpdateAdminUser) => {
	// 	api.put(`/update/admin/${userId}`, body);
	// },
};
