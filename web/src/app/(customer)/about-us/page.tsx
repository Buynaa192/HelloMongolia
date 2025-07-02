"use client";

import Image from "next/image";

const teamMembers = [
  {
    name: "Temka",
    image: "/images/temka.jpg",
  },
  {
    name: "Buynaa",
    image: "/images/buyna.jpg",
  },
  {
    name: "Unuu",
    image: "/images/unur.jpg",
  },
  {
    name: "Bulgaa",
    image: "/images/bulgaa.jpg",
  },
  {
    name: "Ariuka",
    image: "/images/ariuka.jpg",
  },
];

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen text-white bg-black">
      <div className="relative w-full h-[70vh] overflow-hidden">
        <Image
          src="https://res.cloudinary.com/df60cobe2/image/upload/v1750858909/w7v8xj5ekbdcciigg5og.jpg"
          alt="Hiking in Mongolia"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-4 text-center bg-black/40">
          <h1 className="text-4xl font-bold text-white md:text-6xl">
            Together,
            <br />
            <span className="font-light">
              we bring Mongolia closer to the world.
            </span>
          </h1>
        </div>
      </div>

      <div className="grid max-w-6xl gap-12 px-4 py-16 mx-auto md:grid-cols-2">
        <div>
          <h2 className="mb-4 text-2xl font-semibold">The Challenge:</h2>
          <p className="text-whiteleading-relaxed">
            Mongolia is a land of breathtaking landscapes, ancient history, and
            a rare nomadic culture found nowhere else. But despite its beauty
            and uniqueness, it`&apos;`s still a hidden gem in the world of
            travel. Why? Because it`&apos;`s far away, not well-promoted
            internationally, and travel information is scattered—making it hard
            for travelers to plan a trip with confidence.
          </p>
        </div>
        <div>
          <h2 className="mb-4 text-2xl font-semibold">Our Solution:</h2>
          <p className="leading-relaxed text-white">
            We`&apos;`re building a smart, easy-to-use digital platform to help
            the world discover Mongolia. Whether you`&apos;`re looking for epic
            nature, cultural adventures, or trusted tour companies, our site
            brings everything together in one place. Even if you have no idea
            where to start, we`&apos;`ll guide you to the perfect route,
            experiences, and local experts—so your journey to Mongolia feels
            closer, safer, and more unforgettable than ever.
          </p>
        </div>
      </div>

      <div className="py-16 bg-white/15">
        <div className="max-w-5xl px-4 mx-auto text-center">
          <h2 className="mb-8 text-3xl font-semibold">Meet our team:</h2>
          <div className="grid items-center justify-center grid-cols-2 gap-6 md:grid-cols-5">
            {teamMembers.map((member, idx) => (
              <div key={idx} className="flex flex-col items-center">
                <div className="relative w-32 h-32 overflow-hidden rounded-full md:w-28 md:h-28">
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

      <div className="max-w-3xl px-6 py-16 mx-auto text-center">
        <h2 className="mb-4 text-2xl font-semibold">Our vision:</h2>
        <p className="text-lg leading-relaxed text-white">
          To make Mongolia one of the world`&apos;`s most sought-after travel
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
          Mongolia`&apos;`s doors to the world— responsibly, sustainably, and
          with the respect its heritage deserves.
        </p>
      </div>
    </div>
  );
}
