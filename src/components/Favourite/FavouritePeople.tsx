// import React from "react";

// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Bookmark, ChevronRight } from "lucide-react";

// type Props = {};

// const FavouritePeople = (props: Props) => {
//   const peopleData = [
//     {
//       id: 1,
//       name: "John Doe",
//       username: "johndoe123",
//       imageUrl: "/avatar-2.png",
//     },
//     {
//       id: 2,
//       name: "Jane Doe",
//       username: "janedoe456",
//       imageUrl: "/avater-.png",
//     },
//     {
//       id: 3,
//       name: "Alice Smith",
//       username: "alicesmith789",
//       imageUrl: "/user1.png",
//     },
//     {
//       id: 4,
//       name: "Bob Johnson",
//       username: "bobjohnson123",
//       imageUrl: "/user2.png",
//     },
//     {
//       id: 5,
//       name: "Charlie Brown",
//       username: "charliebrown456",
//       imageUrl: "/user-3.jpg",
//     },
//   ];
//   return (
//     <div>
//       <div className="w-full">
//         {peopleData.map((person) => (
//           <div
//             className="w-full md:w-3/5 lg:3/5 xl:3/5 px-3  hover:bg-slate-100 transition-all"
//             key={person.id}
//           >
//             <div className="flex py-5 justify-between items-center gap-5  ">
//               <div className="flex items-center gap-5">
//                 <Avatar className="">
//                   <AvatarImage src={person.imageUrl} />
//                   <AvatarFallback>JN</AvatarFallback>
//                 </Avatar>
//                 <div className="text-base font-semibold ">{person.name}</div>
//               </div>

//               <div className="">
//                 <Bookmark />
//               </div>
//             </div>
//             <hr />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default FavouritePeople;



"use client"
import Image from "next/image";
import React,{useState,useEffect} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronRight,Bookmark } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { Frown,Laugh } from 'lucide-react';
import Link from "next/link";
import supabase from "@/lib/supabaseClient";

import  Loader  from "@/components/Spinner";


type User = {
  id: string;
  Username: string;
  Profile_Picture: string;
  
};


type UserSavePayload = {
  pid: string
  created_at:string
  isPSaved:boolean
  spid: string
  uid: string
 
};

type Props = {};

