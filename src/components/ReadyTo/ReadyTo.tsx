import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const ReadyTo = (props: Props) => {
  return (
    <section className="w-full flex flex-col md:flex-row lg:flex-row xl:flex-row items-center justify-center">
      <div className="w-[90%]  flex flex-col md:flex-row lg:flex-row xl:flex-row gap-x-2 justify-between items-center bg-[#FFDA44] p-10 mb-5 md:-mb-20 xl:-mb-20 lg:-mb-20 z-30 rounded-lg ">
        <div className="">
          <h1 className="text-3xl font-bold my-3">
            Ready to Change the World?
          </h1>
          <p className="text-sm">
            Join the MSB community today. Create, share, support, and inspire.{" "}
            <br />
            Let&apos;s make a positive impact together.
          </p>
        </div>
        <div className="mt-3">
          <Link href="/sign-up">
            <Button size="lg" className="bg-black">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ReadyTo;
