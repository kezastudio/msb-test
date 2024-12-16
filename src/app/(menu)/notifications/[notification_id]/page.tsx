import Faqs from "@/components/FAQS/Faqs";
import NotificationCompo from "@/components/Notification/NotificationCompo";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="">
        <NotificationCompo />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
