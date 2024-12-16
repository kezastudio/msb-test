// "use client";
// import React, { useEffect, useState } from "react";
// import CampaignCard from "../Card/CampaignCard";
// import { Button } from "../ui/button";
// import { Link } from "react-scroll";
// import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { createClient } from "@supabase/supabase-js";
// // import { useRouter } from 'next/router';
// import { usePathname, useRouter } from 'next/navigation'
// import Loader from "@/components/ui/loader";


// type Props = {};
// type User = {
//   Uid: string;
//   Username: string;
//   Profile_Picture: string;
  
// };

// type Content= {
//   Cid: string;
//   Title: string;
//   Caption: string;
//   created_at: string;
//   Public_URL: string;
//   Uid: string;
// }

// const CampaingsCom = (props: Props) => {

//   const [userContent, setUserContent] = useState([]);
//   const [userId, setUserId] = useState('');
//  // const [contentData, setContentData] = useState([]);
//  const [contentData, setContentData] = useState<Content[]>([]);
//  // const [userData, setUserData] = useState([]);
//  const [userData, setUserData] = useState<User[]>([]);
//   const [userCred, setUserCred] = useState({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const pathname = usePathname()
//   const router =useRouter()


//   // Initialize Supabase client using environment variables
//   const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
//   const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
//   const supabase = createClient(supabaseUrl, supabaseKey);

//   // const campaignsData = [
//   //   {
//   //     username: "jordanlester123",
//   //     title: "Supporting the Homeless",
//   //     description:
//   //       "Help us provide food, shelter, and clothing to the homeless in our community.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "1 day",
//   //     goal: "£10,000.00",
//   //     raised: "£10.00",
//   //     toGo: "£9,990.00",
//   //   },
//   //   {
//   //     username: "anotheruser456",
//   //     title: "Clean Water Initiative",
//   //     description:
//   //       "Join us in bringing clean water to communities in need around the world.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "2 days",
//   //     goal: "£15,000.00",
//   //     raised: "£5,000.00",
//   //     toGo: "£10,000.00",
//   //   },
//   //   {
//   //     username: "charitylover789",
//   //     title: "Educational Scholarships",
//   //     description:
//   //       "Support students from low-income families by providing scholarships for education.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "3 days",
//   //     goal: "£20,000.00",
//   //     raised: "£12,000.00",
//   //     toGo: "£8,000.00",
//   //   },
//   //   {
//   //     username: "jordanlester123",
//   //     title: "Supporting the Homeless",
//   //     description:
//   //       "Help us provide food, shelter, and clothing to the homeless in our community.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "1 day",
//   //     goal: "£10,000.00",
//   //     raised: "£10.00",
//   //     toGo: "£9,990.00",
//   //   },
//   //   {
//   //     username: "anotheruser456",
//   //     title: "Clean Water Initiative",
//   //     description:
//   //       "Join us in bringing clean water to communities in need around the world.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "2 days",
//   //     goal: "£15,000.00",
//   //     raised: "£5,000.00",
//   //     toGo: "£10,000.00",
//   //   },
//   //   {
//   //     username: "charitylover789",
//   //     title: "Educational Scholarships",
//   //     description:
//   //       "Support students from low-income families by providing scholarships for education.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "3 days",
//   //     goal: "£20,000.00",
//   //     raised: "£12,000.00",
//   //     toGo: "£8,000.00",
//   //   },
//   //   {
//   //     username: "jordanlester123",
//   //     title: "Supporting the Homeless",
//   //     description:
//   //       "Help us provide food, shelter, and clothing to the homeless in our community.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "1 day",
//   //     goal: "£10,000.00",
//   //     raised: "£10.00",
//   //     toGo: "£9,990.00",
//   //   },
//   //   {
//   //     username: "anotheruser456",
//   //     title: "Clean Water Initiative",
//   //     description:
//   //       "Join us in bringing clean water to communities in need around the world.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "2 days",
//   //     goal: "£15,000.00",
//   //     raised: "£5,000.00",
//   //     toGo: "£10,000.00",
//   //   },
//   //   {
//   //     username: "charitylover789",
//   //     title: "Educational Scholarships",
//   //     description:
//   //       "Support students from low-income families by providing scholarships for education.",
//   //     imageUrl: "/card.png",
//   //     postedDate: "3 days",
//   //     goal: "£20,000.00",
//   //     raised: "£12,000.00",
//   //     toGo: "£8,000.00",
//   //   },
//   // ];

//   const showToastMessage = () => {
//     if (!localStorage.getItem("token")) {
//       toast.error("Please Login First !", {
//          // position: toast.POSITION?.TOP_CENTER,
//          position: "top-center",
//       })
//     };
//   };

