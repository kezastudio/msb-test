// "use client"
// import React from "react";
// import CampaignCard from "../Card/CampaignCard";

// type Props = {};

// const ContentSearch = (props: Props) => {
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
//     {
//       username: "anotheruser456",
//       title: "Clean Water Initiative",
//       description:
//         "Join us in bringing clean water to communities in need around the world.",
//       imageUrl: "/card.png",
//       postedDate: "2 days",
//       goal: "£15,000.00",
//       raised: "£5,000.00",
//       toGo: "£10,000.00",
//     },
//     {
//       username: "charitylover789",
//       title: "Educational Scholarships",
//       description:
//         "Support students from low-income families by providing scholarships for education.",
//       imageUrl: "/card.png",
//       postedDate: "3 days",
//       goal: "£20,000.00",
//       raised: "£12,000.00",
//       toGo: "£8,000.00",
//     },
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
//     {
//       username: "anotheruser456",
//       title: "Clean Water Initiative",
//       description:
//         "Join us in bringing clean water to communities in need around the world.",
//       imageUrl: "/card.png",
//       postedDate: "2 days",
//       goal: "£15,000.00",
//       raised: "£5,000.00",
//       toGo: "£10,000.00",
//     },
//     {
//       username: "charitylover789",
//       title: "Educational Scholarships",
//       description:
//         "Support students from low-income families by providing scholarships for education.",
//       imageUrl: "/card.png",
//       postedDate: "3 days",
//       goal: "£20,000.00",
//       raised: "£12,000.00",
//       toGo: "£8,000.00",
//     },
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
//     {
//       username: "anotheruser456",
//       title: "Clean Water Initiative",
//       description:
//         "Join us in bringing clean water to communities in need around the world.",
//       imageUrl: "/card.png",
//       postedDate: "2 days",
//       goal: "£15,000.00",
//       raised: "£5,000.00",
//       toGo: "£10,000.00",
//     },
//     {
//       username: "charitylover789",
//       title: "Educational Scholarships",
//       description:
//         "Support students from low-income families by providing scholarships for education.",
//       imageUrl: "/card.png",
//       postedDate: "3 days",
//       goal: "£20,000.00",
//       raised: "£12,000.00",
//       toGo: "£8,000.00",
//     },
//   ];
//   return (
//     <div>
//       <p className="text-base  text-slate-400">
//         {campaignsData.length} Search results for ‘street dance’
//       </p>

//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 my-8 justify-between">
//         {campaignsData.map((campaign, index) => (
//           <>
//             <CampaignCard
//               username={campaign.username}
//               title={campaign.title}
//               description={campaign.description}
//               imageUrl="/card.png"
//               postedDate={campaign.postedDate}
//               goal={campaign.goal}
//               raised={campaign.raised}
//               toGo={campaign.toGo}
//             />
//           </>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default ContentSearch;

"use client";
import React, {useEffect,useState} from "react";
import CampaignCard from "../Card/CampaignCard";
import { Button } from "../ui/button";
import { Link } from "react-scroll";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@supabase/supabase-js";
// import { useRouter } from 'next/router';
import { usePathname, useRouter } from 'next/navigation'
// import  Loader  from "@/components/ui/loader";
import  Loader  from "@/components/ui/loader-search";
import { useSearchParams } from 'next/navigation'
import { Frown,Laugh } from 'lucide-react';




type ContentSearchProps = { search: string;};
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
  isDonationOff:boolean;
}


