import EditContent from "@/components/EditContent/EditContent";
import Faqs from "@/components/FAQS/Faqs";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="">
        <EditContent />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
