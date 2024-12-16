import ContactUs from "@/components/ContactUs/ContactUs";
import Faqs from "@/components/FAQS/Faqs";
import React from "react";

type Props = {};

const Contact = (props: Props) => {
  return (
    <div>
      <div className="">
        <ContactUs />
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default Contact;
