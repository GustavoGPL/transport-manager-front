'use client';

import { useState } from 'react';
import { TDelivery } from '@/types/deliveries';
import { DeliveryModal } from './deliveryModal';
import { Label } from '@/components/ui/label';
import { SkeletonCard } from '@/components/skeleton-card';
import { Button } from '@/components/ui/button';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';

const statusStyles = {
	Andamento: 'bg-yellow-200 text-yellow-800',
	Concluída: 'bg-green-200 text-green-800',
	Removida: 'bg-slate-300',
	AguardandoInício: 'bg-blue-200 text-blue-800 ',
};

type DashboardProps = {
	deliveries: TDelivery[];
	isFetching: boolean;
	onDelete: (id: string) => void;
	onFinish: (id: string) => void;
};

const Dashboard: React.FC<DashboardProps> = ({
	deliveries,
	isFetching,
	onDelete,
	onFinish,
}) => {
	const [selectedDate, setSelectedDate] = useState<string>('');
	const [deliveryToDelete, setDeliveryToDelete] = useState<string>('');
	const [deliveryToFinish, setDeliveryToFinish] = useState<string>('');

	const filteredDeliveries = deliveries
		.filter(delivery => delivery.status !== 'Removida')
		.filter(delivery => {
			if (selectedDate) {
				const deliveryDate = new Date(delivery.dataInicio)
					.toISOString()
					.split('T')[0];
				return deliveryDate === selectedDate;
			}
			return true;
		});

	const handleDeleteClick = (id: string) => {
		setDeliveryToDelete(id);
	};

	const handleFinishClick = (id: string) => {
		setDeliveryToFinish(id);
	};

	const handleConfirmDelete = () => {
		if (deliveryToDelete) {
			onDelete(deliveryToDelete);
			setDeliveryToDelete('');
		}
	};

	const handleConfirmFinish = () => {
		if (deliveryToFinish) {
			onFinish(deliveryToFinish);
			setDeliveryToFinish('');
		}
	};

	return (
		<div className="p-6">
			<div className="flex flex-col justify-between items-center mb-6 sm:flex-row">
				<h2 className="text-3xl font-bold text-gray-800">Entregas</h2>
				<div className="flex flex-col sm:flex-row justify-end gap-3">
					<div className="flex flex-col sm:flex-row items-center">
						<Label className="mr-2 text-md">Filtrar por data de início:</Label>
						<input
							type="date"
							value={selectedDate}
							onChange={e => setSelectedDate(e.target.value)}
							className="border rounded p-2 text-gray-700"
						/>
					</div>
					<DeliveryModal />
				</div>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{filteredDeliveries.length > 0 ? (
					filteredDeliveries
						.filter(delivery => delivery.status !== 'Removida')
						.map(delivery => (
							<div
								key={delivery._id}
								className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition cursor-pointer flex flex-col"
							>
								<div className="flex justify-between items-center mb-4">
									<h3 className="text-xl font-semibold text-gray-800">
										Caminhão: {delivery.caminhaoId.modelo}
									</h3>
									<span
										className={`px-3 py-1 text-sm font-bold rounded   ${
											statusStyles[delivery.status]
										}`}
									>
										{delivery.status === 'AguardandoInício'
											? 'Aguardando Início'
											: delivery.status}
									</span>
								</div>
								<p className="text-gray-600 text-sm mb-2">
									<strong>Motorista:</strong> {delivery?.motoristaId?.nome}
								</p>
								<p className="text-gray-600 text-sm mb-2">
									<strong>Tipo de Carga:</strong> {delivery.tipoCarga}
								</p>
								<p className="text-gray-600 text-sm mb-2">
									<strong>Estado:</strong> {delivery.localChegada}
								</p>
								<p className="text-gray-600 text-sm mb-2">
									<strong>Região:</strong> {delivery.regiao}
								</p>
								<p className="text-gray-600 text-sm mb-2">
									<strong>Data de Início:</strong>{' '}
									{new Date(delivery?.dataInicio).toLocaleDateString()} -{' '}
									{new Date(delivery?.dataInicio).toISOString().slice(11, 16)}h
								</p>
								<p className="text-gray-600 text-sm mb-2">
									<strong>Previsão de Entrega:</strong>{' '}
									{new Date(delivery?.dataFim).toLocaleDateString()} - Até às{' '}
									{new Date(delivery?.dataFim).toISOString().slice(11, 16)}h
								</p>
								<p className="text-blue-600 text-lg font-semibold mb-2">
									Valor da Carga: R${' '}
									{delivery.valorCarga.toLocaleString('pt-BR', {
										style: 'currency',
										currency: 'BRL',
									})}
								</p>
								<div className="mt-4 space-y-2 flex-grow">
									{delivery.valiosa && (
										<p className="bg-yellow-100 text-yellow-800 font-medium rounded-sm p-1">
											Carga Valiosa
										</p>
									)}
									{delivery.cargaPerigosa && (
										<p className="text-white font-medium bg-red-500 rounded-sm p-1">
											Carga Perigosa
										</p>
									)}
									{delivery.temSeguro && (
										<p className="bg-green-100 text-green-800 font-medium rounded-sm p-1">
											Com Seguro
										</p>
									)}
								</div>

								<div className="mt-4 flex gap-3 justify-end border-t-[1px] border-slate-300 pt-2">
									<Popover>
										<PopoverTrigger asChild>
											<Button
												className="bg-green-500 hover:bg-green-600"
												onClick={() => handleFinishClick(delivery._id)}
												disabled={
													delivery.status === 'Concluída' ||
													delivery.status === 'AguardandoInício'
														? true
														: false
												}
											>
												Concluir
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-80">
											<div className="flex flex-col gap-4">
												<h3 className="text-lg font-semibold">
													Confirmar Concluir
												</h3>
												<p className="text-sm text-muted-foreground">
													<p className="text-red-500 font-bold">
														Esta ação não poderá ser desfeita e irá concluir
														essa entrega!
													</p>
													Você tem certeza que deseja concluir esta entrega?
												</p>
												<div className="flex justify-end gap-3">
													<Button
														className="bg-yellow-400 hover:bg-yellow-500 text-black"
														onClick={handleConfirmFinish}
													>
														Confirmar
													</Button>
												</div>
											</div>
										</PopoverContent>
									</Popover>
									<Popover>
										<PopoverTrigger asChild>
											<Button
												variant="destructive"
												onClick={() => handleDeleteClick(delivery._id)}
											>
												Excluir
											</Button>
										</PopoverTrigger>
										<PopoverContent className="w-80">
											<div className="flex flex-col gap-4">
												<h3 className="text-lg font-semibold">
													Confirmar Exclusão
												</h3>
												<p className="text-sm text-muted-foreground">
													<p className="text-red-500 font-bold">
														Esta ação não poderá ser desfeita e irá exluir essa
														entrega dos registros!
													</p>
													Você tem certeza que deseja excluir esta entrega?
												</p>
												<div className="flex justify-end gap-3">
													<Button
														variant="destructive"
														onClick={handleConfirmDelete}
													>
														Confirmar
													</Button>
												</div>
											</div>
										</PopoverContent>
									</Popover>
								</div>
							</div>
						))
				) : isFetching ? (
					<SkeletonCard />
				) : (
					<p className="text-gray-600 col-span-full text-center">
						{selectedDate
							? 'Nenhuma entrega encontrada para a data selecionada.'
							: 'Nenhuma entrega disponível.'}
					</p>
				)}
			</div>
		</div>
	);
};

export default Dashboard;
