import AddContent from "@/components/AddContent/AddContent";
// import AddContent from "@/components/Profile/AddContent";
import Faqs from "@/components/FAQS/Faqs";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div>
      <div className="my-10">
        <AddContent />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
