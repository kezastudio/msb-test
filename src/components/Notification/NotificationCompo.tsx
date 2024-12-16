// import React from "react";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import { Ellipsis } from "lucide-react";
// import { Button } from "../ui/button";

// type Props = {};

// const NotificationCompo = (props: Props) => {
//   const messages = [
//     {
//       id: 1,
//       name: "John Doe",
//       imageUrl: "/avatar-2.png",
//       message: "Hello, how are you?",
//       time: "now",
//     },
//     {
//       id: 2,
//       name: "Jane Doe",
//       imageUrl: "/avater-.png",
//       message: "Hi, I’m interested in your campaign.",
//       time: "2 days ago",
//     },
//     {
//       id: 3,
//       name: "Alice Smith",
//       imageUrl: "/user1.png",
//       message: "Can you please provide more information?",
//       time: "3 days ago",
//     },
//     {
//       id: 4,
//       name: "Bob Johnson",
//       imageUrl: "/user2.png",
//       message: "I have a question about your campaign.",
//       time: "4 days ago",
//     },
//     {
//       id: 5,
//       name: "Charlie Brown",
//       imageUrl: "/user-3.jpg",
//       message: "I would like to donate to your cause.",
//       time: "5 days ago",
//     },
//   ];
//   return (
//     <div className="w-full flex flex-col justify-center items-center">
//       <div className="my-2 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//         <h1 className="text-2xl my-3 md:text-4xl text-center lg:text-4xl xl:text-4xl font-bold ">
//           Notifications
//         </h1>
//       </div>

//       <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-4 py-8">
//         {messages.map((message) => (
//           <div
//             className=" px-2  hover:bg-slate-50 transition-all"
//             key={message.id}
//           >
//             <div className="flex py-5 justify-between items-center gap-5  ">
//               <div className="flex items-center gap-5">
//                 <Avatar className="">
//                   <AvatarImage src={message.imageUrl} />
//                   <AvatarFallback>JN</AvatarFallback>
//                 </Avatar>
//                 <div className="">
//                   <div className="text-base font-bold">{message.name}</div>
//                 </div>
//               </div>

//               <div className="text-sm text-gray-400">{message.time}</div>
//             </div>
//             <hr />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default NotificationCompo;


"use client"
import { useState, useEffect } from 'react';
import { createClient, User } from '@supabase/supabase-js';
import supabase from '@/lib/supabaseClient';
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { ChevronRight } from "lucide-react";
import { Ellipsis } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link"; 
import DateTimeComponent from "../DateTimeComponent";

interface UserDetails {
  Username: string;
  Profile_Picture: string;
}

interface ContentDetails {
  Title: string;
  Caption: string;
  Public_URL:string;
}

interface NotificationData {
  type: 'message' | 'like' | 'transaction';
  uid: string;  // user id of sender/liker/donor
  cid?: string; // content id for transactions
  content: string; // notification message (e.g., "You received a message" or "Someone liked your content")
  userDetails: UserDetails | null; // To store username and profile picture
  contentDetails?: ContentDetails | null; // To store content details for transactions
  time?: string; //? Make 'time' optional
  id?: string; //  id for notifications
}