const ContentSearch :React.FC<ContentSearchProps>=({search,}) => {

  const router =useRouter();
  const [userContent, setUserContent] = useState([]);
  const [userId, setUserId] = useState('');
 // const [contentData, setContentData] = useState([]);
 const [contentData, setContentData] = useState<Content[]>([]);
 // const [userData, setUserData] = useState([]);
 const [userData, setUserData] = useState<User[]>([]);
  const [userCred, setUserCred] = useState({});
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname()
 

  const [searchData, setSearchData] = useState<string>('');

  


  useEffect(() => {
    setSearchData(search)
  }, [search]);

  console.log('searchData', searchData);


 
  

  // Initialize Supabase client using environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
  const supabase = createClient(supabaseUrl, supabaseKey);

  console.log("Content Search Data", typeof(search),search)

  const showToastMessage = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please Login First !", {
        // position: toast.POSITION?.TOP_CENTER,
        position: "top-center",
      })
    };
  };

  useEffect(() => {
    showToastMessage();
   
  }, []);


  useEffect(() => {
    if (searchData) {
      fetchContentDetails();
      fetchUserData();
    }
  }, [searchData]);

  const fetchUserData = async ( ) => {
   
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      console.log("User Found", user.id);
      setUserCred(user.user_metadata)
      setUserId(user.id)
    }


    
  };


  const fetchContentDetails = async () => {
    const trimmedSearchData = searchData.trim();
    setLoading(true);
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
            Uid,
            isDonationOff
          `)
          // .eq('Title',`${trimmedSearchData}`)
          .ilike('Title', `%${trimmedSearchData}%`)
          .order('created_at', { ascending: false }); 
          

        if (contentError) {
          console.error('Error fetching content data:', contentError);
          setLoading(false);
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
      }finally {
        setLoading(false);
      }

    };

    const getUserDetails = (Uid: string): User =>{
      // return userData.find((user) => user.Uid === Uid) || {};
      // return userData.find((user) =>  userId === Uid) || {};
      return userData.find((user) => user.Uid === Uid)|| { Uid: "", Username: "Unknown", Profile_Picture: "" };
      

    };
    
  
  const isDisabledLocation = pathname === "/";
  
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

// const getContentType = (url) => {
//   const extension = url.split('.').pop().toLowerCase();
//   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
// };

const getContentType = (url: string):'video' | 'image'  => {
  // const extension = url.split('.').pop().toLowerCase();
  const extension = url.split('.').pop()?.toLowerCase() || '';
  return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
};





if (loading) {
  return (
  //  <div className="flex items-center justify-center h-screen space-y-2 ">
  <div className="my-10">
  <div className="flex justify-center  h-screen mt-2">
    <Loader />;
    </div>
    </div>
  )
  
  
}



  return (
    <div className="my-10">
       
      {/* <h6 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl my-10 font-bold"> */}
      <h6 className="text-lg  md:text-xl lg:text-xl xl:text-xl my-10  font-bold">
        The Campaigns
        <p className="text-base   text-slate-400">
      {/* <p className="text-base text-center  text-slate-400"> */}
          
          
          {searchData ? (
            contentData.length === 0 ? (
              <div className="flex items-center  space-x-2">
                <span> No results found for “{searchData}”!</span><Frown />
                </div> 
            ) : (
              <div className="flex items-center  space-x-2">
              <span>{contentData.length} Search results for “{searchData}”</span> <Laugh />
              </div>
            )
          ) : (
            <span>Please search for Campaigns</span>
          )}


       </p>
      </h6>
      
      {/* {loading && <Loader />} */}
      {/* {localStorage.getItem("token") ? ( */}
        
        
        <div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 my-8 justify-between">
          {/* {campaignsData.map((campaign, index) => ( */}
          {contentData?.map((content) => {
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
            isBookmarkDisabled={isDisabledLocation}
            isHeartDisabled={isDisabledLocation}
            isDonationDiabled={content.isDonationOff}
            uid={userId}
            cid={content.Cid}
            
          />

            </>
        )
            })}
          {/*  ))} */}
        </div>


      </div>
      
     {/* ) :
         (<div style={{
          textAlign: "center", display: "flex",
          justifyContent: "center",
          alignItems: "center", flexDirection: "column"
        }}>
          <h1 style={{ color: "red", fontSize: "16px" }}> */}
            {/* <b> "Please Go For Login First"!!</b> */}
            {/* <b>&quot;Please Go For Login First&quot;!!</b>
            </h1>
          <div className="card" style={{
            background: "rgba(255, 255, 255, 0.8)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            borderRadius: "10px",
            padding: "20px",
            maxWidth: "400px",
            height: "100px",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <Button
              className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-24"
              type="submit"
              onClick={() => router.push("/sign-in")}

              
            >
              Login
            </Button>


          </div>
        </div>
        )} */}
    </div>
  );
};

export default ContentSearch;

