// import React from "react";
// import { Bookmark, Heart } from "lucide-react";
// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import Link from "next/link";

// type CampaignCardProps = {
//   username: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   postedDate: string;
//   goal: string;
//   raised: string;
//   toGo: string;
//   avatarImage:string;
// };

// const CampaignCard: React.FC<CampaignCardProps> = ({
//   username,
//   title,
//   description,
//   imageUrl,
//   postedDate,
//   goal,
//   raised,
//   toGo,
//   avatarImage,
// }) => {
//   return (
//     <Card className="max-w-[450px] py-4 px-2">
//       <Link href="/donate-now">
//         <div className="flex gap-3 items-center">
//           <Avatar className="h-6 w-6">
//             {/* <AvatarImage src={"/avater-.png"} /> */}
//             <AvatarImage src={avatarImage} />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <h4 className="text-base font-semibold">{username}</h4>
//         </div>
//         <div className="my-5">
//           <Image
//             className=" object-cover"
//             src={imageUrl}
//             alt="card"
//             width={350}
//             height={450}
//           />
//         </div>
//         <div className="flex gap-3 mb-3 ">
//           <Bookmark color="#FFDA44" size={25} />
//           <Heart size={25} />
//         </div>
//         <CardHeader className="py-3">
//           <CardTitle>{title}</CardTitle>
//           <CardDescription className="text-black">
//             {description}
//           </CardDescription>
//         </CardHeader>
//         <p className="text-gray-300 text-xs text-right">
//           Posted {postedDate} ago
//         </p>
//         <div className="py-3">
//           <p className="text-black text-sm font-semibold">0%</p>
//           <Slider className="" defaultValue={[33]} max={100} step={1} />
//         </div>
//         <div className="flex gap-1 md:gap-4 lg:gap-5 xl:gap-5 justify-between items-center">
//           <div className="">
//             <p className="text-xs text-gray-300 font-medium">Our Goal</p>
//             <p className="text-sm font-semibold text-black">{goal}</p>
//           </div>
//           <div className="">
//             <p className="text-xs text-gray-300 font-medium">Raised</p>
//             <p className="text-sm font-semibold text-black">{raised}</p>
//           </div>
//           <div className="">
//             <p className="text-xs text-gray-300 font-medium">To Go</p>
//             <p className="text-sm font-semibold text-black">{toGo}</p>
//           </div>
//         </div>
//       </Link>
//     </Card>
//   );
// };

// export default CampaignCard;



// import React, { useState, useEffect } from "react";
// import { Bookmark, Heart, PoundSterling, CircleChevronRight, Pencil } from "lucide-react";
// import {
//   Card,
//   CardDescription,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Slider } from "@/components/ui/slider";
// import Loader from "@/components/ui/loader";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import Image from "next/image";
// import { Button } from "../ui/button";
// import Link from "next/link";
// import { createClient } from "@supabase/supabase-js";
// import { useRouter } from 'next/router';

// type CampaignCardProps = {
//   username: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   postedDate: string;
//   goal: string;
//   raised: string;
//   toGo: string;
//   avatarImage: string;
//   isBookmarkDisabled: boolean;
//   isBookmarkFilled: boolean;
//   isHeartDisabled: boolean;
//   isHeartFilled: boolean;
//   uid: string;
//   cid: string;
//   // contentType: string;
// };

// const CampaignCard: React.FC<CampaignCardProps> = ({
//   username,
//   title,
//   description,
//   imageUrl,
//   postedDate,
//   goal,
//   raised,
//   toGo,
//   avatarImage,
//   isBookmarkDisabled,
//   isBookmarkFilled,
//   isHeartDisabled,
//   isHeartFilled,
//   uid,
//   cid,
//   // contentType, // Destructured contentType prop
// }) => {

//   // Initialize Supabase client using environment variables
//   const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL;
//   const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY;
//   const supabase = createClient(supabaseUrl, supabaseKey);

//   // const [liked, setLiked] = useState(isHeartFilled);
//   const [likes, setLikes] = useState<boolean>(false);
  
//   // const [saved, setSaved] = useState(isHeartFilled);
//   const [saves, setSaves] = useState<boolean>(false);
//   const [loading, setLoading] = useState<boolean>(true);
//   const [loading2, setLoading2] = useState<boolean>(true);
//   const [error, setError] = useState<string | null>(null);
//   const [totalLikes, setTotalLikes] = useState<number | null>(null);
//   const [counter, setCounter] = useState(0);
  