//   useEffect(() => {
//     showToastMessage();
//   }, []);


//   useEffect(() => {
//     setLoading(true)
//     fetchContentDetails();
//     fetchUserData();
//     setLoading(false)
//   }, []);

//   const fetchUserData = async () => {

//     const { data: { user } } = await supabase.auth.getUser()

//     if (user) {
//       console.log("User Found", user.id);
//       setUserCred(user.user_metadata)
//       setUserId(user.id)
//     }


//     // const { data, error } = await supabase
//     //   .from<UserDetails>('User Details')
//     //   .select('*')
//     //   .eq('id', userId)
//     //   .single();

//     // if (data) {
//     //   // setUserData(data);
//     //   console.log("User Data:", data)
//     // } else if (error) {
//     //   console.error('Error fetching user:', error);
//     // }
//   };


//   const fetchContentDetails = async () => {
//     try {
//       // Fetch content details from "All_Content" table
//       const { data: contentData, error: contentError } = await supabase
//         .from('All_Content')
//         .select(`
//             Cid,
//             Title,
//             Caption,
//             created_at,
//             Public_URL,
//             Uid
//           `);

//       if (contentError) {
//         console.error('Error fetching content data:', contentError);
//         return;
//       }

//       console.log("Content Data:", contentData);
//       setContentData(contentData);

//       // Fetch user details for each content entry
//       const userDetailsPromises = contentData.map(async (content) => {
//         if (content.Uid) {
//           const { data: userData, error: userError } = await supabase
//             .from('User Details')
//             .select('Username, Profile_Picture')
//             .eq('id', content.Uid)
//             .single();

//           if (userError) {
//             console.error(`Error fetching user details for Uid ${content.Uid}:`, userError);
//             return null;
//           }
//           return { Uid: content.Uid, ...userData };
//         }
//         return null;
//       });

//       const userDetails = await Promise.all(userDetailsPromises);
//       const validUserDetails = userDetails.filter((user) => user !== null);
//       console.log("User Data:", validUserDetails);
//       setUserData(validUserDetails);
//     } catch (error) {
//       console.error('Unexpected error:', error);
//     }
//   };

//   // const getUserDetails = (Uid) => {
//   //   return userData.find((user) => user.Uid === Uid) || {};
//   // };

//   const isDisabledLocation = pathname === "/";

//   // const getDaysAgo = (date) => {
//   //   const now = new Date();
//   //   const createdAt = new Date(date);
//   //   const differenceInTime = now - createdAt;
//   //   const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
//   //   return differenceInDays;
//   // };

//   // const getContentType = (url) => {
//   //   const extension = url.split('.').pop().toLowerCase();
//   //   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
//   // };



//   // const getDaysAgo = (date) => {
//   //   const now = new Date();
//   //   const createdAt = new Date(date);
//   //   const differenceInTime = now - createdAt;
//   //   const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
//   //   return differenceInDays;
//   // };

//   const getDaysAgo = (date: string): number => {
//     const now = new Date();
//     const createdAt = new Date(date);
//     const differenceInTime = now.getTime() - createdAt.getTime();
//     const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
//     return differenceInDays;
//   };



// //  const getUserDetails = (Uid: string): User | {} =>{
// //     // return userData.find((user) => user.Uid === Uid) || {};
// //     return userData.find((user) =>  userId === Uid) || {};
// //   };
  
// const getUserDetails = (Uid: string): User =>{
//   // return userData.find((user) => user.Uid === Uid) || {};
//   // return userData.find((user) =>  userId === Uid) || {};
//   return userData.find((user) => user.Uid === Uid)|| { Uid: "", Username: "Unknown", Profile_Picture: "" };
  

// };


// // const getContentType = (url) => {
// //   const extension = url.split('.').pop().toLowerCase();
// //   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
// // };

// const getContentType = (url: string):'video' | 'image'  => {
//   // const extension = url.split('.').pop().toLowerCase();
//   const extension = url.split('.').pop()?.toLowerCase() || '';
//   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
// };





//   // useEffect(() => {
//   //   const fetchPublicUrls = async () => {
//   //     const { data: files, error: listError } = await supabase.storage
//   //       .from('User Gallery')
//   //       .list('', {
//   //         limit: 100, // Adjust limit as needed
//   //         offset: 0,
//   //       });

//   //     if (listError) {
//   //       console.error('Error listing files:', listError);
//   //       return;
//   //     }

//   //     const urls = files.map((file) => {
//   //       const { data, error } = supabase.storage
//   //         .from('User Gallery')
//   //         .getPublicUrl(file.name);

