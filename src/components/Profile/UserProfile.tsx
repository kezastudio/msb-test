// import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Button } from "../ui/button";
// import { ChevronLeft, Edit, Images, MessageCircle, Pencil } from "lucide-react";
// import Link from "next/link";
// import Image from "next/image";
// import { useParams } from "next/navigation";

// type Props = {
//   userId: string;
// };

// const UserProfile = ({ userId }: Props) => {

//   const params = useParams();
//   const { id } = params;


//   const contents = [
//     {
//       id: 1,
//       images: "/card.png",
//     },

//     {
//       id: 2,
//       images: "/card.png",
//     },

//     {
//       id: 3,
//       images: "/card.png",
//     },

//     {
//       id: 4,
//       images: "/card.png",
//     },

//     {
//       id: 5,
//       images: "/card.png",
//     },

//     {
//       id: 6,
//       images: "/card.png",
//     },

//     {
//       id: 7,
//       images: "/card.png",
//     },

//     {
//       id: 8,
//       images: "/card.png",
//     },

//     {
//       id: 9,
//       images: "/card.png",
//     },

//     {
//       id: 10,
//       images: "/card.png",
//     },

//     {
//       id: 11,
//       images: "/card.png",
//     },

//     {
//       id: 12,
//       images: "/card.png",
//     },

//     {
//       id: 13,
//       images: "/card.png",
//     },

//     {
//       id: 14,
//       images: "/card.png",
//     },

//     {
//       id: 15,
//       images: "/card.png",
//     },

//     {
//       id: 16,
//       images: "/card.png",
//     },

//     {
//       id: 17,
//       images: "/card.png",
//     },

//     {
//       id: 18,
//       images: "/card.png",
//     },

//     {
//       id: 19,
//       images: "/card.png",
//     },

//     {
//       id: 20,
//       images: "/card.png",
//     },

//     {
//       id: 21,
//       images: "/card.png",
//     },

//     {
//       id: 22,
//       images: "/card.png",
//     },

//     {
//       id: 23,
//       images: "/card.png",
//     },

//     {
//       id: 24,
//       images: "/card.png",
//     },

//     {
//       id: 25,
//       images: "/card.png",
//     },

//     {
//       id: 26,
//       images: "/card.png",
//     },

//     {
//       id: 27,
//       images: "/card.png",
//     },

//     {
//       id: 28,
//       images: "/card.png",
//     },

//     {
//       id: 29,
//       images: "/card.png",
//     },

//     {
//       id: 30,
//       images: "/card.png",
//     },

//     {
//       id: 31,
//       images: "/card.png",
//     },

//     {
//       id: 32,
//       images: "/card.png",
//     },

//     {
//       id: 33,
//       images: "/card.png",
//     },

//     {
//       id: 34,
//       images: "/card.png",
//     },
//   ];

//   console.log(userId);
//   return (
//     <div className="w-full flex flex-col justify-center items-center">
//       <div className="py-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//         <div className="flex justify-center">
//           <h1 className="text-2xl text-center my-6 font-bold">Sajjadmugdho</h1>
//         </div>
//         <div className="flex flex-col items-center justify-between">
//           <div className="flex gap-5 my-5 items-center">
//             <Avatar className="w-20 h-20">
//               <AvatarImage
//                 src={
//                   "https://sajjad-portfolio-e1f29.web.app/static/media/avater.26bc4f2ef4ffa837884b.png"
//                 }
//                 alt="avatar"
//               />
//               <AvatarFallback>JD</AvatarFallback>
//             </Avatar>
//           </div>

