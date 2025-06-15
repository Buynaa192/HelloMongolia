"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { TravelTypeCard } from "./TravelTypeCard";
import {
	Carousel,
	CarouselContent,
	CarouselItem,
	CarouselNext,
	CarouselPrevious,
} from "@/components/ui/carousel";
import { type CarouselApi } from "@/components/ui/carousel";

const Types = [
	{
		title: "ADVENTURE",
		image: "/images/ariukasImages/adventure.jpg",
		buttonURL: "",
		description:
			"Adventure travel in Mongolia offers raw, untamed experiences like horseback riding across vast steppes, trekking in the Altai Mountains, or camping under the stars in the Gobi Desert. It’s ideal for thrill-seekers looking to disconnect from modern life. You'll encounter challenging terrain, unpredictable weather, and unforgettable landscapes. Whether it's crossing frozen rivers in winter or climbing remote peaks, Mongolia delivers true wilderness exploration.",
	},
	{
		title: "FAMILY",
		image: "/images/ariukasImages/family.jpg",
		buttonURL: "",
		description:
			"Family travel in Mongolia blends comfort with meaningful cultural experiences. Families can stay in traditional gers, meet nomadic herders, and enjoy gentle activities like camel rides, archery, or yak cart rides. Safe and scenic areas like Khuvsgul Lake or Terelj National Park are great for bonding in nature. The warm hospitality of Mongolian hosts ensures kids and adults alike feel welcome.",
	},
	{
		title: "SCENERY",
		image: "/images/ariukasImages/scenery.jpg",
		buttonURL: "",
		description:
			"Mongolia’s landscapes are as vast as they are varied — from the golden dunes of the Gobi to the alpine beauty of the north. Photographers and nature lovers are drawn to the epic horizons, dramatic skies, and untouched wilderness. Each region offers a distinct visual experience, often with no signs of civilization in sight. Sunrise and sunset here feel like sacred daily rituals in a land without fences.",
	},
	{
		title: "WILDLIFE",
		image: "/images/ariukasImages/wildlife.jpg",
		buttonURL: "",
		description:
			"Mongolia is home to rare and elusive wildlife, including snow leopards, Argali sheep, and wild Bactrian camels. Travelers can track animals in protected areas like Hustai National Park, where Przewalski's horses roam freely. Birdwatchers will delight in seeing steppe eagles and cranes in their natural habitat. With low human interference, Mongolia’s ecosystems remain one of the last true wild places on Earth.",
	},
	{
		title: "CULTURAL",
		image: "/images/ariukasImages/culture.jpg",
		buttonURL: "",
		description:
			"Mongolia’s rich nomadic culture is alive and thriving. Guests are often welcomed into family gers to share milk tea, learn traditional games, and witness daily life that has changed little over centuries. Events like Naadam and Tsagaan Sar reveal the deep pride Mongolians have in their heritage. Travelers leave not just with photos, but with deep connections to people and traditions.",
	},
	{
		title: "HISTORICAL",
		image: "/images/ariukasImages/history.jpg",
		buttonURL: "",
		description:
			"Mongolia’s history stretches from the ancient petroglyphs of the Gobi to the legacy of Genghis Khan and his vast empire. Museums and monuments in Ulaanbaatar offer context, but it’s the landscapes themselves — sacred mountains, ruined monasteries, and caravan trails — that whisper stories of the past. Walking through these sites, you feel part of something timeless. The history here is vast, and very much alive.",
	},
	{
		title: "SCIENTIFIC",
		image: "/images/ariukasImages/science.jpg",
		buttonURL: "",
		description:
			"Mongolia is a treasure trove for scientific exploration, especially in paleontology and geology. The Flaming Cliffs, where dinosaur fossils were first discovered, still yield ancient secrets. Researchers and enthusiasts alike can explore active dig sites and learn about Mongolia’s prehistoric biodiversity. The wide open skies also make Mongolia ideal for astronomy and climate research. It’s a living lab of Earth’s ancient and modern systems.",
	},
];

export const ScrollTypes = () => {
	const [current, setCurrent] = useState(4);
	const [api, setApi] = useState<CarouselApi | null>(null);

	useEffect(() => {
		if (api) {
			const handleSelect = () => {
				setCurrent(api.selectedScrollSnap());
			};

			api.on("select", handleSelect);

			setCurrent(api.selectedScrollSnap());

			return () => {
				api.off("select", handleSelect);
			};
		}
	}, [api]);

	return (
		<div className="w-full h-full flex items-center justify-center flex-col space-y-4">
			<Carousel
				setApi={setApi}
				opts={{ align: "center" }}
				className="w-full md:max-w-6xl max-w-2xl overflow-hidden">
				<CarouselContent className="ml-4">
					{Types.map((item, idx) => (
						<CarouselItem
							key={idx}
							className="md:basis-[400px] basis-[250px] flex flex-col justify-center p-0"
							onMouseEnter={() => api?.scrollTo(idx)}
							onFocus={() => api?.scrollTo(idx)}>
							<TravelTypeCard
								title={item.title}
								imageSrc={item.image}
								buttonURL={item.buttonURL}
								isFocused={idx === current}
							/>
						</CarouselItem>
					))}
				</CarouselContent>
				<CarouselPrevious />
				<CarouselNext />
			</Carousel>
			<AnimatePresence mode="wait">
				<motion.div
					key={Types[current]?.title}
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					transition={{ duration: 0.2 }}
					className="w-full px-4 md:max-w-6xl max-w-2xl flex justify-between items-center text-white mt-4 gap-5">
					<div className="text-3xl font-semibold hidden md:flex">
						{Types[current]?.title}
					</div>
					<div className="italic text-xl md:text-base text-center md:text-left">
						{Types[current]?.description || "No description available."}
					</div>
				</motion.div>
			</AnimatePresence>
		</div>
	);
};
