/* eslint-disable react/jsx-no-undef */
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";
import { PlayCircle, PlayIcon } from "lucide-react";
import Image from "next/image";

type Props = {};

const HeroBanner = (props: Props) => {
  return (
    <section className=" flex flex-col xl:flex-row lg:flex-row md:flex-row w-full justify-between ">
      <div className="w-full xl:w-[50%] lg:w-[50%] md:w-[50%] ">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 bg-black"></div>
          <p>MIND, SOUL, BODY</p>
        </div>
        <div className="py-10">
          <h1 className="text-4xl md:text-6xl lg:text-6xl xl:text-6xl font-bold ">
            Empowering Creators <br />& Enriching Lives
          </h1>

          <p className="text-sm pt-10">
            Transform your content into a force for good. Monetise and inspire
            with every post.
          </p>
        </div>
        <div className="flex">
          <Link href="/sign-up">
            <Button
              size="lg"
              className="bg-black text-white px-5 py-3 rounded-lg"
            >
              Join the Movement
            </Button>
          </Link>
          <Link className="" href="/about">
            <div className="flex justify-center items-center gap-3 mx-5">
              <button className="rounded-full p-3 bg-[#FFDA44]">
                <PlayIcon size={20} />
              </button>
              <div className="font-semibold">Learn More</div>
            </div>
          </Link>
        </div>
      </div>
      <div className="">
        <div className="lg:-mt-3 xl:-mt-3 md:-mt-3 mt-5">
          <Image
            className=""
            src={"/hero.png"}
            alt="msb-hero"
            width={500}
            height={500}
          />
        </div>
      </div>
    </section>
  );
};

export default HeroBanner;
