import Image from "next/image";
import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";

type Props = {};

const Faqs = (props: Props) => {
  const faqsItems = [
    {
      title: "What is MSB?",
      content:
        "Join our journey towards a more positive and impactful online community. Follow us for updates, support, and inspiration.",
    },
    {
      title: "What type of content can I share on MSB?",
      content:
        "Join our journey towards a more positive and impactful online community. Follow us for updates, support, and inspiration.",
    },
    {
      title: "How can I support creators on MSB?",
      content:
        "Join our journey towards a more positive and impactful online community. Follow us for updates, support, and inspiration.",
    },
    {
      title: "Is there a fee to use MSB?",
      content:
        "Join our journey towards a more positive and impactful online community. Follow us for updates, support, and inspiration.",
    },
    {
      title: "How does the donation process work?",
      content:
        "Join our journey towards a more positive and impactful online community. Follow us for updates, support, and inspiration.",
    },
    {
      title: "How do I report a problem or get support",
      content:
        "Join our journey towards a more positive and impactful online community. Follow us for updates, support, and inspiration.",
    },
  ];
  return (
    <section className="w-full mx-auto flex flex-col-reverse md:flex-row lg:flex-row xl:flex-row justify-between items-center gap-5 my-10 py-10">
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 py-4">
        <div className="flex items-center gap-2">
          <div className="h-0.5 w-5 bg-black"></div>
          <p>NEED ANSWERS?</p>
        </div>
        <div className="py-5">
          <h1 className="text-4xl font-semibold ">FAQs</h1>
        </div>
        <div className="">
          <Accordion type="single" collapsible>
            {faqsItems.map((item, index) => (
              <AccordionItem key={index} value={index.toString()}>
                <AccordionTrigger>{item.title}</AccordionTrigger>
                <AccordionContent>{item.content}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          <div className="mt-5">
            <Link href="/contact">
              <Button
                variant="outline"
                size="lg"
                className=" text-black px-5 py-2 mt-5 rounded-md"
              >
                Get Help
              </Button>
            </Link>
          </div>
        </div>
      </div>
      <div className="w-full md:w-1/2 lg:w-1/2 xl:w-1/2 px-2 py-4">
        <Image
          className="w-full  object-cover "
          src={"/faqs.png"}
          alt="msb-hero"
          width={500}
          height={500}
        />
      </div>
    </section>
  );
};

export default Faqs;
