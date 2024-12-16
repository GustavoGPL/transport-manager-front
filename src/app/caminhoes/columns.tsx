'use client';

import { TDriver } from '@/types/drivers';
import { TTruck } from '@/types/trucks';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';
import { FaRegEye } from 'react-icons/fa6';

export const columns: ColumnDef<TTruck>[] = [
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
	},
	{
		accessorKey: 'status',
		header: 'Status',
	},
	{
		accessorKey: '_id',
		header: 'Ações',
		cell: ({ row }) => {
			return (
				<Link
					href={`/caminhoesformularios?caminhao=${row.getValue('_id')}`}
					className="flex justify-center"
				>
					<FaRegEye className="hover:text-blue-600" size={25} />
				</Link>
			);
		},
	},
];
