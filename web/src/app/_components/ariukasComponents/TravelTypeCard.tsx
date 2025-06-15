import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface TravelTypeCardProps {
	title: string;
	imageSrc: string;
	buttonURL: string;
	isFocused?: boolean;
}

export const TravelTypeCard = ({
	title,
	imageSrc,
	buttonURL,
	isFocused = false,
}: TravelTypeCardProps) => {
	const router = useRouter();

	return (
		<div
			className={`relative w-full md:h-[500px] h-[300px] rounded-md overflow-hidden  transition-all duration-300 ease-in-out transform flex items-center ${
				isFocused
					? "scale-110 w-full md:h-[600px] h-[400px] z-10 shadow-2xl"
					: "scale-100 opacity-70"
			}`}>
			<Image src={imageSrc} alt={title} fill className="object-cover" />

			{isFocused ? (
				<div className="w-full h-full absolute inset-0 flex flex-col justify-between items-center p-15 rounded-md">
					<div
						className="absolute top-0 left-0 w-full h-80 pointer-events-none z-10"
						style={{
							background: "linear-gradient(to top, transparent, black)",
						}}
					/>
					<p className="text-white md:text-4xl text-3xl font-bold text-center z-30">
						{title}
					</p>
					<Button
						className="bg-white hover:bg-black hover:text-white"
						onClick={() => router.push(buttonURL)}>
						EXPLORE
					</Button>
				</div>
			) : (
				<>
					<div className="absolute inset-0 bg-black/65" />
					<div className="absolute inset-0 flex flex-col justify-between items-center p-4">
						<p className="text-white text-2xl font-semibold text-center">
							{title}
						</p>
					</div>
				</>
			)}
		</div>
	);
};
