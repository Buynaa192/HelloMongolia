import Image from "next/image";
import { Hero2Text } from "./Hero2Text";
import { Videos } from "./Videos";

export const Hero2 = () => {
	return (
		<div className="relative h-screen w-full ">
			<div
				className="absolute top-0 left-0 w-full h-150 pointer-events-none z-10"
				style={{
					background: "linear-gradient(to top, transparent, white)",
				}}
			/>
			<div className="relative w-full h-full">
				<Image
					src="/images/ariukasImages/Mongolgerdrone.jpg"
					alt="Mongolian ger"
					fill
					className="object-cover"
					priority
				/>
			</div>
			<Hero2Text />
			<Videos />
		</div>
	);
};
