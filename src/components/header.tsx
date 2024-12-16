'use client';
import Link from 'next/link';

export default function Header() {
	return (
		<div className="flex flex-col order-1 items-center text-center">
			<header className="relative z-50 w-full flex items-center bg-darkRed">
				<div className="w-full border-solid text-right overflow-x-hidden">
					<div className="relative m-0 flex justify-start items-center p-4 py-[20px] bg-none md:bg-sspds-header bg-no-repeat bg-[length:450px] xl:bg-[length:655px] bg-left-bottom">
						<Link
							href="/"
							className="flex justify-start md:justify-center w-fit items-center"
						>
							<div className="text-white pr-5 flex items-center">
								<h1 className="text-xl font-noto">Transport-Manager</h1>
							</div>
						</Link>
					</div>
				</div>
			</header>

			{/* Menu de Navegação */}
			<nav className="w-full bg-darkRed text-white shadow-md">
				<ul className="flex justify-end space-x-6 p-4">
					<li>
						<Link href="/" className="hover:text-orangeText">
							Dashboard
						</Link>
					</li>
					{/* <li>
						<Link href="/routes" className="hover:text-orangeText">
							Rotas
						</Link>
					</li> */}
					<li>
						<Link href="/caminhoes" className="hover:text-orangeText">
							Caminhões
						</Link>
					</li>
					<li>
						<Link href="/motoristas" className="hover:text-orangeText">
							Motoristas
						</Link>
					</li>
				</ul>
			</nav>
		</div>
	);
}
