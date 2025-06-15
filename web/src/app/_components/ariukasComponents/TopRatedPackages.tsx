import { ShowPackage } from "./ShowPackage";
import { HomePageTitle } from "./HomePageTitle";
import { motion } from "framer-motion";

export const TopRatedPackages = () => {
	const tourPackagesWithReviews = [
		{
			trip: {
				title: "7-Day Altai Tour",
				rating: 5,
				destinations: ["Altai Tavan Bogd", "Ulgii"],
				activities: [
					"Horseriding",
					"Camping",
					"Hiking",
					"Nomadic Family visit",
					"Walking",
				],
				group: ["Solo", "Private", "Family", "Friends"],
				cost: 5775,
				image: "/images/ariukasImages/altai_mountains.jpg",
				operator: "Nomads Tours Expeditions",
			},
			reviewMessage:
				"An unforgettable journey through the majestic Altai Mountains, with breathtaking views and rich cultural experiences.",
		},
		{
			trip: {
				title: "10-Day Gobi & Steppe Expedition",
				rating: 4,
				destinations: ["Gobi Desert", "Bayanzag", "Orkhon Valley"],
				activities: [
					"Camel riding",
					"Ger stay",
					"Stargazing",
					"Cultural encounters",
					"Hiking",
				],
				group: ["Private", "Couples", "Families"],
				cost: 6890,
				image: "/images/ariukasImages/onRoad.jpg",
				operator: "Blue Sky Nomads",
			},
			reviewMessage:
				"Exploring the vast Gobi and its dramatic landscapes was the highlight of our trip — truly a soul-refreshing adventure!",
		},
		{
			trip: {
				title: "5-Day Khuvsgul Lake Getaway",
				rating: 5,
				destinations: ["Khuvsgul Lake", "Murun", "Tsaatan Camp"],
				activities: [
					"Boating",
					"Horseback riding",
					"Reindeer herder visit",
					"Nature walks",
				],
				group: ["Solo", "Families", "Small groups"],
				cost: 4650,
				image: "/images/ariukasImages/KhusgulLakeWinter.jpg",
				operator: "Northern Trails Mongolia",
			},
			reviewMessage:
				"The tranquility of Khuvsgul Lake and meeting the Tsaatan people made this a magical and deeply meaningful retreat.",
		},
	];

	return (
		<div className="w-full h-fit relative flex flex-col md:mb-20 md:10">
			<motion.div
				initial={{ y: 60, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}
				viewport={{ once: true }}>
				<HomePageTitle title="BEST-SELLING PACKAGES" />
			</motion.div>

			<motion.div
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
				viewport={{ once: true }}>
				<ShowPackage topTours={tourPackagesWithReviews} />
			</motion.div>
		</div>
	);
};