//           <div className="">
//             <Link href="/message/1">
//               <Button className="rounded-3xl bg-slate-400 px-5 py-2 text-sm font-semibold">
//                 <MessageCircle className="mr-2 w-4 h-4" /> <span>Message</span>
//               </Button>
//             </Link>
//           </div>
//         </div>
//         <div className="flex flex-col px-3 py-5 gap-5">
//           <div className="">
//             <p className="text-base font-bold">Name</p>
//             <p className="text-sm font-semibold text-gray-500 ">
//               MD Sajjad Hossen
//             </p>
//           </div>
//           <div className="">
//             <p className="text-base font-bold">Username</p>
//             <p className="text-sm font-semibold text-gray-500 ">
//               @Sajjadmugdho
//             </p>
//           </div>
//           <div className="">
//             <p className="text-base font-bold">Goals</p>
//             <p className="text-sm font-semibold text-gray-500 ">
//               My goals are as follows, here is where my goals will go when I
//               type them
//             </p>
//           </div>
//           <div className="">
//             <p className="text-base font-bold">Website or social link</p>
//             <p className="text-sm font-semibold text-gray-500 ">
//               www.instagram.com/jordanlester123
//             </p>
//           </div>
//           <div className="">
//             <p className="text-base font-bold">Content</p>
//           </div>
//         </div>
//       </div>
//       <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-5 -mt-10 mb-10">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 ">
//           {contents.map((content) => (
//             <div key={content.id} className="">
//               <Image
//                 className=""
//                 src={content.images}
//                 alt="content"
//                 width={250}
//                 height={300}
//               />
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default UserProfile;


"use client"
import React,{useState,useEffect} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { ChevronLeft, Edit, Images, MessageCircle, Pencil } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useParams,useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import { toast } from "react-toastify";
import useUser from "@/lib/customHooks/useUser";

type Props = {
  userId: string;
};

type Content= {

  Public_URL: string;
 
}

type UserDetails = {
  id: string;
  Username: string;
  Profile_Picture: string;
  Goals:string;
  Website: string;
  
};




