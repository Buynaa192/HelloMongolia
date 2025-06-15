import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Star } from "lucide-react";
import { PackageDetailsType } from "./ShowPackage";
import Link from "next/link";

export type PackageCardProps = {
	trip: PackageDetailsType;
};

export const PackageCard = ({ trip }: PackageCardProps) => {
	return (
		<Card className="relative text-white md:h-[400px] h-[400px] w-full max-w-4xl mx-auto overflow-hidden shadow-xl border-0 ">
			<Image
				src={trip.image}
				alt="nature photo"
				fill
				className="object-cover"
				priority
			/>
			<div className="absolute inset-0 bg-black/65" />
			<CardContent className="relative z-10 flex flex-col justify-between h-full text-center md:text-start">
				<div>
					<h2 className="w-full text-center lg:text-4xl text-3xl font-bold mb-2">
						{trip.title}
					</h2>
					<div className="flex items-center mb-4 justify-center">
						{Array.from({ length: trip.rating }).map((_, i) => (
							<Star
								key={i}
								className="text-yellow-400 w-5 h-5 fill-yellow-400 mr-1"
							/>
						))}
					</div>
					<div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:text-sm  text-gray-200">
						<div className="flex flex-col gap-2 ">
							<h3 className="font-semibold">Destinations</h3>
							<ul className="hidden md:flex flex-col  list-disc ml-4 italic">
								{trip.destinations.map((dest, i) => (
									<li key={i}>{dest}</li>
								))}
							</ul>
							<div className="flex flex-col md:hidden italic ">
								{trip.destinations.map((dest, i) => (
									<p key={i}>{dest}</p>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="font-semibold items-center">Activities</h3>
							<ul className="hidden md:flex flex-col list-disc ml-4 italic ">
								{trip.activities.map((act, i) => (
									<li key={i}>{act}</li>
								))}
							</ul>
							<div className="flex flex-col md:hidden italic">
								{trip.activities.map((act, i) => (
									<p key={i}>{act}</p>
								))}
							</div>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="font-semibold">Group</h3>
							<p className="italic">{trip.group.join(", ")}</p>
						</div>
						<div className="flex flex-col gap-2">
							<h3 className="font-semibold">Cost</h3>
							<div className="text-lg font-bold">
								${trip.cost} {""}
								<div className="hidden md:inline ">
									<br />
								</div>
								<span className="text-sm font-normal italic">per person</span>
							</div>
						</div>
					</div>
				</div>

				<div className="hidden md:flex items-center justify-between mt-6">
					<Button
						asChild
						variant="link"
						className="text-black bg-white hover:bg-black hover:text-white">
						<Link
							href={`/packages/${trip.title
								.replace(/\s+/g, "-")
								.toLowerCase()}`}>
							View details
						</Link>
					</Button>
					<p className="text-xs text-gray-300">
						Tour Operator:{" "}
						<Link
							href={`/operators/${trip.operator
								.replace(/\s+/g, "-")
								.toLowerCase()}`}
							className="hover:underline hover:text-white transition-colors flex flex-nowrap">
							{trip.operator}
						</Link>
					</p>
				</div>
			</CardContent>
		</Card>
	);
};
