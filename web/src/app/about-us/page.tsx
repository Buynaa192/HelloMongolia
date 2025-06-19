"use client";

import Image from "next/image";
import { BackToHomePathButtons } from "../_components/ariukasComponents/BackToHomePagePathButtons";

const teamMembers = [
  { name: "Member One", image: "" },
  { name: "Member Two", image: "" },
  { name: "Member Three", image: "" },
  { name: "Member Four", image: "" },
  { name: "Member Five", image: "" },
  { name: "Member Six", image: "" },
];

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-black text-white">
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src=""
          alt="Hiking in Mongolia"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/40 flex flex-col justify-center items-center text-center px-4">
          <h1 className="text-4xl md:text-6xl font-bold text-white">
            Together,
            <br />
            <span className="font-light">
              we bring Mongolia closer to the world.
            </span>
          </h1>
        </div>
      </div>
      <BackToHomePathButtons />
      <div className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">The Challenge:</h2>
          <p className="text-whiteleading-relaxed">
            Mongolia is a land of breathtaking landscapes, ancient history, and
            a rare nomadic culture found nowhere else. But despite its beauty
            and uniqueness, it's still a hidden gem in the world of travel. Why?
            Because it’s far away, not well-promoted internationally, and travel
            information is scattered—making it hard for travelers to plan a trip
            with confidence.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Solution:</h2>
          <p className="text-white leading-relaxed">
            We're building a smart, easy-to-use digital platform to help the
            world discover Mongolia. Whether you're looking for epic nature,
            cultural adventures, or trusted tour companies, our site brings
            everything together in one place. Even if you have no idea where to
            start, we'll guide you to the perfect route, experiences, and local
            experts—so your journey to Mongolia feels closer, safer, and more
            unforgettable than ever.
          </p>
        </div>
      </div>

      <div className="bg-white/15 py-16">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-semibold mb-8">Meet our team:</h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-6 justify-center items-center">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <p className="mt-2 text-sm font-medium text-white">
                  {member.name}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16 text-center">
        <h2 className="text-2xl font-semibold mb-4">Our vision:</h2>
        <p className="text-white leading-relaxed text-lg">
          To make Mongolia one of the world’s most sought-after travel
          destinations—celebrated for its untouched landscapes, ancient culture,
          and the enduring spirit of its nomadic people.
          <br />
          <br />
          We envision a world where Mongolia is not just discovered, but deeply
          experienced. Where travelers from every corner of the globe come to
          connect with something real, raw, and unforgettable.
          <br />
          <br />
          Through innovation, collaboration, and passion, we aim to open
          Mongolia’s doors to the world— responsibly, sustainably, and with the
          respect its heritage deserves.
        </p>
      </div>
    </div>
  );
}
