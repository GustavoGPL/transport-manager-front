'use client';

import { Button } from '@/components/ui/button';
import { TDriver } from '@/types/drivers';
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
	},
	{
		accessorKey: 'telefone',
		header: 'Telefone',
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
