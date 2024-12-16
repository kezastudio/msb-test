import Faqs from "@/components/FAQS/Faqs";
import SignUpCompo from "@/components/SignInCompo/SignUpCompo";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="flex flex-col justify-center items-center">
        <SignUpCompo />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
