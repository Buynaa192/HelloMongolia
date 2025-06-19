import { motion } from "framer-motion";
import Image from "next/image";
import { HomePageTitle } from "./HomePageTitle";

export const PartnerCompanies = () => {
  const companies = [
    {
      logo: "https://res.cloudinary.com/df60cobe2/image/upload/v1750327943/nteLogo_jthqil.png",
      link: "https://www.ariukas.com",
    },
    {
      logo: "https://res.cloudinary.com/df60cobe2/image/upload/v1750327943/nteLogo_jthqil.png",
      link: "https://www.nomadictours.mn",
    },
    {
      logo: "https://res.cloudinary.com/df60cobe2/image/upload/v1750327943/nteLogo_jthqil.png",
      link: "https://www.adventuretours.mn",
    },
    {
      logo: "https://res.cloudinary.com/df60cobe2/image/upload/v1750327943/nteLogo_jthqil.png",
      link: "https://www.adventuretours.mn",
    },
    {
      logo: "https://res.cloudinary.com/df60cobe2/image/upload/v1750327943/nteLogo_jthqil.png",
      link: "https://www.adventuretours.mn",
    },
    {
      logo: "https://res.cloudinary.com/df60cobe2/image/upload/v1750327943/nteLogo_jthqil.png",
      link: "https://www.adventuretours.mn",
    },
  ];

  return (
    <div className="w-full h-fit relative flex flex-col items-center mb-25">
      <motion.div
        initial={{ y: 60, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <HomePageTitle title="LOCALS EXPERTS WE TRUST" />
      </motion.div>

      <motion.div
        className="w-full grid grid-cols-2 gap-6 md:flex md:flex-wrap md:justify-center md:gap-8"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeOut", delay: 0.2 }}
        viewport={{ once: true }}
      >
        {companies.map(({ logo, link }, index) => (
          <a
            key={index}
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className=" w-full max-w-[112px] h-28 p-2 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 mx-auto flex items-center"
            aria-label="Company logo link"
          >
            <Image
              src={logo}
              alt="Company logo"
              width={112}
              height={112}
              priority
            />
          </a>
        ))}
      </motion.div>
    </div>
  );
};
