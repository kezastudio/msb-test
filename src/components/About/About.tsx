import Image from "next/image";
import React from "react";

type Props = {};

const About = (props: Props) => {
  return (
    <section className="w-full flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between items-center gap-5 py-16">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-5">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 bg-black"></div>
          <p>ABOUT MSB</p>
        </div>
        <div className="py-5">
          <h1 className="text-4xl font-semibold ">A New Era of Social Media</h1>

          <p className="text-sm pt-8 text-justify ">
            At MSB, we believe in the power of positivity and the impactful role
            of content in shaping our minds, bodies, and spirits. In a digital
            world cluttered with distractions and disheartenment, MSB stands as
            a beacon of hope. We are not just a platform; we are a community
            committed to making a difference. Here, every upload not only earns
            you financial freedom but also contributes to a larger
            purpose—empowering those who need it most, from single mothers and
            the homeless to ex-prisoners re-integrating into society.
          </p>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 flex justify-center">
        <div className="bg-gray-200 w-80 h-80">
          <Image
            className="mt-10 ml-14"
            src="/about.png"
            alt="about"
            width={300}
            height={300}
          />
        </div>
      </div>
    </section>
  );
};

export default About;
