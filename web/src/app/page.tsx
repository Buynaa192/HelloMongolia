"use client";

import { Header } from "./_components/ariukasComponents/Header";
import { Hero1 } from "./_components/ariukasComponents/Hero1";
import { Hero2 } from "./_components/ariukasComponents/Hero2";
import { TopRatedPackages } from "./_components/ariukasComponents/TopRatedPackages";
import { TopDestinationsHero } from "./_components/ariukasComponents/TopDestinations";
import { ChooseTravelType } from "./_components/ariukasComponents/TravelType";
import { PartnerCompanies } from "./_components/PartnerCompanies";
import { Footer } from "./_components/ariukasComponents/Footer";

export default function Home() {
	return (
		<div className="w-full flex flex-col">
			<Header />
			<Hero1 />
			<Hero2 />
			<TopDestinationsHero />
			<ChooseTravelType />
			<TopRatedPackages />
			<PartnerCompanies />
			<Footer />
		</div>
	);
}
