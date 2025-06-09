"use client";

import { Header } from "./_components/ariukas/Header";
import { Hero1 } from "./_components/ariukas/Hero1";
import { Hero2 } from "./_components/ariukas/Hero2";

export default function Home() {
	return (
		<div className="w-full flex flex-col">
			<Header />
			<Hero1 />
			<Hero2 />
		</div>
	);
}