//   const getContentType = (url: string) => {
//     const extension = url.split('.').pop().toLowerCase();
//     return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
//   };

//   const contentType = getContentType(imageUrl);

 
  
//   // const likePost = async () => {
//   //   const { data, error } = await supabase
//   //     .from('UserLikes')
//   //     .insert([{ uid, cid }]);

//   //   if (error) {
//   //     console.error('Error liking post:', error);
//   //     return;
//   //   }

//   //   console.log('Post liked successfully:', data);
//   // };

//   const toggleLike = async () => {
//     setLoading(true);
//     const scrollPosition = window.scrollY; // Save the scroll position

//     if (likes) {
//       const { data, error } = await supabase
//         .from('UserLikes')
//         .update({ isLiked: false })
//         .eq('uid', uid)
//         .eq('cid', cid);

//       if (error) {
//         console.error('Error unliking post:', error);
//         setLoading(false);
//         window.scrollTo(0, scrollPosition); // Restore scroll position
//         return;
//       }
//       console.log("UnLike Successful")
      
//       setLikes(false);
//       setLoading(false);
//       setCounter(prevCounter => prevCounter + 1);
//       window.scrollTo(0, scrollPosition); // Restore scroll position
//     } else {
//       const { data, error } = await supabase
//         .from('UserLikes')
//         .upsert({ uid, cid, isLiked: true }, { onConflict: ['uid', 'cid'] });

//       if (error) {
//         console.error('Error liking post:', error);
//         setLoading(false);
//         window.scrollTo(0, scrollPosition); // Restore scroll position
//         return;
//       }
//       console.log("Like Successful")
     
//       setLikes(true);
//       setLoading(false);
//       setCounter(prevCounter => prevCounter + 1);
//       window.scrollTo(0, scrollPosition); // Restore scroll position
//     }
//   };

//   const toggleSave = async () => {
//     setLoading2(true);
//     const scrollPosition = window.scrollY; // Save the scroll position
//     if (saves) {
//       const { data, error } = await supabase
//         .from('UserSaves')
//         .update({ isSaved: false })
//         .eq('uid', uid)
//         .eq('cid', cid);

//       if (error) {
//         console.error('Error unsaving post:', error);
//         setLoading2(false);
//         window.scrollTo(0, scrollPosition); // Restore scroll position
//         return;
//       }
//       console.log("Unsaving Successful")
     
//       setSaves(false);
//       setLoading2(false);
//       setCounter(prevCounter => prevCounter + 1);
//       window.scrollTo(0, scrollPosition); // Restore scroll position
//     } else {
//       const { data, error } = await supabase
//         .from('UserSaves')
//         .upsert({ uid, cid, isSaved: true }, { onConflict: ['uid', 'cid'] });

//       if (error) {
//         console.error('Error Saving post:', error);
//         setLoading2(false);
//         window.scrollTo(0, scrollPosition); // Restore scroll position
//         return;
//       }
//       console.log("Save Successful")
      
//       setSaves(true);
//       setLoading2(false);
//       setCounter(prevCounter => prevCounter + 1);
//       window.scrollTo(0, scrollPosition); // Restore scroll position
//     }
//   };





//   useEffect(() => {

//     if (uid && cid) {

//       fetchUserLikes();
//       fetchUserSaves();
//       fetchContentLikes();


//     }
//   // }, [ cid, counter]);
// }, [uid, cid, counter]);














// useEffect(() => {

//   console.log("from subscriotion useEffect")
//   const subscribeToRealTimeChanges = async () => {
//     // Subscribe to real-time changes in the Likes table
//     const likesChannel = supabase
//       .channel(`public:likes:cid=eq.${cid}`)
//       .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'UserLikes',
//           filter: `uid=eq.${uid}&cid=eq.${cid}`
          
//         },
//         (payload) => {
//           if (payload.errors) {
//             console.error('Subscription error:', payload.errors);
//           } else {
//           console.log('Likes Change received!', payload);}
//         //  setLikes(payload?.new?.isLiked)

         

//           // if (payload.eventType === 'INSERT') {
//           //   setLikes(prev => prev + 1);
//           // } else if (payload.eventType === 'DELETE') {
//           //   setLikes(prev => prev - 1);
//           // }
//         }
//       )
//       .subscribe();

