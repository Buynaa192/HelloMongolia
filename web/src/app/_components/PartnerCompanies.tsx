import { motion } from "framer-motion";
import { HomePageTitle } from "./ariukasComponents/HomePageTitle";
import Image from "next/image";

export const PartnerCompanies = () => {
	const companies = [
		{
			logo: "/images/ariukasImages/antLogo.PNG",
			link: "https://www.ariukas.com",
		},
		{
			logo: "/images/ariukasImages/nteLogo.PNG",
			link: "https://www.nomadictours.mn",
		},
		{
			logo: "/images/ariukasImages/tclLogo.PNG",
			link: "https://www.adventuretours.mn",
		},
		{
			logo: "/images/ariukasImages/tgnLogo.PNG",
			link: "https://www.adventuretours.mn",
		},
		{
			logo: "/images/ariukasImages/wmLogo.PNG",
			link: "https://www.adventuretours.mn",
		},
		{
			logo: "/images/ariukasImages/njLogo.PNG",
			link: "https://www.adventuretours.mn",
		},
	];

	return (
		<div className="w-full h-fit relative flex flex-col items-center mb-12">
			<motion.div
				initial={{ y: 60, opacity: 0 }}
				whileInView={{ y: 0, opacity: 1 }}
				transition={{ duration: 1, ease: "easeOut" }}
				viewport={{ once: true }}>
				<HomePageTitle title="LOCALS EXPERTS WE TRUST" />
			</motion.div>

			<motion.div
				className="w-full grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center md:gap-8"
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
				viewport={{ once: true }}>
				{companies.map(({ logo, link }, index) => (
					<a
						key={index}
						href={link}
						target="_blank"
						rel="noopener noreferrer"
						className=" w-full max-w-[112px] h-28 p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mx-auto flex items-center"
						aria-label="Company logo link">
						<Image
							src={logo}
							alt="Company logo"
							width={112}
							height={112}
							objectFit="contain"
							priority
						/>
					</a>
				))}
			</motion.div>
		</div>
	);
};
