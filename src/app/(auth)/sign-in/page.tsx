import Faqs from "@/components/FAQS/Faqs";
import SignInCompo from "@/components/SignInCompo/SignInCompo";
import React from "react";

type Props = {};

const SignIn = (props: Props) => {
  return (
    <div>
      <div className="w-full  flex flex-col justify-center items-center">
        <SignInCompo />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default SignIn;
