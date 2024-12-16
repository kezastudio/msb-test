import Faqs from "@/components/FAQS/Faqs";
import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import React from "react";

type Props = {};

const page = async (props: Props) => {
  const supabase = createClient();

  const session = await supabase.auth.getUser();

  console.log(session);
  return (
    <div className="w-full">
      <div className=" py-8 px-2">
        <h1 className="text-2xl md:text-3xl text-center lg:text-4xl xl:text-4xl font-bold">
          About Us
        </h1>
        <div className="flex justify-center">
          {" "}
          <Image
            className="w-12 h-8 my-5"
            src={"/logo-2.png"}
            alt="logo"
            width={500}
            height={500}
          />
        </div>

        <div className="  flex flex-col items-center">
          <div className="w-full   md:w-2/3 lg:w-2/3 xl:w-2/3 my-5">
            <h4 className="text-lg font-bold mb-2">About</h4>
            <p className="text-justify ">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              lacus sapien, molestie quis ex ut, hendrerit congue est. Curabitur
              posuere fringilla ante nec luctus. In nec metus ut elit aliquam
              placerat. Nam at pellentesque libero. Fusce gravida arcu ac mauris
              molestie, nec sagittis enim fringilla. Fusce id vestibulum metus.
              Maecenas feugiat velit eget leo fringilla tempus. In non aliquam
              orci, non interdum urna. Sed et quam eu mauris imperdiet lacinia
              ut a erat. Donec volutpat et turpis eget rhoncus. Praesent nec
              iaculis tortor. Curabitur consequat erat lorem.
            </p>
          </div>
          <div className="w-full   md:w-2/3 lg:w-2/3 xl:w-2/3 my-5">
            <h4 className="text-lg font-bold mb-2">Misc</h4>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              lacus sapien, molestie quis ex ut, hendrerit congue est. Curabitur
              posuere fringilla ante nec luctus. In nec metus ut elit aliquam
              placerat. Nam at pellentesque libero. Fusce gravida arcu ac mauris
              molestie, nec sagittis enim fringilla. Fusce id vestibulum metus.
              Maecenas feugiat velit eget leo fringilla tempus. In non aliquam
              orci, non interdum urna. Sed et quam eu mauris imperdiet lacinia
              ut a erat. Donec volutpat et turpis eget rhoncus. Praesent nec
              iaculis tortor. Curabitur consequat erat lorem.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
