'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FaThLarge } from 'react-icons/fa';
import { MdChecklistRtl } from 'react-icons/md';
import { AiOutlineContainer } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { useMutation, useQuery } from '@tanstack/react-query';
import { DeliveriesService } from '@/services/models/deliveries';
import Dashboard from './components/dashboard';
import { ValorDiario } from './components/valorDiario';
import { TotalEntregas } from './components/totalEntregas';
import { TruckService } from '@/services/models/trucks';
import { queryClient } from '@/utils/react-query';
import { useEffect, useState } from 'react';
import DynamicPagination from '@/components/dynamic-pagination';
import { toast } from 'react-toastify';

const Home = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const itemsPerPage = 4;
	const {
		data: deliveries,
		refetch,
		isFetching,
		error,
	} = useQuery({
		queryKey: ['getDeliveries'],
		queryFn: () => {
			return DeliveriesService.getAll();
		},
		staleTime: 0,
	});

	const { data: trucks } = useQuery({
		queryKey: ['getTrucks'],
		queryFn: () => {
			return TruckService.getAll();
		},
		staleTime: 0,
	});

	const deleteMutation = useMutation({
		mutationFn: (id: string) => DeliveriesService.delete(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getDeliveries'],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const finishMutation = useMutation({
		mutationFn: (id: string) => DeliveriesService.finish(id),
		onSuccess: () => {
			queryClient.invalidateQueries({
				queryKey: ['getDeliveries'],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const handleDelete = (id: string) => {
		deleteMutation.mutate(id);
	};

	const handleFinish = (id: string) => {
		finishMutation.mutate(id);
	};

	// Filtrando entregas removidas
	const filteredDeliveries =
		deliveries?.filter(delivery => delivery.status !== 'Removida') || [];

	// Calculando o número total de páginas
	const totalPages = Math.ceil(filteredDeliveries.length / itemsPerPage);

	// Calculando os índices dos dados para a página atual
	const indexOfLastItem = currentPage * itemsPerPage;
	const indexOfFirstItem = indexOfLastItem - itemsPerPage;

	// Dados a serem exibidos para a página atual
	const currentData = filteredDeliveries.slice(
		indexOfFirstItem,
		indexOfLastItem
	);

	useEffect(() => {
		// Recarregar os dados ao mudar de página
		refetch();
	}, [currentPage, refetch]);

	return (
		<div className="defaultPage">
			<div className="secondaryDiv">
				<div className="flex flex-row gap-5 items-center">
					<h3 className="text-3xl font-bold text-gray-800">Dashboard</h3>
				</div>
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<ValorDiario deliveries={deliveries || []} isFetching={isFetching} />
					<TotalEntregas
						deliveries={deliveries || []}
						trucks={trucks || []}
						isFetching={isFetching}
					/>
				</div>
				<Card>
					<Dashboard
						deliveries={currentData || []}
						isFetching={isFetching}
						onDelete={handleDelete}
						onFinish={handleFinish}
					/>
				</Card>
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
