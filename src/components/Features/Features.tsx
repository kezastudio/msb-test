import {
  CircleFadingPlus,
  ExternalLink,
  SmartphoneNfc,
  Store,
  Webcam,
} from "lucide-react";
import React from "react";

type Props = {};

const Features = (props: Props) => {
  const items = [
    {
      icon: <CircleFadingPlus size={50} />,
      title: "Discover Authentic Content",
      description:
        "Dive into a diverse world of content that feeds the soul. Discover stories, talents, and inspirations from creators dedicated to making a real difference.",
      button: "READ MORE",
    },
    {
      icon: <SmartphoneNfc size={50} />,
      title: "Support with Purpose",
      description:
        "Every donation goes beyond support—it's an investment in someone's dream and a step towards creating a more inclusive and supportive world.",
      button: "READ MORE",
    },
    {
      icon: <Webcam size={50} />,
      title: "Create & Connect",
      description:
        "Share your journey, connect with like-minded individuals, and grow your audience on a platform that values authenticity and positivity.",
      button: "READ MORE",
    },
    {
      icon: <Store size={50} />,
      title: "Empowerment Education",
      description:
        "Access workshops, tips, and resources designed to enhance your content creation skills and maximize your impact on the community.",
      button: "READ MORE",
    },
  ];
  return (
    <section id="features" className="py-16 flex flex-col items-center">
      <div className="flex flex-col py-5 items-center">
        <div className="flex items-center  gap-2">
          <div className="h-0.5 w-5 bg-black"></div>
          <p className="text-center">HOW IT WORKS</p>
        </div>
        <h1 className="mt-3 text-4xl text-center font-semibold">
          Our Core Features
        </h1>
      </div>
      <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row justify-between mt-8 gap-5">
        {items.map((item, index) => (
          <>
            <div className="flex flex-col items-center text-justify gap-y-4 gap-x-8">
              <div>{item.icon}</div>
              <h4 className="text-lg font-semibold">{item.title}</h4>
              <p className="text-sm">{item.description}</p>
              <button className="flex gap-3 justify-center">
                {item.button} <ExternalLink />
              </button>
            </div>
          </>
        ))}
      </div>
    </section>
  );
};

export default Features;
