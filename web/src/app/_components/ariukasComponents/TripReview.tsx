type TripReviewProps = {
	title: string;
	reviewMessage: string;
	row?: "left" | "right";
};

export const TripReview = ({ title, reviewMessage, row }: TripReviewProps) => {
	return (
		<div
			className={`hidden md:flex w-full h-full p-6 flex-col justify-start text-white gap-12 ${
				row === "right" ? "items-end text-right" : "items-start text-left"
			}`}>
			<h1 className="text-2xl font-semibold">{title}</h1>
			<p className="text-xl italic">{reviewMessage}</p>
		</div>
	);
};
