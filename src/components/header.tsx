'use client';
import Link from 'next/link';
import { FaTruckLoading } from 'react-icons/fa';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { Button } from './ui/button';
import { signOut, useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

export default function Header() {
	const { data: session } = useSession();
	console.log(session);
	const userImage = session?.user?.image ?? undefined;

	const handleLogin = () => {
		if (!session?.user?.email) {
			redirect('/login');
		} else {
			redirect('/');
		}
	};
	return (
		<div className="flex flex-col w-full">
			<header className="relative z-50 w-full bg-[#2c3e50] shadow-md">
				<div className="w-full text-right overflow-x-hidden">
					<div className="relative flex flex-col gap-10 md:flex-row justify-between items-center p-4 py-6">
						<Link
							href="/"
							className="flex items-center justify-between w-full sm:w-auto"
						>
							<div className="text-white flex justify-between items-center space-x-3 w-full">
								<h1 className="flex flex-row-reverse items-center gap-3 text-2xl font-noto font-semibold tracking-wide">
									<p>
										<p className="text-green-500">Transport</p>
										<p className="text-yellow-500">Manager</p>
									</p>
									<FaTruckLoading size={40} />
								</h1>
								<Popover>
									<PopoverTrigger asChild>
										<Avatar className="w-12 h-12 cursor-pointer block md:hidden">
											<AvatarImage src={userImage} alt="@shadcn" />
											<AvatarFallback className="bg-[#f39c12] text-white font-bold uppercase text-lg">
												{session?.user?.name
													?.split(' ')
													.map(palavra => palavra.substring(0, 1))
													.join('')}
											</AvatarFallback>
										</Avatar>
									</PopoverTrigger>
									<PopoverContent className="mr-3 w-70 flex flex-col gap-4">
										<p className="text-center">{session?.user?.email}</p>
										<p className="flex justify-center">
											<Button
												variant={'outline'}
												onClick={() => {
													signOut();
													handleLogin();
												}}
											>
												Sair
											</Button>
										</p>
									</PopoverContent>
								</Popover>
							</div>
						</Link>

						<div className="flex gap-10">
							<nav className="flex md:flex space-x-8">
								<ul className="flex justify-center flex-col gap-2 md:flex-row md:justify-end items-center text-lg">
									<li>
										<Link
											href="/"
											className="text-white hover:text-[#f39c12] transition duration-300 ease-in-out px-3 py-2 rounded-lg hover:bg-[#f39c12] hover:bg-opacity-20"
										>
											Dashboard
										</Link>
									</li>
									<li>
										<Link
											href="/caminhoes"
											className="text-white hover:text-[#f39c12] transition duration-300 ease-in-out px-3 py-2 rounded-lg hover:bg-[#f39c12] hover:bg-opacity-20"
										>
											Caminhões
										</Link>
									</li>
									<li>
										<Link
											href="/motoristas"
											className="text-white hover:text-[#f39c12] transition duration-300 ease-in-out px-3 py-2 rounded-lg hover:bg-[#f39c12] hover:bg-opacity-20"
										>
											Motoristas
										</Link>
									</li>
								</ul>
							</nav>

							<Popover>
								<PopoverTrigger asChild>
									<Avatar className="w-12 h-12 cursor-pointer hidden md:block">
										<AvatarImage src={userImage} alt="@shadcn" />
										<AvatarFallback className="bg-[#f39c12] text-white font-bold uppercase text-lg">
											{session?.user?.name
												?.split(' ')
												.map(palavra => palavra.substring(0, 1))
												.join('')}
										</AvatarFallback>
									</Avatar>
								</PopoverTrigger>
								<PopoverContent className="mr-3 w-70 flex flex-col gap-4">
									<p className="text-center">{session?.user?.email}</p>
									<p className="flex justify-center">
										<Button
											onClick={() => {
												signOut();
												handleLogin();
											}}
											className=""
										>
											Sair
										</Button>
									</p>
								</PopoverContent>
							</Popover>
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
