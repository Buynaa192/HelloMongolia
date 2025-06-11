import { Hero2Text } from "./Hero2Text";

export const Hero2 = () => {
	return (
		<div className="relative h-screen w-full">
			<div
				className="absolute top-0 left-0 w-full md:h-100 h-150 pointer-events-none z-10"
				style={{
					background: "linear-gradient(to top, transparent, white)",
				}}
			/>
			<div className="relative w-full h-full">
				<video
					className="absolute inset-0 w-full h-full object-cover z-0"
					autoPlay
					muted
					loop
					playsInline>
					<source
						src="/images/ariukasImages/18789355-uhd_3840_2160_30fps.mp4"
						type="video/mp4"
					/>
				</video>
				<Hero2Text />
			</div>
			<div
				className="absolute bottom-0 left-0 w-full h-40 pointer-events-none"
				style={{
					background: "linear-gradient(to bottom, transparent, black)",
				}}
			/>
		</div>
	);
};