const UserProfile = ({ userId }: Props) => {

 
console.log(userId,"id")
  
  // const [userDetails, setUserDetails] = useState(null); //Visited Profile User Details
  const [userDetails, setUserDetails] = useState<UserDetails|null>(null); //Visited Profile User Details
  // const [userContent, setUserContent] = useState([]);
  const [userContent, setUserContent] = useState<Content[]>([]);
  const [senderId, setSenderId] = useState(''); //Logged in User Id
  const [isLoading, setIsloading] = useState<boolean>(false);
  const router = useRouter();
  const userData = useUser(); // Fetching logged In user details from supabase auth
  // console.log("useUser",userData?.id)
  // console.log("Sender",senderId)


  const getUser = async () => {

   
 
    if (userId) {
      // Fetch user details of the visited from the "User Details" table
      const { data, error } = await supabase
        .from('User Details')
        .select('*')
        .eq('id', userId)
        .single();

      if (error) {
        console.error('Error fetching user details:', error);
        
      } else {
        setUserDetails(data);
        console.log("userDetails",data)
        // setUserDP(data.Profile_Picture)
        // console.log("Sucessful", data.Profile_Picture)

      }
    }

  };


  const showToastMessage = () => {
    if (!localStorage.getItem("token")) {
      toast.error("Please Login First !", {
        position: "top-center",
      })
    };
  };





  useEffect(() => {
    setIsloading(true);
    getUser().finally(() => setIsloading(false));
    fetchPublicUrls();
    showToastMessage();
  }, []);


  useEffect(() => {
    if(userData){
      setSenderId(userData.id)
    }
  }, [userData]);


  const fetchPublicUrls = async () => {
  try {
    const { data, error } = await supabase
      .from('All_Content')
      .select('Public_URL')
      .eq('Uid', userId); 

    if (error) throw error;

    console.log("Public URL", data); 
    setUserContent(data);
    return data;
  } catch (error) {
    console.error('Error fetching content:', error);
    return [];
  }
  }


  const handleClickMessage = async () => {
    
      router.push(`/message/${userId}`);
    
  };

  // const  handleClickMessage = async () => {
  //   // If a conversationId is provided, validate it
  //   if (conversationId) {
  //     const { data: conversation, error: conversationError } = await supabase
  //       .from('conversations')
  //       .select('id, participant_ids')
  //       .eq('id', conversationId)
  //       .single();
  
  //     if (conversationError) {
  //       console.error('Error fetching conversation:', conversationError);
  //       return;
  //     }
  
  //     // Check if the current user is a participant
  //     if (conversation.participant_ids.includes(userId)) {
  //       // User is a participant, navigate to the conversation
  //       router.push(`/message/${conversationId}`);
  //     } else {
  //       // User is not a participant, deny access
  //       console.error('Access denied: You are not a participant in this conversation.');
  //       return;
  //     }
  //   } else {
  //     // No conversationId provided, check if conversation already exists
  //     const { data: existingConversations, error: checkError } = await supabase
  //       .from('conversations')
  //       .select('id, participant_ids')
  //       .contains('participant_ids', [userId, senderId]);
  
  //     if (checkError) {
  //       console.error('Error checking conversation:', checkError);
  //       return;
  //     }
  
  //     if (existingConversations && existingConversations.length > 0) {
  //       // Conversation exists, navigate to it
  //       router.push(`/message/${existingConversations[0].id}`);
  //     } else {
  //       // Create new conversation
  //       const { data: newConversation, error: createError } = await supabase
  //         .from('conversations')
  //         .insert([
  //           {
  //             participant_ids: [userId, senderId],
  //           },
  //         ])
  //         .select('id');
  
  //       if (createError) {
  //         console.error('Error creating conversation:', createError);
  //         return;
  //       }
  
  //       if (newConversation && newConversation.length > 0) {
  //         // Navigate to the new conversation
  //         router.push(`/message/${newConversation[0].id}`);
  //       }
  //     }
  //   }
  // };
  
  
  // const isVideoFile = (url) => {
  //   const videoExtensions = ['mp4', 'webm', 'ogg'];
  //   const extension = url?.split('.').pop().toLowerCase();
  //   return videoExtensions.includes(extension);
  // };

  // const isVideoFile = (url: string):'video' | 'image'=> {
  //   const videoExtensions = ['mp4', 'webm', 'ogg'];
  //   const extension = url.split('.').pop()?.toLowerCase() || '';
  //   return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
  // };


  const isVideoFile = (url: string): true | false => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const extensionMatch = url.split('.').pop();
    const extension = extensionMatch ? extensionMatch.toLowerCase() : '';

    console.log(`URL: ${url}, Extension: ${extension}`); // Debugging line

    return videoExtensions.includes(extension) ? true : false;
};


  console.log("userDetails",userDetails);


  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="py-10 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
        <div className="flex justify-center">
          <h1 className="text-2xl text-center my-6 font-bold">{userDetails?.Username}</h1>
        </div>
        <div className="flex flex-col items-center justify-between">
          <div className="flex gap-5 my-5 items-center">
            <Avatar className="w-20 h-20">
              <AvatarImage
                src={
                  userDetails?.Profile_Picture
                }
                alt="avatar"
              />
              <AvatarFallback>{userDetails?.Username}</AvatarFallback>
            </Avatar>
          </div>

          <div className="">
            {/* <Link href="/message/1"> */}
              <Button className="rounded-3xl bg-slate-400 px-5 py-2 text-sm font-semibold" onClick={ handleClickMessage}>
                <MessageCircle className="mr-2 w-4 h-4" /> <span>Message</span>
              </Button>
            {/* </Link> */}
          </div>
        </div>
        <div className="flex flex-col px-3 py-5 gap-5">
          <div className="">
            <p className="text-base font-bold">Name</p>
            <p className="text-sm font-semibold text-gray-500 ">
            {userDetails?.Username}
            </p>
          </div>
          <div className="">
            <p className="text-base font-bold">Username</p>
            <p className="text-sm font-semibold text-gray-500 ">
              @{userDetails?.Username}
            </p>
          </div>
          <div className="">
            <p className="text-base font-bold">Goals</p>
            <p className="text-sm font-semibold text-gray-500 ">
            {userDetails?.Goals}
            </p>
          </div>
          <div className="">
            <p className="text-base font-bold">Website or social link</p>
            <p className="text-sm font-semibold text-gray-500 ">
            {userDetails?.Website}
            </p>
          </div>
          <div className="">
            <p className="text-base font-bold">Content</p>
          </div>
        </div>
      </div>
      <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-5 -mt-10 mb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 ">
          {userContent?.map((content,index) => {
              const isVideo = isVideoFile(content?.Public_URL);
              return (
            <div key={index} className="">
              {isVideo ? (
                    <video width="250" height="200" controls className="object-cover w-64 h-64">
                      <source src={content?.Public_URL} type="video/mp4" />
                      Your browser does not support the video tag.
                    </video>
                  ) : (
              <Image
                className=""
                src={content?.Public_URL}
                alt="content"
                width={250}
                height={300}
              />)}
            </div>
              )
          })}
         
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

