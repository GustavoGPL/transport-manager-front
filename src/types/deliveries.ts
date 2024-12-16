export type TDelivery = {
	caminhaoId: {
		_id: string;
		modelo: string;
		placa: string;
	}; // ID do caminhão (referência a 'Truck')
	motoristaId: {
		_id: string;
		nome: string;
	}; // ID do motorista (referência a 'Driver')
	tipoCarga: string; // Tipo de carga (valores enumerados)
	valorCarga: number; // Valor da carga
	localChegada: string;
	regiao: string; // Região de entrega
	status: 'Pendente' | 'Concluída'; // Status da entrega
	dataInicio: string; // Data prevista para entrega
	dataFim: string;
	valiosa?: boolean; // Indica se a carga é valiosa (opcional)
	temSeguro?: boolean; // Indica se a carga tem seguro (opcional)
	cargaPerigosa?: boolean; // Indica se a carga é perigosa (opcional)
};

export type TCreateDelivery = Omit<
	TDelivery,
	| '_id'
	| 'status'
	| 'valiosa'
	| 'temSeguro'
	| 'cargaPerigosa'
	| 'caminhaoId'
	| 'motoristaId'
> & {
	caminhaoId: string;
	motoristaId: string;
};
