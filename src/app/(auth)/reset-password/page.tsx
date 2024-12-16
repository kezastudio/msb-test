import Faqs from "@/components/FAQS/Faqs";
import ResetPasswords from "@/components/SignInCompo/ResetPassword";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <ResetPasswords />
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
