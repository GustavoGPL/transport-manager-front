'use client';
import Link from 'next/link';
import { FaTruckLoading } from 'react-icons/fa';

export default function Header() {
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
						</div>
					</div>
				</div>
			</header>
		</div>
	);
}
