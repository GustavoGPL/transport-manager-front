'use client';

import {
	ColumnDef,
	flexRender,
	getCoreRowModel,
	useReactTable,
} from '@tanstack/react-table';

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table';
import { cn } from '@/lib/utils';

interface DataTableProps<TData, TValue> {
	columns: ColumnDef<TData, TValue>[];
	data: TData[];
}

export function DataTable<TData, TValue>({
	columns,
	data,
}: DataTableProps<TData, TValue>) {
	const table = useReactTable({
		data,
		columns,
		getCoreRowModel: getCoreRowModel(),
	});

	return (
		<div className="rounded-md border overflow-hidden">
			<Table>
				<TableHeader>
					{table.getHeaderGroups().map(headerGroup => (
						<TableRow key={headerGroup.id}>
							{headerGroup.headers.map(header => {
								const auxClass: string =
									// @ts-ignore
									header.column.columnDef.meta?.className || '';

								return (
									<TableHead
										key={header.id}
										className={cn(
											'text-center bg-darkRed text-white text-sm md:text-lg',
											auxClass
										)}
									>
										{header.isPlaceholder
											? null
											: flexRender(
													header.column.columnDef.header,
													header.getContext()
											  )}
									</TableHead>
								);
							})}
						</TableRow>
					))}
				</TableHeader>
				<TableBody>
					{table.getRowModel().rows?.length ? (
						table.getRowModel().rows.map(row => (
							<TableRow
								key={row.id}
								data-state={row.getIsSelected() && 'selected'}
							>
								{row.getVisibleCells().map(cell => {
									const auxClass: string =
										//@ts-ignore
										cell.column.columnDef.meta?.className || '';

									return (
										<TableCell
											key={cell.id}
											className={cn('text-center text-sm', auxClass)}
										>
											{flexRender(
												cell.column.columnDef.cell,
												cell.getContext()
											)}
										</TableCell>
									);
								})}
							</TableRow>
						))
					) : (
						<TableRow>
							<TableCell colSpan={columns.length} className="h-24 text-center">
								Sem dados
							</TableCell>
						</TableRow>
					)}
				</TableBody>
			</Table>
		</div>
	);
}
