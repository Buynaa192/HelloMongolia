import Image from "next/image";
import { HomePageTitle } from "./HomePageTitle";
import { ScrollTypes } from "./ScrollTypes";
import { motion } from "framer-motion";

export const ChooseTravelType = () => {
	return (
		<div className="w-full h-screen flex flex-col space-y-12">
			<motion.div
				initial={{ y: 60, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}
				viewport={{ once: true }}>
				<HomePageTitle title="TAILORED TRAVELS" />
			</motion.div>

			<div className="w-full relative flex items-center justify-center overflow-hidden">
				<Image
					src="/images/ariukasImages/blackmts.jpg"
					alt="backgroundSky"
					fill
					className="object-cover"
					priority
				/>

				<div
					className="absolute top-0 left-0 w-full md:h-80 h-120 pointer-events-none z-10"
					style={{
						background: "linear-gradient(to top, transparent, black)",
					}}
				/>

				<div className="absolute inset-0 bg-black/60 z-10" />

				<motion.div
					initial={{ scale: 0.95, opacity: 0 }}
					whileInView={{ scale: 1, opacity: 1 }}
					transition={{ duration: 1, ease: "easeOut", delay: 0.3 }}
					viewport={{ once: true }}
					className="w-full h-full z-20 flex items-center justify-center">
					<ScrollTypes />
				</motion.div>
			</div>
		</div>
	);
};