const Notification: React.FC = () => {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<User | null>(null);


  const getContentType = (url: string):'video' | 'image'  => {
    // const extension = url.split('.').pop().toLowerCase();
    const extension = url.split('.').pop()?.toLowerCase() || '';
    return ['mp4', 'webm', 'ogg'].includes(extension) ? 'video' : 'image';
  };

  // Helper to format the current time
const formatTime = (date: Date) => {
  return date.toLocaleString(); 
};





  useEffect(() => {
    const fetchLoggedInUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      setLoggedInUser(user);

      const fetchNotifications = async () => {
        if (!user) return;
    
        const { data, error } = await supabase
          .from('notifications')
          .select('id, type, notification_content, content_details,cid, timestamp, sender_id')
          .eq('uid', user.id)
          .eq('is_read', false); // Only fetch unread notifications
    
        if (error) {
          console.error('Error fetching notifications:', error);
        } else {
          // console.log("Success",data)
          const fetchedNotifications = await Promise.all(
            data.map(async (notification: any) => {
              const userDetails = await fetchUserDetails(notification.sender_id);
              return {
                type: notification.type,
                uid: notification.sender_id,
                cid: notification.cid,
                content: notification.notification_content,
                userDetails,
                contentDetails: notification.content_details || null,
                time: formatTime(new Date(notification.timestamp)),
                id: notification.id, // Store ID for deletion later
              };
            })
          );
    
          setNotifications(fetchedNotifications);
        }
      };
    
      fetchNotifications();
    };

    fetchLoggedInUser();

  }, []);

  const fetchUserDetails = async (uid: string) => {
    const { data, error } = await supabase
      .from('User Details')
      .select('Username, Profile_Picture')
      .eq('id', uid)
      .single();

    if (error) {
      console.error('Error fetching user details:', error);
      return null;
    }

    return data as UserDetails;
  };

  const fetchContentDetails = async (cid: string) => {
    const { data, error } = await supabase
      .from('All_Content') 
      .select('Title, Caption,Public_URL')
      .eq('Cid', cid)
      .single();

    if (error) {
      console.error('Error fetching content details:', error);
      return null;
    }

    return data as ContentDetails;
  };

  useEffect(() => {
    if (!loggedInUser) return;

    
    // Handle new message notification
    const handleNewMessage = async (payload: any) => {
      // Check if the logged-in user is a participant in this conversation
      const { data: conversation } = await supabase
        .from('conversations')
        .select('participant_ids')
        .eq('id', payload.new.conversation_id)
        .single();

      if (conversation && conversation.participant_ids.includes(loggedInUser.id)) {
        const userDetails = await fetchUserDetails(payload.new.sender);

if(loggedInUser.id !=payload.new.sender){
// Insert the notification into Supabase
try {
const { data,error } = await supabase
.from('notifications')
.insert([
  {
    uid: loggedInUser.id,
    sender_id: payload.new.sender,
    type: 'message',
    notification_content: 'has sent you a new message!',
    content_details: null, // No content details for messages
  },
]);

if (error) {
console.error('Error inserting notification:', error);
} else {
setNotifications((prev) => [
  ...prev,
  {
    type: 'message',
    uid: payload.new.sender,
    content: 'has sent you a new message!',
    userDetails,
    time: formatTime(new Date()),
  },
]);
console.log("Insertion Successful",data)
}
} catch (e) {
  console.error('Unexpected error:', e);
}
}
// else{
//   setNotifications((prev) => [
//   ...prev,
//   {
//     type: 'message',
//     uid: payload.new.sender,
//     content: 'has sent you a new message!',
//     userDetails,
//     time: formatTime(new Date()),
//   },
// ]);
// }
      }}

// Fetch content owned by the logged-in user
const fetchUserContentIds = async () => {
  const { data, error } = await supabase
    .from('All_Content') 
    .select('Cid')
    .eq('Uid', loggedInUser.id); // Fetch content where the logged-in user is the owner

  if (error) {
    console.error('Error fetching user content:', error);
    return [];
  }
console.log("data",data)
  return data.map((content: { Cid: string }) => content.Cid); // Extract list of content IDs
};




const handleNewLike = async (payload: any) => {
  // Fetch content owned by the logged-in user
  const userContentIds = await fetchUserContentIds();

  // Check if the liked content belongs to the logged-in user and isLiked is true
  if (userContentIds.includes(payload.new.cid) && payload.new.isLiked === true) {
   
   
    const contentDetails = await  fetchContentDetails(payload.new.cid);

    // Fetch details of the liker
    const userDetails = await fetchUserDetails(payload.new.uid);

// Insert the notification into Supabase
try {
const { data,error } = await supabase
.from('notifications')
.insert([
{
uid: loggedInUser.id,
sender_id:payload.new.uid,
cid:payload.new.cid,
type: 'like',
notification_content: 'has liked your campaign,',
content_details: contentDetails, //  content details for Liked campaign
},
]);

if (error) {
console.error('Error inserting notification:', error);
} else {
setNotifications((prev) => [
...prev,
{
  type: 'like',
  uid: payload.new.uid,
  cid:payload.new.cid,
  content: 'has liked your campaign,',
  contentDetails,
  userDetails,
  time: formatTime(new Date()),
},
]);
}
} catch (e) {
console.error('Unexpected error:', e);
}

    // setNotifications((prev) => [
    //   ...prev,
    //   {
    //     type: 'like',
    //     uid: payload.new.uid,
    //     cid:payload.new.cid,
    //     content: 'has liked your campaign,',
    //     contentDetails,
    //     userDetails,
    //     time: formatTime(new Date()),
    //   },
    // ]);

   
};
}
    // Handle new transaction notification
    const handleNewTransaction = async (payload: any) => {
      const userDetails = await fetchUserDetails(payload.new.donor_id);
      const contentDetails = await fetchContentDetails(payload.new.cid);


      try {
        const { data,error } = await supabase
        .from('notifications')
        .insert([
        {
        uid: loggedInUser.id,
        sender_id:payload.new.donor_id,
        cid:payload.new.cid,
        type: 'transaction',
        notification_content: 'has contributed to your campaign,',
        content_details: contentDetails, //  content details for Liked campaign
        },
        ]);
        
        if (error) {
        console.error('Error inserting notification:', error);
        } else {
          console.log("Success",data)
        setNotifications((prev) => [
        ...prev,
        {
          type: 'transaction',
          uid: payload.new.donor_id,
          cid: payload.new.cid,
          content: ' has contributed to your campaign,',
          userDetails,
          contentDetails,
          time: formatTime(new Date()),
        },
        ]);
        }
        } catch (e) {
        console.error('Unexpected error:', e);
        }







      // setNotifications((prev) => [
      //   ...prev,
      //   {
      //     type: 'transaction',
      //     uid: payload.new.donor_id,
      //     cid: payload.new.cid,
      //     content: ' has contributed to your campaign,',
      //     userDetails,
      //     contentDetails,
      //     time: formatTime(new Date()),
      //   },
      // ]);
    };

     // Subscribe to messages for the logged-in user
     const messageSubscription = supabase
     .channel('realtime-messages')
     .on(
       'postgres_changes',
      //  { event: 'INSERT', schema: 'public', table: 'messages' },
       { event: 'INSERT', schema: 'public', table: 'messages' },
       handleNewMessage
     )
     .subscribe();


   // Subscribe to userLikes table for any new likes
  const likeSubscription = supabase
  .channel('realtime-likes')
  .on(
    'postgres_changes',
    { event: '*', schema: 'public', table: 'UserLikes' },
    (payload) => {
      if (payload.errors) {
        console.error('Subscription error:', payload.errors);
      } else {
      console.log('Likes received!', payload);
       // Refetch donations whenever there is an insert, update, or delete
       handleNewLike(payload);}
    }
    // handleNewLike
  )
  .subscribe();

    // Subscribe to transactions table for the logged-in user
    const transactionSubscription = supabase
      .channel('realtime-transactions')
      .on(
        'postgres_changes',
        { event: 'INSERT', schema: 'public', table: 'transactions', filter: `uid=eq.${loggedInUser.id}` },
        handleNewTransaction
      )
      .subscribe();

    // Cleanup subscriptions on component unmount
    return () => {
      supabase.removeChannel(messageSubscription);
      supabase.removeChannel(likeSubscription);
      supabase.removeChannel(transactionSubscription);
    };
  }, [loggedInUser]);

