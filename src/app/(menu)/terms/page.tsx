import Faqs from "@/components/FAQS/Faqs";
import Image from "next/image";
import React from "react";

type Props = {};

const page = (props: Props) => {
  return (
    <div className="w-full">
      <div className="py-8 px-2">
        <h1 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl font-bold">
          Terms and Conditions
        </h1>
        <div className="flex justify-center">
          <Image
            className="w-12 h-8 my-5"
            src={"/logo-2.png"}
            alt="logo"
            width={500}
            height={500}
          />
        </div>

        <div className="flex flex-col items-center ">
          <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 my-5">
            <h4 className="text-lg font-bold mb-2">About</h4>
            <p className="text-justify">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur
              lacus sapien, molestie quis ex ut, hendrerit congue est. Curabitur
              posuere fringilla ante nec luctus. In nec metus ut elit aliquam
              placerat. Nam at pellentesque libero. Fusce gravida arcu ac mauris
              molestie, nec sagittis enim fringilla. Fusce id vestibulum metus.
              Maecenas feugiat velit eget leo fringilla tempus. In non aliquam
              orci, non interdum urna. Sed et quam eu mauris imperdiet lacinia
              ut a erat. Donec volutpat et turpis eget rhoncus. Praesent nec
              iaculis tortor. Curabitur consequat erat lorem.
              <br />
              <br />
              Donec diam libero, porttitor vel congue auctor, pretium ut purus.
              Nunc ante est, scelerisque a ex luctus, malesuada eleifend libero.
              Interdum et malesuada fames ac ante ipsum primis in faucibus.
              Pellentesque elit augue, posuere at dui a, elementum lobortis
              massa. Orci varius natoque penatibus et magnis dis parturient
              montes, nascetur ridiculus mus. Mauris feugiat euismod mollis.
              Maecenas ornare velit sed bibendum aliquam. Quisque faucibus
              venenatis augue, vitae dictum nisl consectetur quis. Nullam quis
              urna sit amet leo vestibulum aliquet vel ac erat. Cras gravida
              magna eu sapien cursus tincidunt. Nunc at nisl nec elit semper
              pulvinar sed ac ligula. Fusce sed diam leo. Nullam at risus
              tincidunt, ultricies nunc eu, pharetra lectus. Donec ipsum lorem,
              volutpat a volutpat at, mollis ut mi. Phasellus congue dolor nisi,
              sed maximus augue pellentesque in. Ut egestas lorem quis pulvinar
              semper.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <Faqs />
      </div>
    </div>
  );
};

export default page;
