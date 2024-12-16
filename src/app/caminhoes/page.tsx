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
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { SkeletonTable } from '@/components/skeleton-table';
import { DriversService } from '@/services/models/drivers';
import { columns } from './columns';
import { TruckService } from '@/services/models/trucks';

const Home = () => {
	const router = useRouter();

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
							className="flex gap-2 font-bold rounded-md"
							onClick={() => router.push('/cadastros/usuarios/formularios')}
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
					<DataTable data={caminhoes || []} columns={columns} />
				)}
			</div>
		</div>
	);
};

export default Home;
