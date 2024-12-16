import Faqs from "@/components/FAQS/Faqs";
import Help from "@/components/Help/Help";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="">
        <Help />
      </div>
      <div className="flex items-center justify-center">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
