"use client";

import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const description = `Because it's one of the last places on Earth where you can truly disconnect—and reconnect.`;

export const Hero2Text = () => {
  return (
    <motion.div
      initial={{ y: 90, opacity: 0 }}
      whileInView={{ y: 0, opacity: 1 }}
      transition={{ duration: 1, ease: "easeOut" }}
      viewport={{ once: true }}
      className="absolute inset-0 z-10 flex items-center justify-center text-white"
    >
      <div className="w-full max-w-8/12 p-8 flex flex-col gap-16">
        <div className="flex justify-between">
          <div className="md:text-left text-center flex-1">
            <h1 className="lg:text-6xl text-5xl font-extrabold leading-tight ">
              WHY
              <br />
              <span className="block mt-2">
                GO <br /> MON<span className="text-blue-600">GO</span>LIA ?
              </span>
            </h1>
          </div>

          <div className="flex-1 flex flex-col gap-8">
            <p className="text-3xl italic lora !text-gray-200">
              <q>{description}</q>
            </p>

            <p className="text-3xl italic lora !text-gray-200">
              <q>
                If you&rsquo;re seeking something real, raw, and unforgettable,
                <br />
                <span className="font-bold text-4xl text-white not-italic">
                  Mongolia{" "}
                </span>
                is calling.
              </q>
            </p>

            <div className="flex justify-end pt-10">
              <Link href="/travel-plans" passHref>
                <Button
                  className="h-12 w-[300px] cursor-pointer text-lg font-semibold"
                  variant="secondary"
                >
                  Explore <ArrowRight size={24} />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
