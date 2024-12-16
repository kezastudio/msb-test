import DonationsCompo from "@/components/Donate/DonationsCompo";
import Faqs from "@/components/FAQS/Faqs";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="">
        <DonationsCompo />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
