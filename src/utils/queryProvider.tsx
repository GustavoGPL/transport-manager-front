'use client';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { redirect, usePathname } from 'next/navigation';
import Header from '@/components/header';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { queryClient } from './react-query';

export default function QueryProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<QueryClientProvider client={queryClient}>
			<Header />
			{children}
			<ReactQueryDevtools initialIsOpen={false} />
			<ToastContainer />
		</QueryClientProvider>
	);
}
