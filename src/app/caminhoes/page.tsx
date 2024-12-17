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
import { DriversService } from '@/services/models/drivers';
import { columns } from './columns';
import { TruckService } from '@/services/models/trucks';
import { queryClient } from '@/utils/react-query';
import { useState } from 'react';
import DynamicPagination from '@/components/dynamic-pagination';

const Home = () => {
	const router = useRouter();
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 5;

	const {
		data: caminhoes,
		isPending,
		error,
	} = useQuery({
		queryKey: ['getTrucks'],
		queryFn: () => {
			return TruckService.getAll();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (id: string) => TruckService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getTrucks'],
			});
		},
	});

	const handleDelete = (id: string) => {
		if (confirm('Tem certeza que deseja excluir este motorista?')) {
			deleteMutation.mutate(id);
		}
	};

	// Calcular o número total de páginas
	const totalPages = Math.ceil((caminhoes?.length || 0) / itemsPerPage);

	// Calcular os índices dos dados para a página atual
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	// Dados a serem exibidos para a página atual
	const currentData = caminhoes?.slice(indexOfFirstItem, indexOfLastItem);

	return (
		<div className="defaultPage">
			<div className="secondaryDiv">
				<div className="flex justify-between items-center">
					<div className="flex flex-row gap-5 items-center">
						<BackButton />
						<CardTitle className="text-center font-bold text-[#121D31] text-xl md:text-2xl">
							Caminhões
						</CardTitle>
					</div>
					<div className="flex justify-end">
						<Button
							className="flex gap-2 font-bold rounded-md bg-green-500 hover:bg-green-600"
							onClick={() => router.push('/caminhoes/formularios')}
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
					<DataTable data={currentData || []} columns={columns(handleDelete)} />
				)}
				<DynamicPagination
					page={currentPage}
					setPage={setCurrentPage}
					totalPages={totalPages}
				/>
			</div>
		</div>
	);
};

export default Home;
