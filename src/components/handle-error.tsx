import { PiSmileySad } from 'react-icons/pi';

export const HandleError = ({ message }: { message: string }) => {
	return (
		<div className="bg-red-400 rounded-md text-center h-max w-full p-4">
			<PiSmileySad size={30} />
			<h1>Ocorreu um erro interno no sistema, recarregue a página!</h1>
		</div>
	);
};
