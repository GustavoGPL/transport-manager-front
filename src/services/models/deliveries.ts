import { TCreateDelivery, TDelivery } from '@/types/deliveries';
import api from '../api';
import { TCreateDriver, TDriver } from '@/types/drivers';

export const DeliveriesService = {
	// getAll: (): Promise<TAis[]> => api.get('/ccds/ais'),
	getAll: async (): Promise<TDelivery[]> => {
		const response = await api.get<TDelivery[]>(`/deliveries`); // Tipando a resposta
		return response.data; // Retorna os dados do array diretamente
	},
	getById: async (id: string): Promise<TDelivery> =>
		await api.get(`/deliveries/${id}`),

	create: async (data: TCreateDelivery): Promise<TDelivery> =>
		await api.post('/deliveries', data),

	update: async (
		deliveryId: string,
		body: TCreateDelivery
	): Promise<TDelivery> => await api.put(`/deliveries/${deliveryId}`, body),

	delete: async (id: string) => await api.delete(`/deliveries/${id}`),
};