//     // Subscribe to real-time changes in the Saves table
//     const savesChannel = supabase
//       .channel(`public:saves:cid=eq.${cid}`)
//       .on(
//         'postgres_changes',
//         {
//           event: '*',
//           schema: 'public',
//           table: 'UserSaves',
//           filter: `cid=eq.${cid}`,
//         },
//         (payload) => {
//           console.log('Saves Change received!', payload);

//           // if (payload.eventType === 'INSERT') {
//           //   setSaves(prev => prev + 1);
//           // } else if (payload.eventType === 'DELETE') {
//           //   setSaves(prev => prev - 1);
//           // }
//         }
//       )
//       .subscribe();

//     // Clean up subscriptions on unmount
//     return () => {
//       supabase.removeChannel(likesChannel);
//       supabase.removeChannel(savesChannel);
//     };
//   };

//   // Call the async function
//   subscribeToRealTimeChanges();
// }, [counter]); // Dependency array ensures the effect runs when campaignId changes























//   const fetchUserLikes = async () => {
//     setLoading(true);
//     try {
//       const { data, error } = await supabase
//         .from('UserLikes')
//         .select('isLiked')
//         .eq('uid', uid)
//         .eq('cid', cid)
//         .single();

//       if (error) {
//         setError(error.message);
//         console.error('Error fetching user likes:', error);
//       } else {
//         // setLikes(data?.isLiked || false);
//         setLikes(data?.isLiked);
        
        
//         console.log(data?.isLiked,uid,cid)
//       }
//     } catch (error) {
//       setError((error as Error).message);
//       console.error('Error fetching user likes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };


//   const fetchContentLikes = async () => {
//     setLoading(true);
//     try {
//       const { data, count, error } = await supabase
//         .from('UserLikes')
//         .select('isLiked', { count: 'exact' })
//         // .eq('uid', uid)
//         .eq('cid', cid)
//         .eq('isLiked', true);

//       if (error) {
//         setError(error.message);
//         console.error('Error fetching user likes:', error);
//       } else {
//         setTotalLikes(count || 0); // Set the likes count
//         console.log('Number of likes:', count);
//       }
//     } catch (error) {
//       setError((error as Error).message);
//       console.error('Error fetching user likes:', error);
//     } finally {
//       setLoading(false);
//     }
//   };













//   const fetchUserSaves = async () => {
//     setLoading2(true);
//     try {
//       const { data, error } = await supabase
//         .from('UserSaves')
//         .select('isSaved')
//         .eq('uid', uid)
//         .eq('cid', cid)
//         .single();

//       if (error) {
//         setError(error.message);
//         console.error('Error fetching user Saves:', error);
//       } else {
//         // setSaves(data?.isSaved || false);
//         setSaves(data?.isSaved);
//         // console.log(data?.isSaved)
//       }
//     } catch (error) {
//       setError((error as Error).message);
//       console.error('Error fetching user Saves:', error);
//     } finally {
//       setLoading2(false);
//     }
//   };





//   return (
//     <Card className="max-w-[450px] py-4 px-2">

//       <div className="flex gap-3 items-center">
//         <Avatar className="h-6 w-6">
//           <AvatarImage src={avatarImage} />
//           <AvatarFallback>CN</AvatarFallback>
//         </Avatar>
//         <h4 className="text-base font-semibold">{username}</h4>
//       </div>
//       {/* <div className="my-2">
//         {contentType === 'image' ? (
//           <Image
//             className="object-cover"
//             src={imageUrl}
//             alt="card"
//             width={350}
//             height={450}
//           />
//         ) : (
//           <video controls className="w-full h-auto rounded-lg mb-2">
//             <source src={imageUrl} type={`video/${imageUrl.split('.').pop()}`} />
//             Your browser does not support the video tag.
//           </video>
//         )}
//       </div> */}

// <div className="my-2 flex justify-center items-center">
//   {contentType === 'image' ? (
//     <Image
//       className="object-cover w-64 h-64"
//       src={imageUrl}
//       alt="card"
//       width={256} // 64 * 4 = 256
//       height={256} // 64 * 4 = 256
//     />
//   ) : (
//     <video
//       controls
//       className="w-64 h-64 object-cover rounded-lg mb-2"
//       style={{ objectFit: 'cover' }}
//     >
//       <source src={imageUrl} type={`video/${imageUrl.split('.').pop()}`} />
//       Your browser does not support the video tag.
//     </video>
//   )}
// </div>




