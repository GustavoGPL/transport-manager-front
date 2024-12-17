'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TDriver } from '@/types/drivers';
import formatCPF from '@/utils/functions';
import type { ColumnDef } from '@tanstack/react-table'; // Importar como "type" para evitar conflito
import Link from 'next/link';

export const columns = (
	onDelete: (id: string) => void
): ColumnDef<TDriver>[] => [
	{
		accessorKey: 'nome',
		header: 'Nome',
	},
	{
		accessorKey: 'cpf',
		header: 'CPF',
		cell: ({ row }) => {
			const cpfFormmated = formatCPF(row.getValue('cpf'));
			return <div>{cpfFormmated || 'Não informado'}</div>;
		},
	},
	{
		accessorKey: 'telefone',
		header: 'Telefone',
	},
	{
		accessorKey: 'status',
		header: 'Status',
		cell: ({ row }) => {
			return (
				<Badge
					variant={row.getValue('status') === 'Em uso' ? 'red' : 'green'}
					className="border-none"
				>
					{row.getValue('status')}
				</Badge>
			);
		},
	},
	{
		accessorKey: '_id',
		header: 'Ações',
		cell: ({ row }) => {
			return (
				<div className="flex flex-row gap-3 justify-center">
					<Link
						href={`/motoristas/formularios?motorista=${row.getValue(
							'_id' // Ajustado para acessar corretamente o campo
						)}`}
						className="flex justify-center items-center bg-blue-400 rounded-md p-2 text-white"
					>
						Editar
					</Link>
					<Button
						variant="destructive"
						onClick={() => onDelete(row.getValue('_id'))} // Passar o ID para a função onDelete
					>
						Excluir
					</Button>
				</div>
			);
		},
	},
];
