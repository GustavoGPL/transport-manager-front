import { TDelivery } from '@/types/deliveries';
import React from 'react';
import { DeliveryModal } from './deliveryModal';

type DashboardProps = {
	deliveries: TDelivery[];
	refetch: () => void;
};

const statusStyles = {
	Pendente: 'bg-yellow-100 text-yellow-800',
	Concluída: 'bg-green-100 text-green-800',
};

const Dashboard: React.FC<DashboardProps> = ({ deliveries, refetch }) => {
	return (
		<div className="p-6">
			<div className="flex justify-between">
				<h2 className="text-3xl font-bold text-gray-800 mb-8">
					Minhas Entregas
				</h2>
				<DeliveryModal refetchDeliveries={refetch} />
			</div>
			<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
				{deliveries?.map(delivery => (
					<div
						key={`${delivery?.caminhaoId?._id}-${delivery?.motoristaId?._id}`}
						className="p-4 border border-gray-200 rounded-lg shadow-lg bg-white hover:shadow-xl transition cursor-pointer"
					>
						<div className="flex justify-between items-center mb-4">
							<h3 className="text-xl font-semibold text-gray-800">
								Caminhão: {delivery.caminhaoId.modelo}
							</h3>
							<span
								className={`px-3 py-1 text-sm font-medium rounded ${
									statusStyles[delivery.status]
								}`}
							>
								{delivery.status}
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
						<p className="text-blue-600 text-lg font-semibold mb-2">
							Valor: R$ {delivery.valorCarga.toFixed(2)}
						</p>
						<p className="text-gray-600 text-sm mb-2">
							<strong>Data de Início:</strong>{' '}
							{new Date(delivery?.dataInicio).toLocaleDateString()}
						</p>
						<p className="text-gray-600 text-sm mb-2">
							<strong>Prazo de Entrega:</strong>{' '}
							{new Date(delivery?.dataFim).toLocaleDateString()}
						</p>
						<div className="mt-4 space-y-2">
							{delivery.valiosa && (
								<p className="text-white font-medium bg-yellow-300 rounded-sm p-1">
									Carga Valiosa
								</p>
							)}
							{delivery.cargaPerigosa && (
								<p className="text-red-600 font-medium  bg-red-500 rounded-sm p-1">
									Carga Perigosa
								</p>
							)}
							{delivery.temSeguro && (
								<p className="text-white font-medium bg-green-400 rounded-sm p-1">
									Com Seguro
								</p>
							)}
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default Dashboard;
