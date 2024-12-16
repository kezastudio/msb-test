import Image from "next/image";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Quote } from "lucide-react";

type Props = {};

const Testimonial = (props: Props) => {
  return (
    <section className="w-full flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between items-center gap-5 my-10 py-16">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2  flex justify-center   ">
        <div className="bg-[#FFDA44] w-80 h-80">
          <Image
            className="mt-10 ml-14"
            src="/testimonial.png"
            alt="about"
            width={300}
            height={300}
          />
        </div>
      </div>

      <div className=" w-full md:w-1/2 lg:w-1/2 xl:w-1/2 p-5">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 bg-black"></div>
          <p>TESTIMONIALS</p>
        </div>
        <div className="py-5">
          <h1 className="text-4xl font-semibold ">Hear from Our Community</h1>
          <div className="py-3">
            <Avatar>
              <AvatarImage src="/avater-.png" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </div>

          <Quote
            size="20"
            strokeWidth={3}
            color="#FFDA44"
            absoluteStrokeWidth
          />

          <p className="text-sm pt-4 text-justify ">
            <i>
              “MSB is more than an app; it’s a lifeline. It has helped me
              rebuild my life by connecting me with people who believe in my
              work.”
            </i>
          </p>
          <p className="text-sm font-semibold mt-1">Jamie, MSB Creator</p>
        </div>
      </div>
    </section>
  );
};

export default Testimonial;