//   return (
//     <div className="notification-container">
//       {notifications.length > 0 ? (
//         <ul>
//           {notifications.map((notification, index) => (
//             <li key={index} className="notification-item">
//               {notification.userDetails ? (
//                 <>
//                   <img
//                     src={notification.userDetails.Profile_Picture}
//                     alt={`${notification.userDetails.Username}'s profile picture`}
//                     className="profile-picture"
//                   />
//                   <span className="username">{notification.userDetails.Username}</span>
                 
//                 </>
//               ) : (
//                 <span>Unknown User</span>
//               )}
//               <span className="content">{notification.content}</span>

//               {notification.type === 'transaction'||'like' && notification.contentDetails && (
//                 <div className="content-details">
//                   <span className="title text-sm font-semibold text-black">{notification.contentDetails.Title}</span>
//                   {/* <span className="description">{notification.contentDetails.Caption}</span> */}
//                   {/* <img
//                     src={notification.contentDetails?.Public_URL}
//                     alt={`${notification.contentDetails?.Title}'s  picture`}
//                     className="profile-picture"
//                   /> */}

// <div className="my-2 flex justify-center items-center">
 
//  {getContentType(notification.contentDetails?.Public_URL) === 'image' ? (
//     <Image
//       className="object-cover w-64 h-64"
//       src={notification.contentDetails?.Public_URL}
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
//       <source src={notification.contentDetails?.Public_URL} type={`video/${notification.contentDetails?.Public_URL.split('.').pop()}`} />
//       Your browser does not support the video tag.
//     </video>
//   )}
// </div>

//                 </div>
//               )}
//             </li>
//           ))}
//         </ul>
//       ) : (
//         <p>No new notifications</p>
//       )}
//     </div>
//   );


