import Faqs from "@/components/FAQS/Faqs";
import ForgotPass from "@/components/SignInCompo/ForgotPass";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ForgotPass />
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
