import Faqs from "@/components/FAQS/Faqs";
import InboxComp from "@/components/Inbox/InboxComp";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="">
        <InboxComp />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
