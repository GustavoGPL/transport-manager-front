'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FaPlus, FaThLarge } from 'react-icons/fa';
import { MdChecklistRtl } from 'react-icons/md';
import { AiOutlineContainer } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import BackButton from '@/components/back-button';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { HandleError } from '@/components/handle-error';
import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SkeletonTable } from '@/components/skeleton-table';
import { columns } from './columns';
import { DriversService } from '@/services/models/drivers';
import { queryClient } from '@/utils/react-query';

const Home = () => {
	const router = useRouter();

	const {
		data: drivers,
		isPending,
		error,
	} = useQuery({
		queryKey: ['getDrivers'],
		queryFn: () => {
			return DriversService.getAll();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (id: string) => DriversService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getDrivers'],
			});
		},
	});

	// Função de exclusão
	const handleDelete = (id: string) => {
		if (confirm('Tem certeza que deseja excluir este motorista?')) {
			deleteMutation.mutate(id);
		}
	};

	console.log(drivers);

	return (
		<div className="defaultPage">
			<div className="secondaryDiv">
				<div className="flex justify-between items-center">
					<div className="flex flex-row gap-5 items-center">
						<BackButton />
						<CardTitle className="text-center font-bold text-[#121D31] text-xl md:text-2xl">
							Motoristas
						</CardTitle>
					</div>
					<div className="flex justify-end">
						<Button
							className="flex gap-2 font-bold rounded-md bg-green-500 hover:bg-green-600"
							onClick={() => router.push('/motoristas/formularios')}
						>
							<p className="hidden md:inline">Adicionar</p>
							<FaPlus />
						</Button>
					</div>
				</div>
				{isPending ? (
					<SkeletonTable />
				) : error ? (
					<HandleError message={error.message} />
				) : (
					<DataTable data={drivers || []} columns={columns(handleDelete)} />
				)}
			</div>
		</div>
	);
};

export default Home;
