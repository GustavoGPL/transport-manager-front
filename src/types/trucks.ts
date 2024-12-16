export type TTruck = {
	_id: string;
	placa: string;
	modelo: string;
	capacidade: number;
	status: string;
	entregaId?: string;
};

export type TCreateTruck = Omit<TTruck, '_id' | 'status' | 'entregaId'>;
