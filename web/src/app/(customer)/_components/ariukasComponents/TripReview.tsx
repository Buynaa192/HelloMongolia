"use client";
import { PackageType } from "@/app/_providers/AuthProvider";
import Image from "next/image";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
type TripReviewProps = {
  title: string;
  reviewMessage: string;
  row?: "left" | "right";
  pack?: PackageType;
};

export const TripReview = ({ title, reviewMessage, row, pack }: TripReviewProps) => {
  return (
    <div
      className={`hidden md:flex w-full h-full flex-col justify-start text-white gap-4 py-4 ${
        row === "right" ? "items-end text-right" : "items-start text-left"
      }`}
    >
      <h1 className="text-4xl font-semibold">{title}</h1>

      <p className="text-md text-white/80 italic">{reviewMessage}</p>

      <div className="flex flex-col gap-2 w-full">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-yellow-500" />
          <p className="text-2xl font-semibold italic">
            {pack?.duration} {pack?.tripType}
          </p>
        </div>

        <Accordion type="multiple" className="w-full">
          {pack?.packageItem.map((item, index) => {
            return (
              <AccordionItem key={index} value={index.toString()} className="border-white/30">
                <AccordionTrigger className="w-full p-0 flex items-center hover:no-underline">
                  <div className="w-full flex items-center gap-4 py-2 cursor-pointer">
                    <div className="">{index + 1}</div>
                    <p className="text-xl">{item.title}</p>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="flex flex-col gap-2">
                  <div className="w-full h-50 relative rounded-2xl overflow-hidden">
                    <Image fill src={item.image} alt="packageItem" />
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {item.activity.map((item) => {
                      return (
                        <Button key={item._id} size="sm" className="text-yellow-500 gap-2 items-center">
                          <p>{item.emoji}</p>
                          <p>{item.activityName}</p>
                        </Button>
                      );
                    })}
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>

        <div className="w-full flex justify-between items-center mt-6">
          <p className="font-semibold text-3xl">
            <span className="text-xl text-muted-foreground">Cost: </span>${pack?.cost.toLocaleString()}{" "}
            <span className="text-sm font-normal text-muted-foreground">per person</span>
          </p>

          <Link href={`/travel-plans/${pack?._id}`}>
            <Button size="lg" variant="secondary" className="cursor-pointer">
              Take me there <ArrowRight size={14} />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};
