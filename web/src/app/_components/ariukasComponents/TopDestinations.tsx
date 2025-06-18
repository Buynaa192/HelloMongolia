import { ShowRegion } from "./HomeDestination";
import { HomePageTitle } from "./HomePageTitle";
import { motion } from "framer-motion";

export const TopDestinationsHero = () => {
  const regions = [
    {
      name: "Southern Mongolia/ Gobi",
      video: "/images/ariukasImages/Govivideo.mp4",
      details:
        "Discover ancient culture, vast landscapes, and incredible wildlife.",
      destinations: [
        {
          name: "🧱 Flaming Cliffs",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "Famous for stunning red sandstone cliffs and dinosaur fossils.",
          activities: [
            "🦕 Dinosaur fossil tours",
            "🥾 Hiking",
            "📸 Photography",
            "🏕️ Camping under the stars",
          ],
          weather: [
            { season: "Summer", averageTemperature: "25°C" },
            { season: "Winter", averageTemperature: "-15°C" },
            { season: "Autumn", averageTemperature: "10°C" },
            { season: "Spring", averageTemperature: "5°C" },
          ],
        },
        {
          name: "🏜️ Khongoryn Els",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "Also called the Singing Dunes, largest sand dunes in Mongolia.",
          activities: [
            "🏜️ Sand dune trekking",
            "🎶 Listening to the dunes 'sing'",
            "🐪 Camel riding",
            "🌅 Sunset watching",
          ],
          weather: [
            { season: "Summer", averageTemperature: "30°C" },
            { season: "Winter", averageTemperature: "-20°C" },
            { season: "Autumn", averageTemperature: "15°C" },
            { season: "Spring", averageTemperature: "10°C" },
          ],
        },
        {
          name: "🦖 Bayanzag",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "Known for paleontological discoveries and unique desert landscapes.",
          activities: [
            "🦴 Fossil hunting",
            "📚 Guided history tours",
            "🚶 Desert walking",
            "📷 Landscape photography",
          ],
          weather: [
            { season: "Summer", averageTemperature: "28°C" },
            { season: "Winter", averageTemperature: "-18°C" },
            { season: "Autumn", averageTemperature: "12°C" },
            { season: "Spring", averageTemperature: "7°C" },
          ],
        },
        {
          name: "❄️ Yolyn Am",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description: "A deep and narrow gorge with a permanent ice field.",
          activities: [
            "🥾 Hiking",
            "❄️ Ice field exploration",
            "🦅 Bird watching",
            "🌲 Nature walks",
          ],
          weather: [
            { season: "Summer", averageTemperature: "20°C" },
            { season: "Winter", averageTemperature: "-25°C" },
            { season: "Autumn", averageTemperature: "8°C" },
            { season: "Spring", averageTemperature: "4°C" },
          ],
        },
      ],
    },
    {
      name: "Northern Mongolia",
      video: "/images/ariukasImages/hangaivideo.mp4",
      details:
        "Discover ancient culture, vast landscapes, and incredible wildlife.",
      destinations: [
        {
          name: "🐎 Hustai National Park",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "Home of the rare Przewalski's wild horses and diverse wildlife.",
          activities: [
            "🐴 Wild horse watching",
            "🚶 Hiking trails",
            "📸 Wildlife photography",
            "🌿 Botanical tours",
          ],
          weather: [
            { season: "Summer", averageTemperature: "22°C" },
            { season: "Winter", averageTemperature: "-30°C" },
            { season: "Autumn", averageTemperature: "10°C" },
            { season: "Spring", averageTemperature: "7°C" },
          ],
        },
        {
          name: "⛰️ Terelj National Park",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "Popular for hiking, rock formations, and nomadic culture.",
          activities: [
            "🥾 Hiking",
            "🧗 Rock climbing",
            "🏕️ Camping",
            "🐑 Visiting nomadic families",
          ],
          weather: [
            { season: "Summer", averageTemperature: "24°C" },
            { season: "Winter", averageTemperature: "-20°C" },
            { season: "Autumn", averageTemperature: "11°C" },
            { season: "Spring", averageTemperature: "8°C" },
          ],
        },
        {
          name: "🌊 Khuvsgul Lake",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "One of the largest freshwater lakes in Mongolia surrounded by forest.",
          activities: [
            "🚣 Boating",
            "🎣 Fishing",
            "❄️ Ice skating (winter)",
            "🥾 Hiking around the lake",
          ],
          weather: [
            { season: "Summer", averageTemperature: "20°C" },
            { season: "Winter", averageTemperature: "-35°C" },
            { season: "Autumn", averageTemperature: "5°C" },
            { season: "Spring", averageTemperature: "7°C" },
          ],
        },
        {
          name: "🏯 Amarbayasgalant Monastery",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description: "One of Mongolia’s most important Buddhist monasteries.",
          activities: [
            "🏛️ Cultural tours",
            "🧘 Meditation sessions",
            "📸 Architecture photography",
            "🎎 Festival visits",
          ],
          weather: [
            { season: "Summer", averageTemperature: "22°C" },
            { season: "Winter", averageTemperature: "-25°C" },
            { season: "Autumn", averageTemperature: "10°C" },
            { season: "Spring", averageTemperature: "6°C" },
          ],
        },
      ],
    },
    {
      name: "Western Mongolia",
      video: "/images/ariukasImages/ulgiiVideo.mp4",
      details:
        "Discover ancient culture, vast landscapes, and incredible wildlife.",
      destinations: [
        {
          name: "🏔️ Altai Tavan Bogd National Park",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description: "Majestic mountains with glaciers and petroglyphs.",
          activities: [
            "🥾 Mountain hiking",
            "❄️ Glacier trekking",
            "🖼️ Petroglyph viewing",
            "📷 Landscape photography",
          ],
          weather: [
            { season: "Summer", averageTemperature: "18°C" },
            { season: "Winter", averageTemperature: "-30°C" },
            { season: "Autumn", averageTemperature: "7°C" },
            { season: "Spring", averageTemperature: "5°C" },
          ],
        },
        {
          name: "🏙️ Ulgii Town",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description: "Gateway to western Mongolia and Kazakh culture.",
          activities: [
            "🏛️ Cultural tours",
            "🎭 Traditional Kazakh performances",
            "🛍️ Local markets",
            "🍽️ Kazakh cuisine tasting",
          ],
          weather: [
            { season: "Summer", averageTemperature: "22°C" },
            { season: "Winter", averageTemperature: "-28°C" },
            { season: "Autumn", averageTemperature: "10°C" },
            { season: "Spring", averageTemperature: "7°C" },
          ],
        },
        {
          name: "🌄 Khovd Province",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "Known for diverse ethnic groups and dramatic landscapes.",
          activities: [
            "🌄 Scenic drives",
            "🏞️ Nature photography",
            "🎉 Cultural festivals",
            "🚶 Hiking trails",
          ],
          weather: [
            { season: "Summer", averageTemperature: "20°C" },
            { season: "Winter", averageTemperature: "-25°C" },
            { season: "Autumn", averageTemperature: "9°C" },
            { season: "Spring", averageTemperature: "6°C" },
          ],
        },
        {
          name: "🌿 Tsambagarav National Park",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "A park with alpine meadows, glaciers, and rare animals.",
          activities: [
            "🥾 Hiking",
            "🦌 Wildlife watching",
            "❄️ Winter sports",
            "📷 Nature photography",
          ],
          weather: [
            { season: "Summer", averageTemperature: "17°C" },
            { season: "Winter", averageTemperature: "-35°C" },
            { season: "Autumn", averageTemperature: "5°C" },
            { season: "Spring", averageTemperature: "4°C" },
          ],
        },
      ],
    },
    {
      name: "Eastern Mongolia",
      video: "/images/ariukasImages/zuunVideo.mp4",
      details:
        "Discover ancient culture, vast landscapes, and incredible wildlife.",
      destinations: [
        {
          name: "🌾 Dornod Mongol Biosphere Reserve",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "Expansive steppe ecosystem with unique flora and fauna.",
          activities: [
            "🚶 Steppe trekking",
            "📸 Wildlife photography",
            "🦌 Deer watching",
            "🌿 Botanical studies",
          ],
          weather: [
            { season: "Summer", averageTemperature: "23°C" },
            { season: "Winter", averageTemperature: "-22°C" },
            { season: "Autumn", averageTemperature: "11°C" },
            { season: "Spring", averageTemperature: "7°C" },
          ],
        },
        {
          name: "🦅 Mongol Daguur Strictly Protected Area",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description: "UNESCO World Heritage Site known for migratory birds.",
          activities: [
            "🦆 Bird watching",
            "🚶 Nature walks",
            "📚 Environmental education",
            "📸 Photography",
          ],
          weather: [
            { season: "Summer", averageTemperature: "20°C" },
            { season: "Winter", averageTemperature: "-25°C" },
            { season: "Autumn", averageTemperature: "9°C" },
            { season: "Spring", averageTemperature: "6°C" },
          ],
        },
        {
          name: "🌲 Khentii Mountains",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description:
            "Forest and mountain region, home to Genghis Khan’s birthplace.",
          activities: [
            "🥾 Hiking",
            "🌄 Scenic views",
            "🏕️ Camping",
            "📜 Historical tours",
          ],
          weather: [
            { season: "Summer", averageTemperature: "22°C" },
            { season: "Winter", averageTemperature: "-20°C" },
            { season: "Autumn", averageTemperature: "10°C" },
            { season: "Spring", averageTemperature: "7°C" },
          ],
        },
        {
          name: "🏞️ Onon-Balj National Park",
          mediaUrl: "/images/ariukasImages/scenery.jpg",
          description: "Scenic river valley and forested mountains.",
          activities: [
            "🚣 Kayaking",
            "🌲 Forest hikes",
            "🐟 Fishing",
            "📷 Nature photography",
          ],
          weather: [
            { season: "Summer", averageTemperature: "21°C" },
            { season: "Winter", averageTemperature: "-22°C" },
            { season: "Autumn", averageTemperature: "9°C" },
            { season: "Spring", averageTemperature: "6°C" },
          ],
        },
      ],
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
            viewport={{ once: true, amount: 0.3 }}
          >
            <ShowRegion
              key={region.name}
              videoSource={region.video}
              regionName={region.name}
              details={region.details}
              destinations={region.destinations}
            />
          </motion.div>
        ))}
      </div>
    </div>
  );
};