//       <div className="flex gap-3 mb-3 ">
//         {/* <Bookmark color="#FFDA44" size={25} /> */}
//         {/* <Heart size={25} /> */}
//         <Link href="#" title="Save Post" onClick={toggleSave}>
//           <button disabled={isBookmarkDisabled}>
//             <Bookmark
//               size={25}
//               // color={ isBookmarkDisabled ? "#A9A9A9" : isBookmarkFilled ? "#FFDA44" : "currentColor"}
//               // fill={isBookmarkFilled ? "#FFDA44" : "none"}
//               color={isHeartDisabled ? "#A9A9A9" : saves ? "#FFDA44" : "currentColor"}
//               fill={saves ? "#FFDA44" : "none"}

//             />

//           </button>

//         </Link>
//         {loading2 && !isHeartDisabled && <Loader />}
//         <Link href="#" title="Like" onClick={toggleLike}>
//           <button disabled={isHeartDisabled}>

//             <Heart
//               size={25}
//               color={isHeartDisabled ? "#A9A9A9" : likes ? "#FFDA44" : "currentColor"}
//               fill={likes ? "#FFDA44" : "none"}
//             />

//           </button>
//           <span>{totalLikes}Likes</span>
//         </Link>
//         {loading && !isHeartDisabled && <Loader />} {/* Render Loader when loading */}
//         {/* <Link href="/donate-now" title="Donate"> */}
//         <Link href={{ pathname: '/donate-now', query: { cid } }} title="Donate">
//           <button disabled={isHeartDisabled}>
//             <PoundSterling
//               size={25}
//               color={isHeartDisabled ? "#A9A9A9" : isHeartFilled ? "#FF0000" : "currentColor"}
//               fill={isHeartFilled ? "#FF0000" : "none"}
//             />
//           </button>
//         </Link>

//         {/* <Link href="#" title="View Details">
//           <button disabled={isHeartDisabled}>
//             <CircleChevronRight
//               size={25}
//               color={isHeartDisabled ? "#A9A9A9" : isHeartFilled ? "#FF0000" : "currentColor"}
//               fill={isHeartFilled ? "#FF0000" : "none"}
//             />
//           </button>
//         </Link> */}

//       </div>
//       <CardHeader className="py-3">
//         <CardTitle>{title}</CardTitle>
//         <CardDescription className="text-black">
//           {description}
//         </CardDescription>
//       </CardHeader>
//       <p className="text-gray-300 text-xs text-right">
//         Posted {postedDate} ago
//       </p>
//       <div className="py-3">
//         <p className="text-black text-sm font-semibold">0%</p>
//         <Slider className="" defaultValue={[33]} max={100} step={1} />
//       </div>
//       <div className="flex gap-1 md:gap-4 lg:gap-5 xl:gap-5 justify-between items-center">
//         <div className="">
//           <p className="text-xs text-gray-300 font-medium">Our Goal</p>
//           <p className="text-sm font-semibold text-black">{goal}</p>
//         </div>
//         <div className="">
//           <p className="text-xs text-gray-300 font-medium">Raised</p>
//           <p className="text-sm font-semibold text-black">{raised}</p>
//         </div>
//         <div className="">
//           <p className="text-xs text-gray-300 font-medium">To Go</p>
//           <p className="text-sm font-semibold text-black">{toGo}</p>
//         </div>
//       </div>

//     </Card>
//   );
// };

// export default CampaignCard;

"use client";
import React, { useState, useEffect } from "react";
import { Bookmark, Heart, PoundSterling, CircleChevronRight, Pencil } from "lucide-react";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import Loader from "@/components/ui/loader";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Button } from "../ui/button";
import Link from "next/link";
import { createClient } from "@supabase/supabase-js";
// import { useRouter } from 'next/router';
import { usePathname, useRouter } from 'next/navigation'

type CampaignCardProps = {
  username: string;
  title: string;
  description: string;
  imageUrl: string;
  postedDate: string;
  goal: string;
  raised: string;
  toGo: string;
  avatarImage: string;
  isBookmarkDisabled: boolean;
  // isBookmarkFilled: boolean;
  isHeartDisabled: boolean;
  // isHeartFilled: boolean;
  isDonationDiabled:boolean;
  uid: string;
  cid: string;
  // contentType: string;
};

