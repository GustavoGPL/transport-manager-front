'use client';

import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { FaThLarge } from 'react-icons/fa';
import { MdChecklistRtl } from 'react-icons/md';
import { AiOutlineContainer } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';
import { useQuery } from '@tanstack/react-query';
import { DeliveriesService } from '@/services/models/deliveries';
import Dashboard from './components/dashboard';
import { ValorDiarioChart } from './components/valorDiarioChart';
import { TotalEntregasChart } from './components/totalEntregasChart';

const Home = () => {
	const {
		data: deliveries,
		refetch,
		isPending,
		error,
	} = useQuery({
		queryKey: ['getDeliveries'],
		queryFn: () => {
			return DeliveriesService.getAll();
		},
		staleTime: 0,
	});

	return (
		<div className="defaultPage">
			<div className="secondaryDiv">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-3">
					<ValorDiarioChart deliveries={deliveries || []} />
					<TotalEntregasChart deliveries={deliveries || []} />
				</div>
				{/* <div className="grid md:grid-cols-2 gap-5"> */}
				<Card>
					<Dashboard deliveries={deliveries || []} refetch={refetch} />
				</Card>
				{/* </div> */}
			</div>
		</div>
	);
};

export default Home;
