'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { TDriver } from '@/types/drivers';
import { TTruck } from '@/types/trucks';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { FaRegEye } from 'react-icons/fa6';

export const columns = (
	onDelete: (id: string) => void
): ColumnDef<TTruck>[] => [
	{
		accessorKey: 'placa',
		header: 'Placa',
	},
	{
		accessorKey: 'modelo',
		header: 'Modelo',
	},
	{
		accessorKey: 'capacidade',
		header: 'Capacidade',
		cell: ({ row }) => {
			return <div>{row.getValue('capacidade')} Kg</div>;
		},
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
						href={`/caminhoes/formularios?caminhao=${row.getValue(
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
