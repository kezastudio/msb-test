"use client"

import React, {useState,useEffect} from "react";

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Bookmark, Heart, Save } from "lucide-react";
import { Button } from "../ui/button";
import CampaignCard from "../Card/CampaignCard";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";

// import { useRouter } from 'next/router';
import { usePathname, useRouter } from 'next/navigation'

type Props = {};
type User = {
  Uid: string;
  Username: string;
  Profile_Picture: string;
  
};

type Content= {
  Cid: string;
  Title: string;
  Caption: string;
  created_at: string;
  Public_URL: string;
  Uid: string;
}

const LatestCampaings = (props: Props) => {

 // const [contentData, setContentData] = useState([]);
 const [contentData, setContentData] = useState<Content[]>([]);
 // const [userData, setUserData] = useState([]);
 const [userData, setUserData] = useState<User[]>([]);
  
  
  const pathname = usePathname()

  

  // Initialize Supabase client using environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
  const supabase = createClient(supabaseUrl, supabaseKey);








  useEffect(() => {
    fetchContentDetails(); 
}, []);





const fetchContentDetails = async () => {
    try {
      // Fetch content details from "All_Content" table
      const { data: contentData, error: contentError } = await supabase
        .from('All_Content')
        .select(`
          Cid,
          Title,
          Caption,
          created_at,
          Public_URL,
          Uid
        `)
        .order('created_at', { ascending: false })
        .limit(3);

      if (contentError) {
        console.error('Error fetching content data:', contentError);
        return;
      }

      console.log("Content Data:", contentData);
      setContentData(contentData);

      // Fetch user details for each content entry
      const userDetailsPromises = contentData.map(async (content) => {
        if (content.Uid) {
          const { data: userData, error: userError } = await supabase
            .from('User Details')
            .select('Username, Profile_Picture')
            .eq('id', content.Uid)
            .single();

          if (userError) {
            console.error(`Error fetching user details for Uid ${content.Uid}:`, userError);
            return null;
          }
          return { Uid: content.Uid, ...userData };
        }
        return null;
      });

      const userDetails = await Promise.all(userDetailsPromises);
      const validUserDetails = userDetails.filter((user) => user !== null);
      console.log("User Data:", validUserDetails);
      setUserData(validUserDetails);
    } catch (error) {
      console.error('Unexpected error:', error);
    }
  };

//  const getUserDetails = (Uid) => {
//   return userData.find((user) => user.Uid === Uid) || {};
// };

const latestContent = contentData.slice(0, 3);
const isDisabledLocation = pathname === "/";

// const getDaysAgo = (date) => {
// const now = new Date();
// const createdAt = new Date(date);
// const differenceInTime = now - createdAt;
// const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
// return differenceInDays;
// };

// const getContentType = (url) => {
// const extension = url.split('.').pop().toLowerCase();
// return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
// };


 // const getDaysAgo = (date) => {
  //   const now = new Date();
  //   const createdAt = new Date(date);
  //   const differenceInTime = now - createdAt;
  //   const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  //   return differenceInDays;
  // };

  const getDaysAgo = (date: string): number => {
    const now = new Date();
    const createdAt = new Date(date);
    const differenceInTime = now.getTime() - createdAt.getTime();
    const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  };



//  const getUserDetails = (Uid: string): User | {} =>{
//     // return userData.find((user) => user.Uid === Uid) || {};
//     return userData.find((user) =>  userId === Uid) || {};
//   };
  
const getUserDetails = (Uid: string): User =>{
  // return userData.find((user) => user.Uid === Uid) || {};
  // return userData.find((user) =>  userId === Uid) || {};
  return userData.find((user) =>  user.Uid === Uid)|| { Uid: "", Username: "Unknown", Profile_Picture: "" };
  

};


// const getContentType = (url) => {
//   const extension = url.split('.').pop().toLowerCase();
//   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
// };

const getContentType = (url: string):'video' | 'image'  => {
  // const extension = url.split('.').pop().toLowerCase();
  const extension = url.split('.').pop()?.toLowerCase() || '';
  return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
};






  return (
    <section className=" w-full my-5 py-10 px-5 bg-[#FAF8F0]">
      
        <div className="flex flex-col items-center">
          <div className="flex flex-col py-5 items-center">
            <div className="flex items-center  gap-2">
              <div className="h-0.5 w-5 bg-black"></div>
              <p className="text-center">New</p>
            </div>
            <h1 className="mt-3 text-4xl text-center font-semibold">
              Latest Campaigns
            </h1>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 my-8 justify-between">
          {/* <Link href="/donate-now">
            <CampaignCard
              username="jordanlester123"
              title="Supporting the Homeless"
              description="Help us provide food, shelter, and clothing to the homeless in our community."
              imageUrl="/card.png"
              postedDate="1 days"
              goal="£10,000.00"
              raised="£10.00"
              toGo="£10,000.00"
            />
          </Link>
          <Link href="/donate-now">
            <CampaignCard
              username="jordanlester123"
              title="Supporting the Homeless"
              description="Help us provide food, shelter, and clothing to the homeless in our community."
              imageUrl="/card.png"
              postedDate="1 days"
              goal="£10,000.00"
              raised="£10.00"
              toGo="£10,000.00"
            />
          </Link>
          <Link href="/donate-now">
            <CampaignCard
              username="jordanlester123"
              title="Supporting the Homeless"
              description="Help us provide food, shelter, and clothing to the homeless in our community."
              imageUrl="/card.png"
              postedDate="1 days"
              goal="£10,000.00"
              raised="£10.00"
              toGo="£10,000.00"
            />
          </Link> */}

{Array.isArray(latestContent) && latestContent.map((content) => {
        const user = getUserDetails(content.Uid);
        const contentType = getContentType(content.Public_URL);
        return (
            <>
              
<CampaignCard
            key={content.Cid}
            username={user.Username}
            title={content.Title}
            description={content.Caption}
            avatarImage={user.Profile_Picture}
            imageUrl={content.Public_URL}
            postedDate={getDaysAgo(content.created_at) + " days"}
            goal="£20,000.00"
            raised="£12,000.00"
            toGo="£8,000.00"
            // contentType={contentType}
            // isDisabledLocation={isDisabledLocation}
            isBookmarkDisabled={isDisabledLocation}
            isHeartDisabled={isDisabledLocation}
            isDonationDiabled={true}
            uid={content.Uid}
            cid={content.Cid}
           
          />

            </>
        )
            })}









        </div>

        <div className="flex justify-center py-10">
        <Link href="/sign-up">
          <Button className="bg-black" size="lg">
            Join our Mission
          </Button>
          </Link>
        </div>
      
    </section>
  );
};

export default LatestCampaings;