const CampaignCard: React.FC<CampaignCardProps> = ({
  username,
  title,
  description,
  imageUrl,
  postedDate,
  goal,
  raised,
  toGo,
  avatarImage,
  isBookmarkDisabled,
  // isBookmarkFilled,
  isHeartDisabled,
  // isHeartFilled,
  isDonationDiabled,
  uid,
  cid,
  // contentType, // Destructured contentType prop
}) => {

  // Initialize Supabase client using environment variables
  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL|| "";
  const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY|| "";
  const supabase = createClient(supabaseUrl, supabaseKey);

  // const [liked, setLiked] = useState(isHeartFilled);
  const [likes, setLikes] = useState<boolean>(false);
  
  // const [saved, setSaved] = useState(isHeartFilled);
  const [saves, setSaves] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [totalLikes, setTotalLikes] = useState<number | null>(null);
  const [counter, setCounter] = useState(0);
  

  const getContentType = (url: string):'video' | 'image'  => {
    // const extension = url.split('.').pop().toLowerCase();
    const extension = url.split('.').pop()?.toLowerCase() || '';
    return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
  };

  const contentType = getContentType(imageUrl);

 
  
  // const likePost = async () => {
  //   const { data, error } = await supabase
  //     .from('UserLikes')
  //     .insert([{ uid, cid }]);

  //   if (error) {
  //     console.error('Error liking post:', error);
  //     return;
  //   }

  //   console.log('Post liked successfully:', data);
  // };

  const toggleLike = async () => {
    setLoading(true);
    // const scrollPosition = window.scrollY; // Save the scroll position

    if (likes) {
      const { data, error } = await supabase
        .from('UserLikes')
        .update({ isLiked: false })
        .eq('uid', uid)
        .eq('cid', cid);

      if (error) {
        console.error('Error unliking post:', error);
        setLoading(false);
        // window.scrollTo(0, scrollPosition); // Restore scroll position
        return;
      }
      console.log("UnLike Successful")
      
      setLikes(false);
      setLoading(false);
      setCounter(prevCounter => prevCounter + 1);
      // window.scrollTo(0, scrollPosition); // Restore scroll position
    } else {
      // const { data, error } = await supabase
      //   .from('UserLikes')
      //   .upsert([{ uid, cid, isLiked: true }], { onConflict: ['uid', 'cid'] });

  const { data, error } = await supabase
  .from('UserLikes')
  .upsert(
    [{ uid, cid, isLiked: true }],
    { onConflict: 'uid,cid', ignoreDuplicates: false }
  );
 

      if (error) {
        console.error('Error liking post:', error);
        setLoading(false);
        // window.scrollTo(0, scrollPosition); // Restore scroll position
        return;
      }
      console.log("Like Successful")
     
      setLikes(true);
      setLoading(false);
      setCounter(prevCounter => prevCounter + 1);
      // window.scrollTo(0, scrollPosition); // Restore scroll position
    }
  };

  const toggleSave = async () => {
    setLoading2(true);
    // const scrollPosition = window.scrollY; // Save the scroll position
    if (saves) {
      const { data, error } = await supabase
        .from('UserSaves')
        .update({ isSaved: false })
        .eq('uid', uid)
        .eq('cid', cid);

      if (error) {
        console.error('Error unsaving post:', error);
        setLoading2(false);
        // window.scrollTo(0, scrollPosition); // Restore scroll position
        return;
      }
      console.log("Unsaving Successful")
     
      setSaves(false);
      setLoading2(false);
      setCounter(prevCounter => prevCounter + 1);
      // window.scrollTo(0, scrollPosition); // Restore scroll position
    } else {
      const { data, error } = await supabase
        .from('UserSaves')
        .upsert([{ uid, cid, isSaved: true }], 
          { onConflict: 'uid,cid', ignoreDuplicates: false });
          // { onConflict: ['uid', 'cid'] });


 

      if (error) {
        console.error('Error Saving post:', error);
        setLoading2(false);
        // window.scrollTo(0, scrollPosition); // Restore scroll position
        return;
      }
      console.log("Save Successful")
      
      setSaves(true);
      setLoading2(false);
      setCounter(prevCounter => prevCounter + 1);
      // window.scrollTo(0, scrollPosition); // Restore scroll position
    }
  };





  useEffect(() => {

    if (uid && cid) {

      fetchUserLikes();
      fetchUserSaves();
      // fetchContentLikes();


    }
  // }, [ cid, counter]);
}, [uid, cid, counter]);





useEffect(() => {

  if (uid && cid) {

   
    fetchContentLikes();


  }

}, [uid, cid, ]);








useEffect(() => {

  console.log("from subscriotion useEffect")
  const subscribeToRealTimeChanges = async () => {
    // Subscribe to real-time changes in the Likes table
    const likesChannel = supabase
      .channel(`public:likes:cid=eq.${cid}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'UserLikes',
          filter: `cid=eq.${cid}`
          
        },
        (payload) => {
          if (payload.errors) {
            console.error('Subscription error:', payload.errors);
          } else {
          console.log('Likes Change received!', payload);}
          fetchContentLikes();
        //  setLikes(payload?.new?.isLiked)
 // Only update if there's a change in the 'isLiked' value
//  if (likes !== payload?.new?.isLiked) {
//   setLikes(payload?.new?.isLiked);}
         

          // if (payload.eventType === 'INSERT') {
          //   setLikes(prev => prev + 1);
          // } else if (payload.eventType === 'DELETE') {
          //   setLikes(prev => prev - 1);
          // }
        }
      )
      .subscribe();

    // Subscribe to real-time changes in the Saves table
    const savesChannel = supabase
      .channel(`public:saves:cid=eq.${cid}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'UserSaves',
          filter: `cid=eq.${cid}`,
        },
        (payload) => {
          console.log('Saves Change received!', payload);

          // if (payload.eventType === 'INSERT') {
          //   setSaves(prev => prev + 1);
          // } else if (payload.eventType === 'DELETE') {
          //   setSaves(prev => prev - 1);
          // }
        }
      )
      .subscribe();

    // Clean up subscriptions on unmount
    return () => {
      supabase.removeChannel(likesChannel);
      supabase.removeChannel(savesChannel);
    };
  };

  // Call the async function
  subscribeToRealTimeChanges();
}, [counter]); // Dependency array ensures the effect runs when campaignId changes























  const fetchUserLikes = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('UserLikes')
        .select('isLiked')
        .eq('uid', uid)
        .eq('cid', cid)
        .single();

      if (error) {
        setError(error.message);
        console.error('Error fetching user likes:', error);
      } else {
        // setLikes(data?.isLiked || false);
        setLikes(data?.isLiked);
        
        
        console.log(data?.isLiked,uid,cid)
      }
    } catch (error) {
      setError((error as Error).message);
      console.error('Error fetching user likes:', error);
    } finally {
      setLoading(false);
    }
  };


  const fetchContentLikes = async () => {
    setLoading(true);
    try {
      const { data, count, error } = await supabase
        .from('UserLikes')
        .select('isLiked', { count: 'exact' })
        // .eq('uid', uid)
        .eq('cid', cid)
        .eq('isLiked', true);

      if (error) {
        setError(error.message);
        console.error('Error fetching user likes:', error);
      } else {
        setTotalLikes(count || 0); // Set the likes count
        console.log('Number of likes:', count);
      }
    } catch (error) {
      setError((error as Error).message);
      console.error('Error fetching user likes:', error);
    } finally {
      setLoading(false);
    }
  };













  const fetchUserSaves = async () => {
    setLoading2(true);
    try {
      const { data, error } = await supabase
        .from('UserSaves')
        .select('isSaved')
        .eq('uid', uid)
        .eq('cid', cid)
        .single();

      if (error) {
        setError(error.message);
        console.error('Error fetching user Saves:', error);
      } else {
        // setSaves(data?.isSaved || false);
        setSaves(data?.isSaved);
        // console.log(data?.isSaved)
      }
    } catch (error) {
      setError((error as Error).message);
      console.error('Error fetching user Saves:', error);
    } finally {
      setLoading2(false);
    }
  };





  return (
    <Card className="max-w-[450px] py-4 px-2">

      <div className="flex gap-3 items-center">
        <Avatar className="h-6 w-6">
          <AvatarImage src={avatarImage} />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <h4 className="text-base font-semibold">{username}</h4>
      </div>
      {/* <div className="my-2">
        {contentType === 'image' ? (
          <Image
            className="object-cover"
            src={imageUrl}
            alt="card"
            width={350}
            height={450}
          />
        ) : (
          <video controls className="w-full h-auto rounded-lg mb-2">
            <source src={imageUrl} type={`video/${imageUrl.split('.').pop()}`} />
            Your browser does not support the video tag.
          </video>
        )}
      </div> */}

<div className="my-2 flex justify-center items-center">
  {contentType === 'image' ? (
    <Image
      className="object-cover w-64 h-64"
      src={imageUrl}
      alt="card"
      width={256} // 64 * 4 = 256
      height={256} // 64 * 4 = 256
    />
  ) : (
    <video
      controls
      className="w-64 h-64 object-cover rounded-lg mb-2"
      style={{ objectFit: 'cover' }}
    >
      <source src={imageUrl} type={`video/${imageUrl.split('.').pop()}`} />
      Your browser does not support the video tag.
    </video>
  )}
</div>




      <div className="flex gap-3 mb-3 ">
        {/* <Bookmark color="#FFDA44" size={25} /> */}
        {/* <Heart size={25} /> */}
        {/* <Link href="#" title="Save Post" onClick={toggleSave}> */}
        <Link href="#" title="Save" onClick={(e) => { e.preventDefault(); toggleSave(); }}>
          <button disabled={isBookmarkDisabled}>
            <Bookmark
              size={25}
              // color={ isBookmarkDisabled ? "#A9A9A9" : isBookmarkFilled ? "#FFDA44" : "currentColor"}
              // fill={isBookmarkFilled ? "#FFDA44" : "none"}
              color={isHeartDisabled ? "#A9A9A9" : saves ? "#FFDA44" : "currentColor"}
              fill={saves ? "#FFDA44" : "none"}

            />

          </button>

        </Link>
        {loading2 && !isHeartDisabled && <Loader />}
        {/* <Link href="#" title="Like" onClick={toggleLike}> */}
        <Link href="#" title="Like" onClick={(e) => { e.preventDefault(); toggleLike(); }}>

          <button disabled={isHeartDisabled}>

            <Heart
              size={25}
              color={isHeartDisabled ? "#A9A9A9" : likes ? "#FFDA44" : "currentColor"}
              fill={likes ? "#FFDA44" : "none"}
            />

          </button>
          <span>{totalLikes}Likes</span>
        </Link>
        {loading && !isHeartDisabled && <Loader />} {/* Render Loader when loading */}
        {/* <Link href="/donate-now" title="Donate"> */}
        <Link href={{ pathname: '/donate-now', query: { cid } }} title={isHeartDisabled || isDonationDiabled ? "Donation Disabled"  : "Donation"}>
          <button disabled={isHeartDisabled || isDonationDiabled}>
            <PoundSterling
              size={25}
              color={isHeartDisabled || isDonationDiabled ? "#A9A9A9"  : "currentColor"}
              // fill={isHeartFilled ? "#FF0000" : "none"}
            />
          </button>
        </Link>

        {/* <Link href="#" title="View Details">
          <button disabled={isHeartDisabled}>
            <CircleChevronRight
              size={25}
              color={isHeartDisabled ? "#A9A9A9" : isHeartFilled ? "#FF0000" : "currentColor"}
              fill={isHeartFilled ? "#FF0000" : "none"}
            />
          </button>
        </Link> */}

      </div>
      <CardHeader className="py-3">
        <CardTitle>{title}</CardTitle>
        <CardDescription className="text-black">
          {description}
        </CardDescription>
      </CardHeader>
      <p className="text-gray-300 text-xs text-right">
        Posted {postedDate} ago
      </p>
      
      
      <div className="py-3">
      <p className="text-black text-sm font-semibold">0%</p>
      {/* <Slider className="" defaultValue={[33]} max={100} step={1} /> */}
      <Slider className="" defaultValue={isDonationDiabled?[0]:[33]} max={100} step={1} disabled={isDonationDiabled} />
    </div>
      <div className="flex gap-1 md:gap-4 lg:gap-5 xl:gap-5 justify-between items-center">
        <div className="">
          <p className="text-xs text-gray-300 font-medium">Our Goal</p>
          <p className="text-sm font-semibold text-black">{isDonationDiabled?"N/A":goal}</p>
        </div>
        <div className="">
          <p className="text-xs text-gray-300 font-medium">Raised</p>
          <p className="text-sm font-semibold text-black">{isDonationDiabled?"N/A":raised}</p>
        </div>
        <div className="">
          <p className="text-xs text-gray-300 font-medium">To Go</p>
          <p className="text-sm font-semibold text-black">{isDonationDiabled?"N/A":toGo}</p>
        </div>
      </div>
     
    </Card>
  );
};

export default CampaignCard;

