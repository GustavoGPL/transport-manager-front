import { TCreateTruck, TTruck } from '@/types/trucks';
import api from '../api';

export const TruckService = {
	// getAll: (): Promise<TAis[]> => api.get('/ccds/ais'),
	getAll: async (): Promise<TTruck[]> => {
		const response = await api.get<TTruck[]>(`/trucks`); // Tipando a resposta
		return response.data; // Retorna os dados do array diretamente
	},
	getById: async (id: string): Promise<TTruck> => {
		const response = await api.get(`/trucks/${id}`);
		return response.data;
	},

	create: async (data: TCreateTruck): Promise<TTruck> =>
		await api.post('/trucks', data),

	update: async (caminhaoId: string, body: TCreateTruck): Promise<TTruck> =>
		await api.put(`/trucks/${caminhaoId}`, body),

	delete: async (id: string) => await api.delete(`/trucks/${id}`),

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
