"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import Container from "./Container";
import { Button } from "./ui/button";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AlignJustify, PlusCircle, Search } from "lucide-react";
import { NavManu } from "./Navitems";

type Props = {
  userData: any; 
  token: string | null;
  signOutHandle: () => void;
};

const Navbar = ({ userData, token, signOutHandle }: Props) => {
  const router = useRouter();
  const pathName = usePathname();
  const isActive = pathName === "/profile";

  return (
    <div className="w-full sticky top-0 border border-b-primary/10 bg-white z-50">
      <Container>
        <div className="flex  justify-between items-center">
          <Link href="/">
            <div className="flex items-center gap-1 cursor-pointer">
              <Image src="/logo.png" alt="MSB-logo" width={50} height={30} />
              <div className="font-bold text-xl "></div>
            </div>
          </Link>

          <div className="hidden md:flex gap-3 items-center">
            <div className="flex gap-2 items-center">
              <NavManu />
            </div>

            {/* {token ? (
              <>
 <Button onClick={signOutHandle}>Sign Out</Button>
              </>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => router.push("/sign-in")}
                >
                  Login
                </Button>
                <Button
                  className="bg-[#FFDA44] text-black hover:bg-[#f0c92c] hover:text-black"
                  variant="default"
                  onClick={() => router.push("/sign-up")}
                >
                  Sign Up
                </Button>
              </>
            )} */}
          </div>
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger className="flex gap-2 justify-end">
                {/* <PlusCircle /> */}
                <Link href="/content/upload">
                <PlusCircle />
              </Link>
                {/* <Search /> */}
                <Link href="/search">
                <Search /> 
              </Link>
                <AlignJustify />
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle>Menu</SheetTitle>
                  <SheetDescription className="my-5">
                    <div className="flex flex-col my-2 gap-y-2 items-start">
                      <NavManu />
                    </div>

                    {/* <div className="flex flex-col items-start gap-5 mx-2 my-5">
                      <Button
                        variant="outline"
                        onClick={() => router.push("/sign-in")}
                      >
                        Login
                      </Button>
                      <Button
                        className="bg-[#FFDA44] text-black hover:bg-[#f0c92c] hover:text-black"
                        variant="default"
                        onClick={() => router.push("/sign-up")}
                      >
                        Sign Up
                      </Button>
                    </div> */}
                  </SheetDescription>
                </SheetHeader>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Navbar;
