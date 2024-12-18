'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SkeletonChart } from '@/components/skeleton-chart';
import { TDelivery } from '@/types/deliveries';
import { useState } from 'react';
import dayjs from 'dayjs';

type TProps = {
	deliveries: TDelivery[];
	isFetching: Boolean;
};

export function ValorDiario({ deliveries, isFetching }: TProps) {
	const [selectedDate, setSelectedDate] = useState<string>('');
	console.log('Date', selectedDate);

	const filteredDeliveries = deliveries.filter(delivery => {
		if (selectedDate) {
			const deliveryDate = new Date(delivery.dataInicio)
				.toISOString()
				.split('T')[0];
			return deliveryDate === selectedDate;
		}
		return true;
	});

	const totalValorCarga = filteredDeliveries
		?.filter(
			content =>
				content.status !== 'Removida' && content.status !== 'AguardandoInício'
		)
		.reduce((sum, delivery) => sum + delivery.valorCarga, 0);

	const formattedValor = totalValorCarga.toLocaleString('pt-BR', {
		style: 'currency',
		currency: 'BRL',
	});

	return (
		<Card className="flex flex-col justify-center">
			{isFetching ? (
				<div className="flex justify-center">
					<SkeletonChart />
				</div>
			) : (
				<>
					<div className="flex items-center p-2">
						<div className="mr-2 text-md">Filtrar por data de início:</div>
						<input
							type="date"
							value={selectedDate}
							onChange={e => setSelectedDate(e.target.value)}
							className="border rounded p-2 text-gray-700"
						/>
					</div>

					<CardHeader className="items-center pb-0">
						<CardTitle>
							{selectedDate
								? `Valor no dia ${dayjs(selectedDate).format('DD/MM/YYYY')}`
								: 'Valores Totais'}
						</CardTitle>
					</CardHeader>

					<CardContent className="flex-1 pb-0">
						<div className="flex justify-center items-center text-3xl font-bold">
							{formattedValor}
						</div>
						<div className="text-muted-foreground text-center">Reais</div>
					</CardContent>
				</>
			)}
		</Card>
	);
}