const handleNotificationClick = async (notificationId: string, cid: string | undefined) => {
  if (!notificationId) {
    console.error('Notification ID is required');
    return;
  }
  try {
  // Update the isRead status in Supabase
  const { error } = await supabase
    .from('notifications')
    .update({ is_read: true })  // Mark notification as read
    .eq('id', notificationId);

  if (error) {
    console.error('Error updating notification:', error);
  } 
  // else {
  //   // Redirect to the content page (if applicable)
  //   if (cid) {
  //     router.push(`/donate-now?cid=${cid}`);
  //   }
  // }

} catch (e) {
  console.error('Unexpected error:', e);
  }

}




return (
//   <div className="w-full flex flex-col justify-center items-center">
//     {/* Header */}
//     <div className="my-2 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//       <h1 className="text-2xl my-3 md:text-4xl text-center lg:text-4xl xl:text-4xl font-bold">
//         Notifications
//       </h1>
//     </div>

//     {/* Notification Messages */}
//     <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-4 py-8">
//       {notifications.length > 0 ? (
//         notifications.map((notification, index) => (
          
//           <div
//             className="px-2 hover:bg-slate-50 transition-all"
//             key={index}
//           >
//             <div className="flex py-5 justify-between items-center gap-4">
//               {/* Avatar and User Details */}
//               <div className="flex items-center gap-2">
//               <Link href={ `/profile/${notification?.uid}`} title='Visit The User'>
             
             
//                 <Avatar>
//                   <AvatarImage
//                     src={notification.userDetails?.Profile_Picture}
//                     alt={notification.userDetails?.Username}
//                   />
//                   <AvatarFallback>
//                     {notification.userDetails?.Username?.[0] || "U"}
//                   </AvatarFallback>
//                 </Avatar>
                
//                 </Link>
//                 <div>
//                   <div className="text-base font-bold">
//                     {notification.userDetails?.Username || "Unknown User"}
//                   </div>
                
//                 </div>
//                 <div className="text-sm text-gray-500">
//                    {notification.content}
//                   </div>

//                   {(notification.type === 'transaction' || notification.type === 'like') && notification.contentDetails && (
//               <div className="flex items-center  gap-2 ">
//                 <Link
//           href={{ pathname: '/donate-now', query: {cid:notification?.cid} }}
//            title='Visit The Post'
//           passHref
//           key={index}
          
//          >
//                 <div className="content-thumbnail flex-shrink-0">
//                   {getContentType(notification.contentDetails?.Public_URL) === 'image' ? (
//                     <Image
//                       src={notification.contentDetails?.Public_URL}
//                       alt={notification.contentDetails?.Title}
//                       className="w-10 h-10 object-cover rounded-lg"
//                       width={40}
//                       height={40}
//                     />
//                   ) : (
//                     <video
//                       controls
//                       className="w-10 h-10 object-cover rounded-lg"
//                     >
//                       <source
//                         src={notification.contentDetails?.Public_URL}
//                         type={`video/${notification.contentDetails?.Public_URL.split('.').pop()}`}
//                       />
//                       Your browser does not support the video tag.
//                     </video>
//                   )}
//                 </div>
                
//                 </Link>
//                 <div className="text-sm font-semibold text-black">
//                   {notification.contentDetails?.Title}
//                 </div>
//               </div>
//             )}
//               </div>

//                 {/* Content Details for 'like' or 'transaction' */}
//             {/* {(notification.type === 'transaction' || notification.type === 'like') && notification.contentDetails && (
//               <div className="flex items-left gap-4 ">
//                 <div className="text-sm font-semibold text-black">
//                   {notification.contentDetails?.Title}
//                 </div>
//                 <div className="content-thumbnail flex-shrink-0">
//                   {getContentType(notification.contentDetails?.Public_URL) === 'image' ? (
//                     <Image
//                       src={notification.contentDetails?.Public_URL}
//                       alt={notification.contentDetails?.Title}
//                       className="w-10 h-10 object-cover rounded-lg"
//                       width={40}
//                       height={40}
//                     />
//                   ) : (
//                     <video
//                       controls
//                       className="w-20 h-20 object-cover rounded-lg"
//                     >
//                       <source
//                         src={notification.contentDetails?.Public_URL}
//                         type={`video/${notification.contentDetails?.Public_URL.split('.').pop()}`}
//                       />
//                       Your browser does not support the video tag.
//                     </video>
//                   )}
//                 </div>
//               </div>
//             )} */}

//               {/* Timestamp */}
//               {/* <div className="text-sm text-gray-400">{notification.time}
                
//               </div> */}
             
//               <Link 
//   href={
//     notification.type === 'transaction' || notification.type === 'like'
//       ? {
//           pathname: '/donate-now',
//           query: { cid: notification?.cid }
//         }
//       : {
//         pathname: `/message/${notification?.uid}`,
        
//       }
//   } 
//   title={
//     notification.type === 'transaction' || notification.type === 'like'
//       ? 'Visit The Post'
//       : ' Visit Your Conversation'
//   }
// >
// <div className="flex items-center  gap-2"><div className="text-sm text-gray-400"> {notification.time && <DateTimeComponent timestamp={notification.time} />}</div> <ChevronRight /> </div>
                


             
              
//               </Link>
             
//             </div>

          
//             <hr className="mt-4" />
//           </div>
         
//         ))
//       ) : (
//         <p>No new notifications</p>
//       )}
//     </div>
//   </div>

<div className="w-full flex flex-col justify-center items-center">
  {/* Header */}
  <div className="my-2 w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
    <h1 className="text-2xl my-3 md:text-4xl text-center lg:text-4xl xl:text-4xl font-bold">
      Notifications
    </h1>
  </div>

  {/* Notification Messages */}
  <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-4 py-8">
    {notifications.length > 0 ? (
      notifications.map((notification, index) => (
        <div
          className="px-2 hover:bg-slate-50 transition-all"
          key={index}
        >
          {/* Flex Container with Responsive Layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 items-center">
  {/* Username and Profile Picture */}
  <div className="flex items-center gap-2">
    <Link href={`/profile/${notification?.uid}`} title="Visit The User">
      <Avatar>
        <AvatarImage
          src={notification.userDetails?.Profile_Picture}
          alt={notification.userDetails?.Username}
        />
        <AvatarFallback>
          {notification.userDetails?.Username?.[0] || "U"}
        </AvatarFallback>
      </Avatar>
    </Link>
    <Link href={`/profile/${notification?.uid}`} title="Visit The User">
      <div className="text-base font-bold">
        {notification.userDetails?.Username || "Unknown User"}
      </div>
    </Link>
  </div>

  {/* Notification Content */}
  <div className="text-sm text-gray-500">
    {notification.content}
  </div>

  {/* Content DP and Title */}
  {(notification.type === 'transaction' || notification.type === 'like') && notification.contentDetails? (
    <div className="flex items-center gap-2">
      <Link
        href={{ pathname: '/donate-now', query: { cid: notification?.cid } }}
        title="Visit The Post"
        passHref
        key={index}
      >
        {/* Content DP */}
        <div className="content-thumbnail">
          {getContentType(notification.contentDetails?.Public_URL) === 'image' ? (
            <Image
              src={notification.contentDetails?.Public_URL}
              alt={notification.contentDetails?.Title}
              className="w-10 h-10 object-cover rounded-lg"
              width={40}
              height={40}
            />
          ) : (
            <video controls className="w-10 h-10 object-cover rounded-lg">
              <source
                src={notification.contentDetails?.Public_URL}
                type={`video/${notification.contentDetails?.Public_URL.split('.').pop()}`}
              />
              Your browser does not support the video tag.
            </video>
          )}
        </div>
      </Link>
      {/* Content Title */}
      <div className="text-sm font-semibold text-black">
        {notification.contentDetails?.Title}
      </div>
    </div>
  ):(
    <div></div>
  )
}

  {/* Timestamp and Action Button */}
  <div className="flex items-center gap-2">
    <div className="text-sm text-gray-400">
      {notification.time && <DateTimeComponent timestamp={notification.time} />}
    </div>
    <Link 
      href={
        notification.type === 'transaction' || notification.type === 'like'
          ? {
              pathname: '/donate-now',
              query: { cid: notification?.cid }
            }
          : {
              pathname: `/message/${notification?.uid}`,
            }
      } 
      title={
        notification.type === 'transaction' || notification.type === 'like'
          ? 'Visit The Post'
          : 'Visit Your Conversation'
      }
      onClick={() => handleNotificationClick(notification.id || '', notification.cid)}
    >
      <ChevronRight />
    </Link>
  </div>
</div>

          <hr className="mt-4" />
        </div>
      ))
    ) : (
      <p>No new notifications</p>
    )}
  </div>
</div>

);
};




export default Notification;

