"use client";

import { DestinationType } from "@/app/_providers/AuthProvider";
import { Badge } from "@/components/ui/badge";
import { DesdinationPackage } from "./desPackage";

type Props = {
  destination: DestinationType;
};

export const DestinationIdBody = ({ destination }: Props) => {
  return (
    <section className="flex flex-col lg:flex-row gap-8 px-6 py-10 w-[1440px] ">
      <div className="flex-1 w-full space-y-8 border-1 border-white/20 text-white rounded-2xl p-8 shadow-lg">
        <div>
          <h2 className="text-2xl font-bold  mb-2">About {destination.destinationName}</h2>
          <p className="leading-relaxed">{destination.description}</p>
        </div>

        {destination.activities.length > 0 && (
          <div className="w-full ">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-semibold ">Activities & Experiences</h2>
            </div>
            <div className="flex gap-4">
              {destination.activities.map((item, i) => (
                <Badge key={i} className=" p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <p className="">{item.activityName}</p>
                  </div>
                </Badge>
              ))}
            </div>
          </div>
        )}
        <DesdinationPackage id={destination._id} />
      </div>
      {destination.weather.length > 0 ? (
        <aside className="w-full lg:w-[300px] sticky top-24 self-start rounded-2xl shadow-md p-6 space-y-4 text-white border border-white/20">
          <h3 className="text-xl font-bold">Seasonal Weather</h3>
          <div className="text-sm flex flex-col gap-4">
            {destination.weather.map((item) => {
              const tempC = ((item.averageTempF - 32) * 5) / 9;
              return (
                <div key={item._id}>
                  <p className="text-xl font-semibold">{item.season}</p>
                  <div className="flex items-center justify-between">
                    <p>Temperature</p>
                    <p className="text-lg">
                      {item.averageTempF}°F / {tempC.toFixed(1)}°C
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </aside>
      ) : null}
    </section>
  );
};
