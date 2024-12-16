import React,{useState, useEffect}from "react";
import { toast } from "react-toastify";
import Link from "next/link";
import supabase from "@/lib/supabaseClient";
import "react-toastify/dist/ReactToastify.css";
import FavouriteCard from "../Card/FavouriteCard";
import useUser from "@/lib/customHooks/useUser";
import  Loader  from "@/components/Spinner";

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


const FavouriteContent = (props: Props) => {

  const [userContent, setUserContent] = useState([]);
  const [userId, setUserId] = useState('');
  // const [contentData, setContentData] = useState([]);
  const [contentData, setContentData] = useState<Content[]>([]);
  // const [userData, setUserData] = useState([]);
  const [userData, setUserData] = useState<User[]>([]);
  const [userCred, setUserCred] = useState({});
  // const [saves, setSaves] = useState<boolean>(false);
  const [savedCids, setSavedCids] = useState<string[]>([]);

  const [loading, setLoading] = useState<boolean>(true);
  const [loading2, setLoading2] = useState<boolean>(true);

  const user =useUser()

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


  // useEffect(() => {
  //   setLoading(true)
  //     fetchContentDetails();
  //     fetchUserData();
  //     fetchUserSaves();
  //     setLoading(false) 
  // }, []);


  useEffect(() => {
    setLoading(true)
      // fetchContentDetails();
      fetchUserData();
      // fetchUserSaves();
      setLoading(false) 
  }, [ user]);


  useEffect(() => {
    setLoading(true)
      
      fetchUserSaves();
      setLoading(false) 
  }, [userId]);

  useEffect(() => {
    setLoading(true)
      fetchContentDetails();
     
     
      setLoading(false) 
  }, [savedCids]);
  


  // useEffect(() => {

  //   console.log("from subscriotion useEffect")
  //   const subscribeToRealTimeChanges = async () => {
      
  //     // Subscribe to real-time changes in the Saves table
  //     const savesChannel = supabase
  //     .channel('public:saves')
  //       .on(
  //         'postgres_changes',
  //         {
  //           event: '*',
  //           schema: 'public',
  //           table: 'UserSaves',
  //           filter: `Uid=eq.${userId}`,
  //         },
  //         (payload) => {
  //           console.log('Saves Change received!', payload?.new);
  
  //           fetchUserSaves();
  //           fetchContentDetails();
  //         }
  //       )
  //       .subscribe();
  
      
  //     return () => {
        
  //       supabase.removeChannel(savesChannel);
  //     };
  //   };
  
    
  //   subscribeToRealTimeChanges();
  // }, [userId]);










  const fetchUserData = async ( ) => {
   
    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      console.log("User Found from Favourite Content", user.id);
      setUserCred(user.user_metadata)
      setUserId(user.id)
    }
  };


  const fetchContentDetails = async () => {

    const validCids = savedCids.filter(cid => cid && cid.trim() !== '');

    if (validCids.length === 0) {
      console.error('No valid CIDs to fetch content for.');
      return;
    }


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
          // .eq('Cid', savedCids);
          .in('Cid', validCids);  // Use the 'in' method to match multiple CIDs


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
        // const validUserDetails = userDetails.filter((user) => user !== null);
        // console.log("User Data:", validUserDetails);
        // setUserData(validUserDetails);
        const validUserDetails = userDetails.filter((user): user is User => user !== null);
        console.log("User Data:", validUserDetails);
        setUserData(validUserDetails);


      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };

   const getUserDetails = (Uid: string): User  =>{
    return userData.find((user) => user.Uid === Uid) || { Uid: "", Username: "Unknown", Profile_Picture: "" };
    // return userData.find((user) =>  userId === Uid) || {};
  };
  
  
  
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


const fetchUserSaves = async () => {
  console.log("Frommfetch userSaves")
  setLoading2(true);
  try {
    const { data, error } = await supabase
  .from('UserSaves')
  .select('isSaved,cid')
  // .eq('uid', "4796356b-0e96-40f9-87ee-2802f93f8bf2")
  .eq('uid', userId)
  .eq('isSaved', true)
  
     console.log("Dataaaaaaaaaaaaa user saves",data)

    if (error) {
     
      console.error('Error fetching user Saves:', error);
    } else {
      // setSaves(data?.isSaved || false);
      // setSaves(data?.isSaved);
      // console.log("142",data?.isSaved)
      // console.log("isSaved",data)
      const savedCids = data.map(item => item.cid);
      // Set the extracted `cid` values to the state
      setSavedCids(savedCids);
      console.log("Saved CIDs:", savedCids);
    }
  } catch (error) {
   
    console.error('Error fetching user Saves:', error);
  } finally {
    setLoading2(false);
  }
};


if (loading || loading2) {
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
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10 my-8 justify-between">
      {contentData && contentData.length>0?  (contentData?.map((content) => {
        const user = getUserDetails(content.Uid);
        const contentType = getContentType(content.Public_URL);
        return (
            <>
              
<FavouriteCard
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
            // isBookmarkDisabled={isDisabledLocation}
            // isHeartDisabled={isDisabledLocation}
            isBookmarkDisabled={false}
            isHeartDisabled={false}
            isDonationDiabled={content.isDonationOff}
            uid={userId}
            cid={content.Cid}
          />

            </>
        )
            })):(
            <div>
              Your Saved Post Will be displayed here.
            </div>)
          
          
          }
      </div>
    </div>
  );
};

export default FavouriteContent;
