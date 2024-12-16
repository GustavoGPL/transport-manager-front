import React from 'react';
import Image from 'next/image';

function NotFound() {
	return (
		<div className="defaultPage">
			<Image
				className="w-28"
				width={120}
				height={120}
				alt=""
				src="https://www.iconpacks.net/icons/2/free-sad-face-icon-2691-thumb.png"
				priority={true}
			/>
			<div>
				<h1>Página não encontrada!</h1>
			</div>
		</div>
	);
}

export default NotFound;
