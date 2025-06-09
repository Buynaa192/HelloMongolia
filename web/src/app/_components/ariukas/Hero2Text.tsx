import { Button } from "@/components/ui/button";

export const Hero2Text = () => {
	return (
		<div className="absolute top-0 w-full h-full text-black py-8 px-8 md:px-16 flex flex-col z-30 items-center gap-12">
			<div className="flex w-full justify-between md:flex-row items-center md:flex flex-col gap-8">
				<div className="w-fit lg:text-left md:text-left text-center">
					<h1 className="lg:text-6xl text-5xl font-extrabold leading-tight ">
						WHY
						<br />
						<span className="block mt-2">
							GO <br /> MON<span className="text-blue-600">GO</span>LIA ?
						</span>
					</h1>
				</div>
				<div className="md:w-1/2 text-[16px] md:text-[18px] lg:text-xl  text-center md:text-left flex flex-col gap-8">
					<p className="w-full text-start">
						Because it's one of the last places on Earth where you can truly
						disconnect—and reconnect. Vast untouched landscapes, ancient
						traditions, and warm-hearted nomadic hospitality offer not just a
						trip, but a transformation.
					</p>
					<p className="w-full">
						If you're seeking something real, raw, and unforgettable, <br />
						<span className="font-bold text-2xl">Mongolia is calling.</span>
					</p>
				</div>
			</div>
			<Button className="w-fit">EXPLORE ALL EXPERIENCES</Button>
		</div>
	);
};
