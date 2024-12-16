'use client';
import { IoIosArrowBack } from 'react-icons/io';
import { useRouter } from 'next/navigation';

const BackButton = () => {
	const router = useRouter();
	return (
		<div
			onClick={() => router.back()}
			className="flex my-5 hover:cursor-pointer hover:text-slate-500 font-bold"
		>
			<IoIosArrowBack size={30} />
		</div>
	);
};

export default BackButton;