const FavouritePeople = (props: Props) => {

  
  const [userId, setUserId] = useState('');
 
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  const [counter, setCounter] = useState(0);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [savedUsers, setSavedUsers] = useState<{ [key: string]: boolean }>({});
  


  




 // Initialize Supabase client using environment variables
//  const supabaseUrl = process.env.NEXT_PUBLIC_MSB_SUPABASE_URL||'';
//   const supabaseKey = process.env.NEXT_PUBLIC_MSB_SUPABASE_KEY||'';
//   const supabase = createClient(supabaseUrl, supabaseKey);

 

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
   fetchUserData();
   fetchContentDetails();
 }, []);


 const toggleSave = async (pid: string) => {
  setLoading2(true);

        const isSaved = savedUsers[pid];
       

        if (isSaved) {


      
    const { data, error } = await supabase
      .from('UserSaves_People')
      .update({ isPSaved: false })
      .eq('uid', userId)
      .eq('pid', pid);

    if (error) {
      console.error('Error unsaving post:', error);
      setLoading2(false);
      
      return;
    }
    setSavedUsers(prevState => ({ ...prevState, [pid]: false }));
    console.log("Unsaving Successful")
   
    
    setLoading2(false);
    setCounter(prevCounter => prevCounter + 1);
    
  } else {
    const { data, error } = await supabase
      .from('UserSaves_People')
      .upsert([{ uid: userId, pid, isPSaved: true }], 
        { onConflict: 'uid,pid', ignoreDuplicates: false });
       




    if (error) {
      console.error('Error Saving post:', error);
      setLoading2(false);
     
      return;
    }
    setSavedUsers(prevState => ({ ...prevState, [pid]: true }));
    console.log("Save Successful")
    
    
    setLoading2(false);
    setCounter(prevCounter => prevCounter + 1);
   
  }
};





 useEffect(() => {

  console.log("from subscriotion useEffect")
  const subscribeToRealTimeChanges = async () => {
// Subscribe to real-time changes in the Saves table
    const savesChannel = supabase
      .channel(`public:savesPeople:cid=eq.${userId}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'UserSaves_People',
          filter: `uid=eq.${userId}`,
        },
        (payload) => {
          // console.log('Saves Change received!', payload?.new);
  console.log('Saves Change received!', userId);
         if(payload?.new){
          // const newSavedData: UserSavePayload | {} = payload?.new ;
          const newSavedData = payload.new as UserSavePayload;
          // Type guard to check if newSavedData is of type UserSavePayload
  if ('isPSaved' in newSavedData) {
          console.log('Saves Change received!', newSavedData);
          // setSavedUsers(prevState => ({ ...prevState, [pid]: false }));
          fetchContentDetails();
         }
        }}
      ).subscribe();

    
    return () => {
      supabase.removeChannel(savesChannel);
    };
  };

 
  subscribeToRealTimeChanges();
}, [toggleSave,counter]);








 

const fetchUserData = async ( ) => {
 
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    console.log("User Found", user.id);
    setUserId(user.id)
  }


  
};


const fetchContentDetails = async () => {
 
  setLoading(true);
    try {
      // Fetch content details from "All_Content" table
      const { data: userData, error: userError } = await supabase
        .from('User Details')
        .select(`
          id,
          Username,
          Profile_Picture
        `)
        // .eq('uid',`${userId}`)
       
        ;

      if (userError) {
        console.error('Error fetching content data:', userError);
        setLoading(false);
        return;
      }

      console.log("User Data:", userData);
      

//  // Initialize savedUsers state based on fetched data
 const savedUsersState: { [key: string]: boolean } = {};
 const filteredUserData = [];
//  userData.forEach(user => {
//    savedUsersState[user.id] = false; // default to unsaved
//  });
//  setSavedUsers(savedUsersState);


for (const user of userData) {
  const isSaved = await fetchUserSaves(user.id); // Fetch save status for each user
  savedUsersState[user.id] = isSaved;
  if (isSaved) {
    filteredUserData.push(user); // Only include users who are saved
  }
}

setSavedUsers(savedUsersState);
setUserData(filteredUserData);


    } catch (error) {
      console.error('Unexpected error:', error);
    }finally {
      setLoading(false);
    }

  };



  



  



  const fetchUserSaves = async (pid: string): Promise<boolean> => {
    let uid=''
    const { data: { user } } = await supabase.auth.getUser()
  
    if (user) {
      console.log("User Found from Search", user.id);
     uid=user.id
    }
  
    try {
      const { data, error } = await supabase
        .from('UserSaves_People')
        .select('isPSaved')
        // .eq('uid', userId)
        // .eq('uid', "4796356b-0e96-40f9-87ee-2802f93f8bf2")
        // .eq('uid', "e81725d5-c4de-4bce-bd31-68df2eb992f6")
        .eq('uid', uid)
        .eq('pid', pid)
        .single();
  
      if (error) {
        console.error('Error fetching user save status:', error);
        return false;
      }
  console.log("fetchUserSaves",data,"userId",userId)
      return data?.isPSaved ;
  
    } catch (error) {
      console.error('Unexpected error in fetchUserSaves:', error);
      return false;

    }
  };














 if (loading) {
  return <Loader />;
}

  
  return (
    <div className="w-full">
    
       
           {userData.length === 0 ? (
              <div className="flex items-center  space-x-2">
                <span>The Saved Profiles Will Appear Here</span>
                </div> 
            ) : (
              
         
      userData.map((person) => (
        <div
          className="w-full md:w-3/5 lg:3/5 xl:3/5  hover:bg-slate-100 transition-all"
          key={person.id}
        >
          <div className="flex py-5 justify-between items-center gap-5  ">
            <div className="flex items-center gap-5">
              <Avatar className="">
                <AvatarImage src={person.Profile_Picture} />
                <AvatarFallback>Name</AvatarFallback>
              </Avatar>
              <div className="text-base font-semibold ">{person.Username}</div>
            </div>

            <div className="flex flex-row gap-4 ">
            <Link href="#" title="Save" onClick={(e) => { e.preventDefault(); toggleSave(person.id); }}>
            <button >
            <Bookmark
              size={25}
              
              // color={isHeartDisabled ? "#A9A9A9" : saves ? "#FFDA44" : "currentColor"}
              //  color={ saves ? "#FFDA44" : "currentColor"}
              color={savedUsers[person.id] ? "#FFDA44" : "currentColor"}
              // fill={saves ? "#FFDA44" : "none"}
              fill={savedUsers[person.id] ? "#FFDA44" : "none"}

            />

          </button>
          </Link>


            {/* <Link href={`/profile/${person.id}`}> */}
            <Link href={person.id === userId ? "/profile" : `/profile/${person.id}`}>
              <ChevronRight />
              </Link>
            </div>
          </div>
          <hr />
        </div>
      )))}
    </div>
  );
};

export default FavouritePeople;

