'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Card, CardTitle } from '@/components/ui/card';
import BackButton from '@/components/back-button';
import { useCallback, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import { DriversService } from '@/services/models/drivers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TCreateDriver } from '@/types/drivers';
import { TruckService } from '@/services/models/trucks';
import { TCreateTruck } from '@/types/trucks';

const formSchema = z.object({
	placa: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
	modelo: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
	capacidade: z.number().min(1, {
		message: 'Campo obrigatório',
	}),
});

export default function RegisterSquare() {
	const params = useSearchParams();

	const caminhaoId = params.get('caminhao') || '';

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			placa: '',
			modelo: '',
			capacidade: undefined,
		},
	});

	const fetchCaminhao = useCallback(async () => {
		try {
			const loadedTruck = await TruckService.getById(caminhaoId);
			if (!loadedTruck) {
				throw new Error();
			}

			form.setValue('placa', loadedTruck?.placa);
			form.setValue('modelo', loadedTruck?.modelo);
			// form.setValue('capacidade', loadedTruck?.capacidade);

			return loadedTruck;
		} catch (error) {
			toast.error('Erro ao carregar motorista', {
				toastId: 'error',
			});
		}
	}, [caminhaoId, form]);

	const {
		data: caminhao,
		isPending,
		error,
	} = useQuery({
		queryKey: ['getCaminhao', caminhaoId],
		queryFn: fetchCaminhao,
		enabled: Boolean(caminhaoId),
	});

	const createMutation = useMutation({
		mutationFn: (body: TCreateTruck) => {
			if (caminhaoId) {
				return TruckService.update(caminhaoId, body);
			} else {
				return TruckService.create(body);
			}
		},
		onSuccess: data => {
			toast.success(`Motorista ${caminhaoId ? 'editado' : 'cadastrado'}`);
			router.push('/motoristas');
		},
		onError: err => {
			console.error(err);
			toast.error('Erro ao cadastrar motorista. tente novamente', {
				toastId: 'error',
			});
		},
	});

	const onSubmit = useCallback(
		(values: z.infer<typeof formSchema>) => {
			console.log(values);
			createMutation.mutate(values);
		},
		[createMutation]
	);

	return (
		<div className="flex h-full flex-1 order-2 sm:order-3  flex-col items-center bg-opacity-50 mt-10">
			<div className="bg-white w-full lg:w-table_width rounded-lg shadow-md flex flex-col px-10 py-2 md:p-8 mb-4 items-center">
				<div className="w-full flex flex-row gap-5 items-center">
					<BackButton />
					<CardTitle className="text-center font-bold text-[#121D31] text-xl md:text-2xl">
						{caminhaoId ? `Editar caminhão` : 'Cadastrar caminhão'}
					</CardTitle>
				</div>
				<Form {...form}>
					<form
						onSubmit={form.handleSubmit(onSubmit)}
						className="w-full flex flex-col gap-5"
					>
						<div className="grid md:grid-cols-2 gap-5">
							<FormField
								control={form.control}
								name="placa"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Nome *</FormLabel>
										<FormControl>
											<Input
												placeholder="Nome do motorista"
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
								name="modelo"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Cpf *</FormLabel>
										<FormControl>
											<Input
												placeholder="Cpf do motorista"
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
								name="capacidade"
								render={({ field }) => (
									<FormItem>
										<FormLabel>Telefone *</FormLabel>
										<FormControl>
											<Input
												placeholder="telefone do motorista"
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
			</div>
		</div>
	);
}