//   //       if (error) {
//   //         console.error('Error getting public URL:', error);
//   //         return null;
//   //       }

//   //       // console.log("Public URL", data.publicUrl); // Check the public URL
//   //       return data.publicUrl;
//   //     }).filter(url => url !== null); // Filter out null values

//   //     setUserContent(urls);
//   //   };

//   //   fetchPublicUrls();
//   // }, []);



//   return (
//     <div className="my-10">
//       <h1 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl my-10 font-bold">
//         The Campaigns
//       </h1>
//       {loading && <Loader />} {/* Render Loader when loading */}
//       {localStorage.getItem("token") ? (<div>
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 my-8 justify-between">
//           {/* {campaignsData.map((campaign, index) => ( */}
//           {contentData?.map((content) => {
//             const user = getUserDetails(content.Uid);
//             const contentType = getContentType(content.Public_URL);
//             return (
//               <>
//                 {/* <CampaignCard
//                 username={user.Username}
//                 title={content.Title}
//                 description={content.Description}
//                 avatarImage={user.Profile_Picture}
//                 // imageUrl="/card.png"
//                 imageUrl={content.Public_URL}
//                 // postedDate={new Date(content.created_at).toLocaleDateString()}
//                 postedDate={getDaysAgo(content.created_at)+"-day"}
                
//                 goal="£20,000.00"
//                 raised="£12,000.00"
//                 toGo="£8,000.00"
//                 // goal={campaign.goal}
//                 // raised={campaign.raised}
//                 // toGo={campaign.toGo}
                
//               /> */}
//                 <CampaignCard
//                   key={content.Cid}
//                   username={user.Username}
//                   title={content.Title}
//                   description={content.Caption}
//                   avatarImage={user.Profile_Picture}
//                   imageUrl={content.Public_URL}
//                   postedDate={getDaysAgo(content.created_at) + " days"}
//                   goal="£20,000.00"
//                   raised="£12,000.00"
//                   toGo="£8,000.00"
//                   // contentType={contentType}
//                   isBookmarkDisabled={isDisabledLocation}
//                   isHeartDisabled={isDisabledLocation}
//                   uid={userId}
//                   cid={content.Cid}
//                 />

//               </>
//             )
//           })}
//           {/*  ))} */}
//         </div>

//         {/* <div className="grid grid-cols-1 gap-4 p-4">
//       {contentData?.map((content) => {
//         const user = getUserDetails(content.Uid);
//         return (
//           <div key={content.Cid} className="bg-white rounded-lg shadow-md p-4">
//             <h2 className="text-xl font-semibold mb-2">{content.Title}</h2>
//             <p className="text-gray-700 mb-2">{content.Caption}</p>
//             <p className="text-gray-500 text-sm">{new Date(content.created_at).toLocaleDateString()}</p>
//             <img src={content.Public_URL} alt={content.Title} className="w-full h-48 object-cover rounded-lg mb-2" />
            
//             <div className="flex items-center mt-4">
//               {user.Profile_Picture && (
//                 <img src={user.Profile_Picture} alt={user.Username} className="w-10 h-10 rounded-full mr-3" />
//               )}
//               <div>
//                 <p className="text-gray-700 font-semibold">{user.Username}</p>
//               </div>
//             </div>
//           </div>
//         );
//       })}
//     </div> */}











//       </div>) :
//         (<div style={{
//           textAlign: "center", display: "flex",
//           justifyContent: "center",
//           alignItems: "center", flexDirection: "column"
//         }}>

//           {/* <h1 style={{ color: "red", fontSize: "16px" }}><b> "Please Go For Login First"!!</b></h1> */}

//           {/* eslint-disable react/no-unescaped-entities */}
//           <h1 style={{ color: "red", fontSize: "16px" }}>
//             <b>"Please Go For Login First"!!</b>
//           </h1>
//           {/* eslint-enable react/no-unescaped-entities */}



//           <div className="card" style={{
//             background: "rgba(255, 255, 255, 0.8)",
//             backdropFilter: "blur(10px)",
//             boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
//             borderRadius: "10px",
//             padding: "20px",
//             maxWidth: "400px",
//             height: "100px",
//             textAlign: "center",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}>
//             <Button
//               className="bg-[#FFDA44] hover:bg-[#fde78e] text-black font-semibold px-24"
//               type="submit"
//               onClick={() => router.push("/sign-in")}

//             >
//               Login
//             </Button>


//           </div>
//         </div>
//         )}
//     </div>
//   );
// };

// export default CampaingsCom;




