import { ShowRegion } from "./HomeDestination";
import { HomePageTitle } from "./HomePageTitle";
import { motion } from "framer-motion";

export const TopDestinationsHero = () => {
	const regions = [
		{
			name: "Southern Mongolia/ Gobi",
			video: "/images/ariukasImages/Govivideo.mp4",
		},
		{
			name: "Northern Mongolia",
			video: "/images/ariukasImages/hangaivideo.mp4",
		},
		{
			name: "Western Mongolia",
			video: "/images/ariukasImages/ulgiiVideo.mp4",
		},
		{
			name: "Eastern Mongolia",
			video: "/images/ariukasImages/zuunVideo.mp4",
		},
	];

	return (
		<div className="w-full h-fit relative flex flex-col">
			<HomePageTitle title="TOP DESTINATIONS" />

			<div className="w-full h-full flex flex-col relative z-20">
				{regions.map((region, index) => (
					<motion.div
						key={index}
						initial={{ y: 90, opacity: 0 }}
						whileInView={{ y: 0, opacity: 1 }}
						transition={{ duration: 1, ease: "easeOut", delay: index * 0.2 }}
						viewport={{ once: true, amount: 0.3 }}>
						<ShowRegion videoSource={region.video} regionName={region.name} />
					</motion.div>
				))}
			</div>
		</div>
	);
};
