import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';

import {
	Command,
	CommandEmpty,
	CommandGroup,
	CommandInput,
	CommandItem,
	CommandList,
} from '@/components/ui/command';

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import { DriversService } from '@/services/models/drivers';
import { TruckService } from '@/services/models/trucks';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { cn } from '@/lib/utils';
import { Check, ChevronsUpDown } from 'lucide-react';
import { estadosDoBrasil } from '@/utils/functions';
import { TCreateDelivery } from '@/types/deliveries';
import { DeliveriesService } from '@/services/models/deliveries';
import { toast } from 'react-toastify';
import { queryClient } from '@/utils/react-query';

const formSchema = z.object({
	caminhaoId: z.string().min(1, {
		message: 'Caminhão é obrigatório',
	}),
	motoristaId: z.string().min(1, {
		message: 'Motorista é obrigatório',
	}),
	tipoCarga: z.string().min(1, {
		message: 'Tipo da carga é obrigatório',
	}),
	valorCarga: z.string().min(1, {
		message: 'Valor da carga deve ser maior que zero',
	}),
	localChegada: z.string().min(1, {
		message: 'Local de chegada é obrigatório',
	}),
	regiao: z.string().min(1, {
		message: 'Região é obrigatória',
	}),
	dataInicio: z
		.string()
		.min(1, {
			message: 'Data de início é obrigatória',
		})
		.refine(date => !isNaN(Date.parse(date)), {
			message: 'Data de início deve ser válida',
		}),
	dataFim: z
		.string()
		.min(1, {
			message: 'Data de fim é obrigatória',
		})
		.refine(date => !isNaN(Date.parse(date)), {
			message: 'Data de fim deve ser válida',
		}),
	temSeguro: z.string(),
});

export function DeliveryModal() {
	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			caminhaoId: '',
			motoristaId: '',
			tipoCarga: '',
			valorCarga: '',
			localChegada: '',
			regiao: '',
			dataInicio: '',
			dataFim: '',
		},
	});

	const { data: caminhoes } = useQuery({
		queryKey: ['getTrucks'],
		queryFn: () => {
			return TruckService.getAll();
		},
	});

	const { data: motoristas } = useQuery({
		queryKey: ['getDrivers'],
		queryFn: () => {
			return DriversService.getAll();
		},
	});

	const createDeliveryMutation = useMutation({
		mutationFn: (body: TCreateDelivery) => DeliveriesService.create(body),
		onSuccess: () => {
			toast.success(`Entrega criada com sucesso`);
			queryClient.invalidateQueries({
				queryKey: ['getDeliveries'],
			});
			queryClient.invalidateQueries({
				queryKey: ['getTrucks'],
			});
		},
		onError: (error: any) => {
			toast.error(error.response.data.message);
		},
	});

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			const processedValues = {
				...values,
				valorCarga: parseFloat(values.valorCarga),
			};
			createDeliveryMutation.mutate(processedValues);
			console.log(processedValues);
		},
		[createDeliveryMutation]
	);

	return (
		<Dialog>
			<DialogTrigger asChild>
				<Button className="bg-green-500 hover:bg-green-600">
					Nova Entrega
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[800px]">
				<DialogHeader>
					<DialogTitle>Criar Entrega</DialogTitle>
				</DialogHeader>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-5"
					>
						<div className="grid md:grid-cols-2 gap-5">
							<FormField
								control={form.control}
								name="caminhaoId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Caminhão *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o caminhão" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{caminhoes
													?.filter(caminhao => caminhao.status !== 'Em uso')
													.map(caminhao => (
														<SelectItem value={caminhao._id} key={caminhao._id}>
															{caminhao.modelo}
														</SelectItem>
													))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="motoristaId"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Motorista *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o motorista" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												{motoristas?.map(motorista => (
													<SelectItem value={motorista._id} key={motorista._id}>
														{motorista.nome}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="tipoCarga"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Tipo Carga *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione o tipo de carga" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Eletrônicos">Eletrônicos</SelectItem>
												<SelectItem value="Combustível">Combustível</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="temSeguro"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Seguro *</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Tem seguro ?" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="true">Sim</SelectItem>
												<SelectItem value="false">Não</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="valorCarga"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Valor da Carga *</FormLabel>
										<FormControl>
											<Input
												type="number"
												placeholder="Digite o valor da carga"
												className="grid-cols-2 md:grid-cols-1"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<div className="flex items-center">
								<FormField
									control={form.control}
									name="localChegada"
									render={({ field }) => (
										<FormItem className="flex flex-col w-full">
											<FormLabel>Local Chegada</FormLabel>
											<Popover>
												<PopoverTrigger asChild>
													<FormControl>
														<Button
															variant="outline"
															role="combobox"
															className={cn(
																'justify-between',
																!field.value && 'text-muted-foreground'
															)}
														>
															{field.value
																? estadosDoBrasil.find(
																		estado => estado.sigla === field.value
																  )?.nome
																: 'Selecione o destino'}
															<ChevronsUpDown className="opacity-50" />
														</Button>
													</FormControl>
												</PopoverTrigger>
												<PopoverContent className="w-[200px] p-0">
													<Command>
														<CommandInput
															placeholder="Search framework..."
															className="h-9"
														/>
														<CommandList>
															<CommandEmpty>Estado não encontrado</CommandEmpty>
															<CommandGroup>
																{estadosDoBrasil.map(estado => (
																	<CommandItem
																		value={estado.nome}
																		key={estado.sigla}
																		onSelect={() => {
																			form.setValue(
																				'localChegada',
																				estado.sigla
																			);
																		}}
																	>
																		{estado.nome}
																		<Check
																			className={cn(
																				'ml-auto',
																				estado.sigla === field.value
																					? 'opacity-100'
																					: 'opacity-0'
																			)}
																		/>
																	</CommandItem>
																))}
															</CommandGroup>
														</CommandList>
													</Command>
												</PopoverContent>
											</Popover>
											<FormMessage />
										</FormItem>
									)}
								/>
							</div>

							<FormField
								control={form.control}
								name="regiao"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Região</FormLabel>
										<Select
											onValueChange={field.onChange}
											defaultValue={field.value}
										>
											<FormControl>
												<SelectTrigger>
													<SelectValue placeholder="Selecione a região de entrega" />
												</SelectTrigger>
											</FormControl>
											<SelectContent>
												<SelectItem value="Norte">Norte</SelectItem>
												<SelectItem value="Nordeste">Nordeste</SelectItem>
												<SelectItem value="Centro-Oeste">
													Centro-Oeste
												</SelectItem>
												<SelectItem value="Sudeste">Sudeste</SelectItem>
												<SelectItem value="Sul">Sul</SelectItem>
												<SelectItem value="Amazônia">Amazônia</SelectItem>
												<SelectItem value="Argentina">Argentina</SelectItem>
											</SelectContent>
										</Select>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="dataInicio"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Data de Início *</FormLabel>
										<FormControl>
											<Input
												type="date"
												className="grid-cols-2 md:grid-cols-1"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>

							<FormField
								control={form.control}
								name="dataFim"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Data de Fim *</FormLabel>
										<FormControl>
											<Input
												type="date"
												className="grid-cols-2 md:grid-cols-1"
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						<span className="flex justify-center">
							<Button
								type="submit"
								className="w-[300px] bg-green-500 hover:bg-green-600"
							>
								Salvar
							</Button>
						</span>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