"use client";
import React, { useEffect, useState } from "react";
import CampaignCard from "../Card/CampaignCard";
import { Button } from "../ui/button";
import { Link } from "react-scroll";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { createClient } from "@supabase/supabase-js";
// import { useRouter } from 'next/router';
import { usePathname, useRouter } from 'next/navigation'
import Loader from "@/components/ui/loader";


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
  isDonationOff:boolean;
}

const CampaingsCom = (props: Props) => {

  const [userContent, setUserContent] = useState([]);
  const [userId, setUserId] = useState('');
 // const [contentData, setContentData] = useState([]);
 const [contentData, setContentData] = useState<Content[]>([]);
 // const [userData, setUserData] = useState([]);
 const [userData, setUserData] = useState<User[]>([]);
  const [userCred, setUserCred] = useState({});
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname()
  const router =useRouter()


  // Initialize Supabase client using environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
  const supabase = createClient(supabaseUrl, supabaseKey);

  // const campaignsData = [
  //   {
  //     username: "jordanlester123",
  //     title: "Supporting the Homeless",
  //     description:
  //       "Help us provide food, shelter, and clothing to the homeless in our community.",
  //     imageUrl: "/card.png",
  //     postedDate: "1 day",
  //     goal: "£10,000.00",
  //     raised: "£10.00",
  //     toGo: "£9,990.00",
  //   },
  //   {
  //     username: "anotheruser456",
  //     title: "Clean Water Initiative",
  //     description:
  //       "Join us in bringing clean water to communities in need around the world.",
  //     imageUrl: "/card.png",
  //     postedDate: "2 days",
  //     goal: "£15,000.00",
  //     raised: "£5,000.00",
  //     toGo: "£10,000.00",
  //   },
  //   {
  //     username: "charitylover789",
  //     title: "Educational Scholarships",
  //     description:
  //       "Support students from low-income families by providing scholarships for education.",
  //     imageUrl: "/card.png",
  //     postedDate: "3 days",
  //     goal: "£20,000.00",
  //     raised: "£12,000.00",
  //     toGo: "£8,000.00",
  //   },
  //   {
  //     username: "jordanlester123",
  //     title: "Supporting the Homeless",
  //     description:
  //       "Help us provide food, shelter, and clothing to the homeless in our community.",
  //     imageUrl: "/card.png",
  //     postedDate: "1 day",
  //     goal: "£10,000.00",
  //     raised: "£10.00",
  //     toGo: "£9,990.00",
  //   },
  //   {
  //     username: "anotheruser456",
  //     title: "Clean Water Initiative",
  //     description:
  //       "Join us in bringing clean water to communities in need around the world.",
  //     imageUrl: "/card.png",
  //     postedDate: "2 days",
  //     goal: "£15,000.00",
  //     raised: "£5,000.00",
  //     toGo: "£10,000.00",
  //   },
  //   {
  //     username: "charitylover789",
  //     title: "Educational Scholarships",
  //     description:
  //       "Support students from low-income families by providing scholarships for education.",
  //     imageUrl: "/card.png",
  //     postedDate: "3 days",
  //     goal: "£20,000.00",
  //     raised: "£12,000.00",
  //     toGo: "£8,000.00",
  //   },
  //   {
  //     username: "jordanlester123",
  //     title: "Supporting the Homeless",
  //     description:
  //       "Help us provide food, shelter, and clothing to the homeless in our community.",
  //     imageUrl: "/card.png",
  //     postedDate: "1 day",
  //     goal: "£10,000.00",
  //     raised: "£10.00",
  //     toGo: "£9,990.00",
  //   },
  //   {
  //     username: "anotheruser456",
  //     title: "Clean Water Initiative",
  //     description:
  //       "Join us in bringing clean water to communities in need around the world.",
  //     imageUrl: "/card.png",
  //     postedDate: "2 days",
  //     goal: "£15,000.00",
  //     raised: "£5,000.00",
  //     toGo: "£10,000.00",
  //   },
  //   {
  //     username: "charitylover789",
  //     title: "Educational Scholarships",
  //     description:
  //       "Support students from low-income families by providing scholarships for education.",
  //     imageUrl: "/card.png",
  //     postedDate: "3 days",
  //     goal: "£20,000.00",
  //     raised: "£12,000.00",
  //     toGo: "£8,000.00",
  //   },
  // ];

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
    setLoading(true)
    fetchContentDetails();
    fetchUserData();
    setLoading(false)
  }, []);

  const fetchUserData = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      console.log("User Found", user.id);
      setUserCred(user.user_metadata)
      setUserId(user.id)
    }


    // const { data, error } = await supabase
    //   .from<UserDetails>('User Details')
    //   .select('*')
    //   .eq('id', userId)
    //   .single();

    // if (data) {
    //   // setUserData(data);
    //   console.log("User Data:", data)
    // } else if (error) {
    //   console.error('Error fetching user:', error);
    // }
  };


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
            Uid,
            isDonationOff
          `)
          .order('created_at', { ascending: false }); 

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

  // const getUserDetails = (Uid) => {
  //   return userData.find((user) => user.Uid === Uid) || {};
  // };

  const isDisabledLocation = pathname === "/";

  // const getDaysAgo = (date) => {
  //   const now = new Date();
  //   const createdAt = new Date(date);
  //   const differenceInTime = now - createdAt;
  //   const differenceInDays = Math.floor(differenceInTime / (1000 * 3600 * 24));
  //   return differenceInDays;
  // };

  // const getContentType = (url) => {
  //   const extension = url.split('.').pop().toLowerCase();
  //   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
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
  return userData.find((user) => user.Uid === Uid)|| { Uid: "", Username: "Unknown", Profile_Picture: "" };
  

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





  // useEffect(() => {
  //   const fetchPublicUrls = async () => {
  //     const { data: files, error: listError } = await supabase.storage
  //       .from('User Gallery')
  //       .list('', {
  //         limit: 100, // Adjust limit as needed
  //         offset: 0,
  //       });

  //     if (listError) {
  //       console.error('Error listing files:', listError);
  //       return;
  //     }

  //     const urls = files.map((file) => {
  //       const { data, error } = supabase.storage
  //         .from('User Gallery')
  //         .getPublicUrl(file.name);

  //       if (error) {
  //         console.error('Error getting public URL:', error);
  //         return null;
  //       }

  //       // console.log("Public URL", data.publicUrl); // Check the public URL
  //       return data.publicUrl;
  //     }).filter(url => url !== null); // Filter out null values

  //     setUserContent(urls);
  //   };

  //   fetchPublicUrls();
  // }, []);



  return (
    <div className="my-10">
      <h1 className="text-2xl text-center md:text-4xl lg:text-4xl xl:text-4xl my-10 font-bold">
        The Campaigns
      </h1>
      {loading && <Loader />} {/* Render Loader when loading */}
      {/* {localStorage.getItem("token") ? (<div> */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 my-8 justify-between">
          {/* {campaignsData.map((campaign, index) => ( */}
          {contentData?.map((content) => {
            const user = getUserDetails(content.Uid);
            const contentType = getContentType(content.Public_URL);
            return (
              <>
                {/* <CampaignCard
                username={user.Username}
                title={content.Title}
                description={content.Description}
                avatarImage={user.Profile_Picture}
                // imageUrl="/card.png"
                imageUrl={content.Public_URL}
                // postedDate={new Date(content.created_at).toLocaleDateString()}
                postedDate={getDaysAgo(content.created_at)+"-day"}
                
                goal="£20,000.00"
                raised="£12,000.00"
                toGo="£8,000.00"
                // goal={campaign.goal}
                // raised={campaign.raised}
                // toGo={campaign.toGo}
                
              /> */}
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

        {/* <div className="grid grid-cols-1 gap-4 p-4">
      {contentData?.map((content) => {
        const user = getUserDetails(content.Uid);
        return (
          <div key={content.Cid} className="bg-white rounded-lg shadow-md p-4">
            <h2 className="text-xl font-semibold mb-2">{content.Title}</h2>
            <p className="text-gray-700 mb-2">{content.Caption}</p>
            <p className="text-gray-500 text-sm">{new Date(content.created_at).toLocaleDateString()}</p>
            <img src={content.Public_URL} alt={content.Title} className="w-full h-48 object-cover rounded-lg mb-2" />
            
            <div className="flex items-center mt-4">
              {user.Profile_Picture && (
                <img src={user.Profile_Picture} alt={user.Username} className="w-10 h-10 rounded-full mr-3" />
              )}
              <div>
                <p className="text-gray-700 font-semibold">{user.Username}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div> */}











      {/* </div>) :
        (<div style={{
          textAlign: "center", display: "flex",
          justifyContent: "center",
          alignItems: "center", flexDirection: "column"
        }}> */}

          {/* <h1 style={{ color: "red", fontSize: "16px" }}><b> "Please Go For Login First"!!</b></h1> */}

          {/* eslint-disable react/no-unescaped-entities */}
          {/* <h1 style={{ color: "red", fontSize: "16px" }}>
            <b>"Please Go For Login First"!!</b>
          </h1> */}
          {/* eslint-enable react/no-unescaped-entities */}



          {/* <div className="card" style={{
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

export default CampaingsCom;
