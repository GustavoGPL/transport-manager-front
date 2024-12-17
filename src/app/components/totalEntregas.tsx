'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { TDelivery } from '@/types/deliveries';
import { SkeletonChart } from '@/components/skeleton-chart';
import { TTruck } from '@/types/trucks';
import { useEffect } from 'react';

type TProps = {
	deliveries: TDelivery[];
	trucks: TTruck[];
	isFetching: boolean;
};

export function TotalEntregas({ deliveries, trucks, isFetching }: TProps) {
	return (
		<Card className="flex flex-col justify-center">
			{isFetching ? (
				<div className="flex justify-center">
					<SkeletonChart />
				</div>
			) : (
				<div className="flex flex-col gap-3">
					<CardHeader className="items-center pb-0">
						<CardTitle>Total de Entregas e Caminhões</CardTitle>
					</CardHeader>

					{/* Seção de Caminhões */}
					<CardContent className="flex-1 pb-0">
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
							{/* Card de Entregas em Andamento */}
							<div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-blue-50">
								<h3 className="text-xl font-semibold text-blue-600">
									Entregas em Andamento
								</h3>
								<p className="text-3xl font-bold text-blue-800">
									{
										deliveries.filter(
											delivery =>
												delivery.status !== 'Removida' &&
												delivery.status !== 'AguardandoInício'
										).length
									}
								</p>
							</div>

							{/* Card de Caminhões Disponíveis */}
							<div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-green-50">
								<h3 className="text-xl font-semibold text-green-600">
									Caminhões Disponíveis
								</h3>
								<p className="text-3xl font-bold text-green-800">
									{trucks.filter(truck => truck.status !== 'Em uso').length}
								</p>
							</div>

							{/* Card de Total de Entregas */}
							<div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-purple-50">
								<h3 className="text-xl font-semibold text-purple-600">
									Total de Entregas
								</h3>
								<p className="text-3xl font-bold text-purple-800">
									{
										deliveries.filter(
											delivery => delivery.status !== 'Removida'
										).length
									}
								</p>
							</div>

							{/* Card de Total de Caminhões */}
							<div className="flex flex-col items-center p-4 rounded-lg shadow-md bg-orange-50">
								<h3 className="text-xl font-semibold text-orange-600">
									Total de Caminhões
								</h3>
								<p className="text-3xl font-bold text-orange-800">
									{trucks.length}
								</p>
							</div>
						</div>
					</CardContent>
				</div>
			)}
		</Card>
	);
}
