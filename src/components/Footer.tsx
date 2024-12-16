import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";
import {
  Facebook,
  FacebookIcon,
  InstagramIcon,
  Twitter,
  X,
  YoutubeIcon,
} from "lucide-react";
import Link from "next/link";
import { Input } from "./ui/input-news";

type Props = {};

const Footer = (props: Props) => {
  return (
    <footer className="w-full px-5 py-10 bg-black">
      <div className="flex flex-col xl:flex-row lg:flex-row md:flex-row gap-y-10 my-10 justify-evenly ">
        <div className="flex flex-col justify-center gap-3">
          <Avatar className="w-20 h-20">
            <AvatarImage src="/logo.png"></AvatarImage>
          </Avatar>
          <p className="text-sm mt-3 text-gray-200">
            Join our journey towards a more positive and impactful online <br />
            community. Follow us for updates, support, and inspiration.
          </p>
          <div className="flex gap-3 mt-3  items-center">
            <p className="text-sm font-semibold text-gray-200">Follow Us:</p>
            <div className="flex  gap-3">
              <Button className="bg-[#2c2b2b]" size="icon">
                <FacebookIcon size={10} />
              </Button>
              <Button className="bg-[#2c2b2b]" size="icon">
                <Twitter size={15} />
              </Button>
              <Button className="bg-[#2c2b2b]" size="icon">
                <InstagramIcon size={15} />
              </Button>
              <Button className="bg-[#2c2b2b]" size="icon">
                <YoutubeIcon size={15} />
              </Button>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Link href={"/"}>
            <h4 className="text-lg font-semibold text-gray-200">Home</h4>
          </Link>
          <div className="flex flex-col gap-4 ">
            <div className="">
              <Link className="flex items-center gap-3" href={"/about"}>
                <div className="w-2 h-2 rounded-full bg-[#FFDA44]"></div>
                <p className="text-gray-200 text-sm">About</p>
              </Link>
              <hr className=" mt-2" />
            </div>
            <div className="">
              {" "}
              <Link className="flex items-center gap-3" href={"#"}>
                <div className="w-2 h-2 rounded-full bg-[#FFDA44]"></div>
                <p className="text-gray-200 text-sm">How It&apos;s Works</p>
              </Link>
              <hr className=" mt-2" />
            </div>
            <div className="">
              <Link className="flex items-center gap-3" href={"/campagins"}>
                <div className="w-2 h-2 rounded-full bg-[#FFDA44]"></div>
                <p className="text-gray-200 text-sm">Campagins</p>
              </Link>
              <hr className=" mt-2" />
            </div>
            <div className="">
              <Link className="flex items-center gap-3" href={"/faqs"}>
                <div className="w-2 h-2 rounded-full bg-[#FFDA44]"></div>
                <p className="text-gray-200 text-sm">FAQs</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Link href={"#"}>
            <h4 className="text-lg font-semibold text-gray-200">
              Useful Links
            </h4>
          </Link>
          <div className="flex flex-col gap-4 ">
            <div className="">
              <Link className="flex items-center gap-3" href={"#"}>
                <div className="w-2 h-2 rounded-full bg-[#FFDA44]"></div>
                <p className="text-gray-200 text-sm">Privacy policy</p>
              </Link>
              <hr className=" mt-2" />
            </div>
            <div className="">
              {" "}
              <Link className="flex items-center gap-3" href={"/terms"}>
                <div className="w-2 h-2 rounded-full bg-[#FFDA44]"></div>
                <p className="text-gray-200 text-sm">Terms</p>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-5">
          <Link href={"#"}>
            <h4 className="text-lg font-semibold text-gray-200">Newsletter</h4>
          </Link>
          <p className="text-sm text-gray-200">
            Subscribe to us get updated news & tips in your inbox
          </p>
          <div className="flex gap-5 items-center">
            <Input className="bg-[#2b2b2c]" placeholder="Your email..." />
            <Button
              size="lg"
              className="bg-[#FFDA44] hover:bg-[#f5dd7a]  text-black"
            >
              Subscribe
            </Button>
          </div>
        </div>
      </div>
      <hr className="mt-32 mb-10" />
      <div className=" text-center">
        <p className="text-gray-200 font-normal text-sm">
          Copyright © 2024 , All Rights Reserved.
          <span className="text-[#FFDA44] text-sm font-semibold"> MSB.</span>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
