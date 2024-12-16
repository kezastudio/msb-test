// import React from "react";
// import DonateNowSingle from "../Card/DonateNowSingle";

// type Props = {};

// const DonateNow = (props: Props) => {
//   const campaignsData = [
//     {
//       username: "jordanlester123",
//       title: "Supporting the Homeless",
//       description:
//         "Help us provide food, shelter, and clothing to the homeless in our community.",
//       imageUrl: "/card.png",
//       postedDate: "1 day",
//       goal: "£10,000.00",
//       raised: "£10.00",
//       toGo: "£9,990.00",
//     },
//   ];
//   return (
//     <div>
//       <DonateNowSingle />
//     </div>
//   );
// };

// export default DonateNow;

"use client"
import React, { useEffect, useState } from "react";
// import { useRouter } from "next/router";

import { useSearchParams } from 'next/navigation'

import DonateNowSingle from "../Card/DonateNowSingle";
import supabase from "../../lib/supabaseClient";

const DonateNow: React.FC = () => {
  const searchParams = useSearchParams()
  
  const cid = searchParams.get("cid"); 

  const [campaignData, setCampaignData] = useState<any[]>([]);
  // const [likesCount, setLikesCount] = useState<number>(0);
  const [likesCount, setLikesCount] = useState<number|null>(null);
  const [createdAt, setCreatedAt] = useState<number>(0);
  const [profilePictures, setProfilePictures] = useState<any>({});

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
  


  useEffect(() => {
    console.log("cid",cid)
    if (cid) {
      const fetchData = async () => {
        try {
          // Fetch content data
          const { data: contentData, error: contentError } = await supabase
            .from('All_Content')
            .select('Uploaded_By, Title, Caption, Public_URL, Uid, Cid, created_at')
            .eq('Cid', cid);

          if (contentError) throw contentError;

          // Fetch likes count
          const { count: likeCount, error: likesError } = await supabase
            .from('UserLikes')
            .select('cid', { count: 'exact' })
            .eq('cid', cid)
            .eq('isLiked', true);

          if (likesError) throw likesError;

          // Fetch profile pictures
          const uids = contentData.map((item: any) => item.Uid);
          const { data: userDetails, error: userDetailsError } = await supabase
            .from('User Details')
            .select('id, Profile_Picture')
            .in('id', uids);

          if (userDetailsError) throw userDetailsError;

          const profilePicturesMap = userDetails.reduce((acc: any, user: any) => {
            acc[user.Uid] = user.Profile_Picture;
            return acc;
          }, {});
console.log("profilePicturesMap",userDetails?.[0]?.Profile_Picture)
          setCampaignData(contentData);
          setLikesCount(likeCount);
          // setProfilePictures(profilePicturesMap);
          setProfilePictures(userDetails?.[0]?.Profile_Picture);
          setCreatedAt(getDaysAgo(contentData?.[0].created_at))
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      };

      fetchData();
    }
  }, [cid]);

  return (
    <div>
      {campaignData.map((campaign: any) => (
        <DonateNowSingle
          key={campaign.Uid}
          uid={campaign.Uid}
          username={campaign.Uploaded_By}
          title={campaign.Title}
          description={campaign.Caption}
          imageUrl={campaign.Public_URL}
          postedDate={createdAt} 
          goal="£20,000.00"
          raised="£12,000.00"
          toGo="£8,000.00"
          likes={likesCount?.toString()||'0' }
          // profilePicture={profilePictures[campaign.Uid] || '/default-profile.png'} 
          profilePicture={profilePictures || '/DefaultDP.jpg'} 
        />
      ))}
    </div>
  );
};

export default DonateNow;


