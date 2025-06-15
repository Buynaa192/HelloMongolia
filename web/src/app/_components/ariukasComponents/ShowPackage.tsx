import { PackageCard } from "./PackageCard";
import { TripReview } from "./TripReview";

export type PackageDetailsType = {
	title: string;
	rating: number;
	destinations: string[];
	activities: string[];
	group: string[];
	cost: number;
	image: string;
	operator: string;
};

export type TourPackageType = {
	trip: PackageDetailsType;
	reviewMessage: string;
};

type BestRatedPackagesProps = {
	topTours: TourPackageType[];
};

export const ShowPackage = ({ topTours }: BestRatedPackagesProps) => {
	return (
		<div className="w-full h-fit flex flex-col gap-6 ">
			{topTours.map((tours, index) => (
				<div
					key={index}
					className={`w-full flex items-center justify-between md:space-y-[-80px] ${
						index % 2 === 0 ? "flex-row" : "flex-row-reverse"
					}`}>
					<PackageCard trip={tours.trip} />
					<TripReview
						title={tours.trip.title}
						reviewMessage={tours.reviewMessage}
						row={index % 2 === 0 ? "left" : "right"}
					/>
				</div>
			))}
		</div>
	);
};
