export type TDriver = {
	_id: string;
	nome: string;
	cpf: string;
	telefone: string;
	entregasNoMes: number;
	entregaId?: string;
};

export type TCreateDriver = Omit<
	TDriver,
	'_id' | 'entregaId' | 'entregasNoMes'
>;
