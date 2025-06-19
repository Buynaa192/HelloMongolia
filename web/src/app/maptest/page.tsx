import MyGoogleMap from "./_component/Googlemap";

export default function Home() {
  const apiKey = process.env.GOOGLE_MAPS_API_KEY || "";

  return (
    <main className="p-6 w-full bg-green-400">
      <h1 className="text-3xl font-bold mb-6">My Google Map</h1>
      <MyGoogleMap apiKey={apiKey} />
    </main>
  );
}
