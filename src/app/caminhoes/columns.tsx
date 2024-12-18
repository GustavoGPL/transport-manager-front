'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { TTruck } from '@/types/trucks';
import { ColumnDef } from '@tanstack/react-table';
import Link from 'next/link';

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
						href={`/caminhoes/formularios?caminhao=${row.getValue('_id')}`}
						className="flex justify-center items-center bg-blue-400 rounded-md p-2 text-white"
					>
						Editar
					</Link>
					<Popover>
						<PopoverTrigger asChild>
							<Button variant="destructive">Excluir</Button>
						</PopoverTrigger>
						<PopoverContent className="w-80">
							<div className="flex flex-col gap-4">
								<h3 className="text-lg font-semibold">Confirmar Exclusão</h3>
								<p className="text-sm text-muted-foreground">
									<p className="text-red-500 font-bold">
										Esta ação não poderá ser desfeita e irá exluir esse caminhão
										dos registros!
									</p>
									Você tem certeza que deseja excluir esta esse caminhão?
								</p>
								<div className="flex justify-end gap-3">
									<Button
										variant="destructive"
										onClick={() => onDelete(row.getValue('_id'))}
									>
										Confirmar
									</Button>
								</div>
							</div>
						</PopoverContent>
					</Popover>
				</div>
			);
		},
	},
];
