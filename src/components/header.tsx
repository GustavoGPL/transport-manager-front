'use client';
import Link from 'next/link';

export default function Header() {
	return (
		<div className="flex flex-col w-full">
			<header className="relative z-50 w-full bg-[#2c3e50] shadow-md">
				<div className="w-full text-right overflow-x-hidden">
					<div className="relative flex justify-between items-center p-4 py-6">
						{/* Logo e título */}
						<Link
							href="/"
							className="flex items-center justify-between w-full sm:w-auto"
						>
							<div className="text-white flex items-center space-x-3">
								<h1 className="text-2xl font-noto font-semibold tracking-wide">
									Transport-Manager
								</h1>
							</div>
						</Link>

						{/* Navegação */}
						<nav className="hidden md:flex space-x-8">
							<ul className="flex justify-center md:justify-end items-center space-x-8 text-lg">
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
			</header>

			{/* Menu para dispositivos móveis */}
			<div className="md:hidden">
				<div className="flex justify-between p-4">
					<Link
						href="/"
						className="text-white text-2xl font-noto font-semibold"
					>
						Transport-Manager
					</Link>
					<button className="text-white focus:outline-none">
						{/* Icone de menu (para abrir o menu mobile) */}
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M4 6h16M4 12h16M4 18h16"
							/>
						</svg>
					</button>
				</div>
				{/* Aqui podemos colocar um menu dropdown, se necessário */}
			</div>
		</div>
	);
}
