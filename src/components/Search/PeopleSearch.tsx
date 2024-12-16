// import Image from "next/image";
// import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { ChevronRight } from "lucide-react";

// type Props = {};

// const PeopleSearch = (props: Props) => {
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
//     <div className="w-full">
//       <p className="text-base  text-slate-400">
//         {peopleData.length} Search results for ‘jordan’
//       </p>
//       {peopleData.map((person) => (
//         <div
//           className="w-full md:w-3/5 lg:3/5 xl:3/5  hover:bg-slate-100 transition-all"
//           key={person.id}
//         >
//           <div className="flex py-5 justify-between items-center gap-5  ">
//             <div className="flex items-center gap-5">
//               <Avatar className="">
//                 <AvatarImage src={person.imageUrl} />
//                 <AvatarFallback>JN</AvatarFallback>
//               </Avatar>
//               <div className="text-base font-semibold ">{person.name}</div>
//             </div>

//             <div className="">
//               <ChevronRight />
//             </div>
//           </div>
//           <hr />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default PeopleSearch;



"use client"
import Image from "next/image";
import React,{useState,useEffect} from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronRight,Bookmark } from "lucide-react";
import { createClient } from "@supabase/supabase-js";
import { toast } from "react-toastify";
import { Frown,Laugh } from 'lucide-react';
import Link from "next/link";

import  Loader  from "@/components/ui/loader-search";

type PeopleSearchProps = { search: string;};
type User = {
  id: string;
  Username: string;
  Profile_Picture: string;
  
};

const PeopleSearch :React.FC<PeopleSearchProps>=({search,}) => {

  const [searchData, setSearchData] = useState<string>('');
  const [userId, setUserId] = useState('');
 
  const [userData, setUserData] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
 
  const [counter, setCounter] = useState(0);
  const [loading2, setLoading2] = useState<boolean>(true);
  const [savedUsers, setSavedUsers] = useState<{ [key: string]: boolean }>({});
  


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
   fetchUserData();
 }, []);



 useEffect(() => {
  if (searchData) {
    fetchContentDetails();
   
  }
}, [searchData]);
















const fetchUserData = async ( ) => {
 
  const { data: { user } } = await supabase.auth.getUser()

  if (user) {
    console.log("User Found", user.id);
    setUserId(user.id)
  }


  
};


const fetchContentDetails = async () => {
  fetchUserData()
  const trimmedSearchData = searchData.trim();
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
        // .eq('Username',`${trimmedSearchData}`)
        .ilike('Username', `%${trimmedSearchData}%`);
        ;

      if (userError) {
        console.error('Error fetching content data:', userError);
        setLoading(false);
        return;
      }

      console.log("User Data:", userData);
      

//  // Initialize savedUsers state based on fetched data
 const savedUsersState: { [key: string]: boolean } = {};
//  userData.forEach(user => {
//    savedUsersState[user.id] = false; // default to unsaved
//  });
//  setSavedUsers(savedUsersState);


for (const user of userData) {
  const isSaved = await fetchUserSaves(user.id); // Fetch save status for each user
  savedUsersState[user.id] = isSaved;
}
setSavedUsers(savedUsersState);
setUserData(userData);


    } catch (error) {
      console.error('Unexpected error:', error);
    }finally {
      setLoading(false);
    }

  };



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
      // setCounter(prevCounter => prevCounter + 1);
      
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
      // setCounter(prevCounter => prevCounter + 1);
     
    }
  };



  



// Function to check if a user is saved
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
      <p className="text-base  text-slate-400">
        {/* {userData.length} Search results for ‘{searchData}’ */}
        {searchData ? (
            userData.length === 0 ? (
              <div className="flex items-center  space-x-2">
                <span> No results found for “{searchData}”!</span><Frown />
                </div> 
            ) : (
              <div className="flex items-center  space-x-2">
              <span>{userData.length} Search results for “{searchData}”</span> <Laugh />
              </div>
            )
          ) : (
            <span>Please search for users</span>
          )}
      </p>
      {userData.map((person) => (
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
      ))}
    </div>
  );
};

export default PeopleSearch;
