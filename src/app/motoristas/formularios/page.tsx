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
import { CardTitle } from '@/components/ui/card';
import BackButton from '@/components/back-button';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { DriversService } from '@/services/models/drivers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { TCreateDriver } from '@/types/drivers';

const formSchema = z.object({
	nome: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
	cpf: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
	telefone: z.string().min(1, {
		message: 'Campo obrigatório',
	}),
});

export default function RegisterSquare() {
	const params = useSearchParams();

	const driverId = params.get('motorista') || '';

	const router = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			nome: '',
			cpf: '',
			telefone: '',
		},
	});

	const fetchDriver = useCallback(async () => {
		try {
			const loadedDriver = await DriversService.getById(driverId);
			if (!loadedDriver) {
				throw new Error();
			}

			form.setValue('nome', loadedDriver?.nome);
			form.setValue('cpf', loadedDriver?.cpf);
			form.setValue('telefone', loadedDriver?.telefone);

			return loadedDriver;
		} catch (error) {
			toast.error('Erro ao carregar motorista', {
				toastId: 'error',
			});
		}
	}, [driverId, form]);

	const {
		data: drivers,
		isPending,
		error,
	} = useQuery({
		queryKey: ['getDriver', driverId],
		queryFn: fetchDriver,
		enabled: Boolean(driverId),
	});

	const createMutation = useMutation({
		mutationFn: (body: TCreateDriver) => {
			if (driverId) {
				return DriversService.update(driverId, body);
			} else {
				return DriversService.create(body);
			}
		},
		onSuccess: data => {
			toast.success(`Motorista ${driverId ? 'editado' : 'cadastrado'}`);
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
						{driverId ? `Editar motorista` : 'Cadastrar motorista'}
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
								name="nome"
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
								name="cpf"
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
								name="telefone"
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
