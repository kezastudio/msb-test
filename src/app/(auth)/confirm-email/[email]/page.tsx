import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";
import Link from "next/link";
import React from "react";

type Props = {
  params: {
    email: string;
  };
};

const page = ({ params }: Props) => {
  const decodedEmail = decodeURIComponent(params.email);
  return (
    <div className="flex flex-col gap-4 justify-center items-center h-[100vh]">
      <h1 className="text-xl font-bold ">Confirm Email</h1>
      <p className="text-lg capitalize">
        please confirm your email addres{" "}
        <span className="text-green-500 font-semibold mx-2">
          {decodedEmail}
        </span>
      </p>
      <CheckCircle className="text-green-500 w-10 h-10" />

      <p>If Already confirmed?</p>

      <Link href="/sign-in">
        <Button className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-24">
          Sign In
        </Button>
      </Link>
    </div>
  );
};

export default page;
