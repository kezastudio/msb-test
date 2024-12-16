// "use client"
// import { ChevronLeft, Ellipsis, File, Paperclip, Send } from "lucide-react";
// import Image from "next/image";
// import React,{useEffect,useState} from "react";
// import { useRouter } from 'next/navigation';
// import { Input } from "../ui/input";
// import { Button } from "../ui/button";
// import { useMessages } from "@/lib/customHooks/useMessages";
// import { useSendMessage } from  "@/lib/customHooks/useSendMessage";
// import supabase from "@/lib/supabaseClient";
// import useUser from "@/lib/customHooks/useUser";
// import DateTimeComponent from "../DateTimeComponent";

// type Props = {
//   conversationId: string;  // Can be either the Rceiver Id if being sent message the very first time or The Conversation Id if the converstion exist.
// };

// const Conversation = ({ conversationId }: Props) => {
//   const router=useRouter()
//   const userData = useUser();
//   const { messages,users, loading, isNewConvo,refetch  } = useMessages(conversationId);  // Can be either the Rceiver Id if being sent message the very first time or The Conversation Id if the converstion exist.
//   const { sendMessage } = useSendMessage();
  

//   const [newMessage, setNewMessage] = useState('');
//   const [receiverName, setReceiverName] = useState<string | null>(null);
  
//   // console.log("isNewConvo:",isNewConvo)

//   const newConversationCreate =async() => {
//     // Create new conversation
//       const { data: newConversation, error: createError } = await supabase
//         .from('conversations')
//         .insert([
//           {
//             participant_ids: [userData?.id, conversationId],
//           },
//         ])
//         .select('id');

//       if (createError) {
//         console.error('Error creating conversation:', createError);
//         return;
//       }

//       if (newConversation && newConversation.length > 0) {
        
//        return newConversation[0].id
        
//       }

//   }
  

//   const handleSendMessage = async () => {
//     if (newMessage.trim() === '') return;

//     if(isNewConvo){
//      const newConversationId= await newConversationCreate()
//      await sendMessage( newConversationId, userData?.id, newMessage);
//      setNewMessage('');
//     router.push(`/message/${ newConversationId}`);
//     }else{
//       await sendMessage(conversationId, userData?.id, newMessage); // conversationId: Can be either the Rceiver Id if being sent message the very first time or The Conversation Id if the converstion exist.
//       setNewMessage('');
//       refetch();
//     }

   
//     // Refetch messages to ensure the latest messages are displayed
    
   
//   };



// // console.log("conversationId",conversationId)
// // console.log("userData?.id",userData?.id)

// useEffect(() => {
//   if(conversationId){ 
//     console.log("conversationId",conversationId)
    
//     const fetchReceiver = async () => {
// const { data: conversationData, error: conversationError } = await supabase
// .from('conversations')
// .select('participant_ids')
// .eq('id', conversationId)
// .single();

// if (conversationError) {
// console.error('Error fetching conversation details:', conversationError);

// } else {

//   if (!conversationData.participant_ids.includes(userData?.id)) {
//     // User is not a participant, handle unauthorized access
//     // console.error("Access denied: You are not a participant in this conversation.");
//     return;
//   }
// const participantIds = conversationData.participant_ids || [];
// const currentUser = userData?.id
// console.log("current user",  userData?.id)
// const receiverId = participantIds.find((id: string) => id !== currentUser);
// console.log("Receiver user", receiverId)
// if (receiverId && userData?.id) {
//   const { data: receiverData, error: receiverError } = await supabase
//     .from('User Details')
//     .select('Username')
//     .eq('id', receiverId)
//     .single();

//   if (receiverError) {
//     console.error('Error fetching receiver details:', receiverError);
//   } else {
//     setReceiverName(receiverData.Username);

//   }
// }}
// }
// fetchReceiver()

// }
  
// }, [userData])

//   // const message = [
//   //   {
//   //     id: 1,
//   //     message: "Hello",
//   //     sender: "Sajjad",
//   //     receiver: "Mugdho",
//   //     time: "12:00",
//   //     image:
//   //       "https://sajjad-portfolio-e1f29.web.app/static/media/avater.26bc4f2ef4ffa837884b.png",
//   //   },
//   //   {
//   //     id: 2,
//   //     message: "Hi",
//   //     sender: "Mugdho",
//   //     receiver: "Sajjad",
//   //     time: "12:01",
//   //     image:
//   //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//   //   },
//   //   {
//   //     id: 3,
//   //     message: "How are you?",
//   //     sender: "Sajjad",
//   //     receiver: "Mugdho",
//   //     time: "12:02",
//   //     image:
//   //       "https://sajjad-portfolio-e1f29.web.app/static/media/avater.26bc4f2ef4ffa837884b.png",
//   //   },
//   //   {
//   //     id: 4,
//   //     message: "I'm fine",
//   //     sender: "Mugdho",
//   //     receiver: "Sajjad",
//   //     time: "12:03",
//   //     image:
//   //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//   //   },
//   //   {
//   //     id: 5,
//   //     message: "What about you?",
//   //     sender: "Mugdho",
//   //     receiver: "Sajjad",
//   //     time: "12:04",
//   //     image:
//   //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//   //   },
//   //   {
//   //     id: 6,
//   //     message: "I'm also fine",
//   //     sender: "Sajjad",
//   //     receiver: "Mugdho",
//   //     time: "12:05",
//   //     image:
//   //       "https://sajjad-portfolio-e1f29.web.app/static/media/avater.26bc4f2ef4ffa837884b.png",
//   //   },
//   //   {
//   //     id: 7,
//   //     message: "How is your day?",
//   //     sender: "Sajjad",
//   //     receiver: "Mugdho",
//   //     time: "12:06",
//   //     image:
//   //       "https://sajjad-portfolio-e1f29.web.app/static/media/avater.26bc4f2ef4ffa837884b.png",
//   //   },
//   //   {
//   //     id: 8,
//   //     message: "It's going well",
//   //     sender: "Mugdho",
//   //     receiver: "Sajjad",
//   //     time: "12:07",
//   //     image:
//   //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//   //   },
//   //   {
//   //     id: 9,
//   //     message:
//   //       "Hi Jordan! I came across your profile and I'm really inspired by your artwork and the messages behind them. 😊",
//   //     sender: "Mugdho",
//   //     receiver: "Sajjad",
//   //     time: "12:08",
//   //     image:
//   //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//   //   },
//   //   {
//   //     id: 10,
//   //     message:
//   //       "Hey Jamie! Thank you so much, that means a lot to me. It's my passion to share positive and meaningful art with the world. 🎨",
//   //     sender: "Sajjad",
//   //     receiver: "Mugdho",
//   //     time: "12:09",
//   //     image:
//   //       "https://sajjad-portfolio-e1f29.web.app/static/media/avater.26bc4f2ef4ffa837884b.png",
//   //   },
//   //   {
//   //     id: 11,
//   //     message: "I noticed you have a project coming up.",
//   //     sender: "Mugdho",
//   //     receiver: "Sajjad",
//   //     time: "12:10",
//   //     image:
//   //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//   //   },
//   //   {
//   //     id: 12,
//   //     message: "Could you tell me more about it?",
//   //     sender: "Mugdho",
//   //     receiver: "Sajjad",
//   //     time: "12:10",
//   //     image:
//   //       "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=1000&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
//   //   },
//   //   {
//   //     id: 12,
//   //     message:
//   //       "Absolutely! I'm working on a street dance series called Light in Darkness - it's focused on mental health awareness and bringing hope to those who might be struggling. Each piece will highlight different stories and emotions from my life on the streets",
//   //     sender: "Sajjad",
//   //     receiver: "Mugdho",
//   //     time: "12:10",
//   //     image:
//   //       "https://sajjad-portfolio-e1f29.web.app/static/media/avater.26bc4f2ef4ffa837884b.png",
//   //   },
//   // ];





//   return (
//     <div className="w-full flex flex-col justify-center items-center">
//       <div className="flex items-center">
//         <h1 className="text-1xl md:text-2xl lg:text-2xl xl:text-2xl my-6 font-bold">
//         {receiverName}
//         </h1>
//       </div>
//       <hr className="w-full" />
//       <div className="flex flex-col">
//         <div className="w-full flex-1 h-full overflow-y-auto md:w-3/4 lg:w-3/4 xl:w-3/4 p-5">
//         {loading ? (
//           <div className="text-center text-gray-600">Loading messages...</div>
//         ) : messages.length === 0 ? (
//           <div className="text-center text-gray-600">No messages yet.</div>
//         ) : (
//           messages.map((message) => (
//             <div
//               key={message.id}
//               className={`flex py-5 ${message.sender === userData?.id ? 'justify-end' : 'justify-start'}`}
//             >
//               <div
//                 className={`flex w-full md:w-2/3 lg:w-2/3 xl:w-2/3 items-center ${message.sender === userData?.id ? 'justify-end' : 'justify-start'}`}
//               >
//                 {message.sender !== userData?.id && users[message.sender] && (
//                   <Image
//                     src={users[message.sender].Profile_Picture || "//DefaultDP.jpg"}
//                     alt="avatar"
//                     className="rounded-full w-10 h-10 md:w-16 lg:w-20 xl:w-20 md:h-16 xl:h-20 lg:h-20"
//                     width={500}
//                     height={500}
//                   />
//                 )}
//                 {/* <div className={`bg-${message.sender === userData?.id ? 'white' : '#FAF8F0'} p-5 rounded-xl shadow-md ${message.sender === userData?.id ? 'mr-3' : 'ml-3'}`}> */}
//                 <div className={`p-5 rounded-xl shadow-md ${message.sender === userData?.id ? 'bg-white mr-3' : 'bg-[#F6F193] ml-3'}`}>
//                   <p className="text-sm lg:text-base md:text-base xl:text-base">
//                     {message.content}
//                   </p>
//                   <p className="mt-3 text-[10px] text-slate-300 text-end">
//                     <DateTimeComponent timestamp={message.timestamp} />
//                   </p>
//                 </div>
//                 {message.sender === userData?.id && (
//                   <Image
//                     src={users[userData?.id]?.Profile_Picture || "/DefaultDP.jpg"}
//                     alt="avatar"
//                     className="rounded-full w-10 h-10 md:w-16 lg:w-20 xl:w-20 md:h-16 xl:h-20 lg:h-20"
//                     width={500}
//                     height={500}
//                   />
//                 )}
//               </div>
//             </div>
//           )))}
//           <div className="w-full mx-auto md:w-2/3 lg:w-3/4 xl:w-3/4 flex justify-between items-center border rounded-md my-10 p-3 h-12">
//             <Button
//               className="bg-[#ffdd44] hover:bg-[#fae069] text-black rounded-full"
//               size="icon"
//             >
//               <Paperclip className="w-5 h-5" />
//             </Button>
//             <textarea
//               className="m-1 p-1 w-full md:w-4/5 lg:w-full xl:w-4/5 h-10 resize-none focus:outline-none"
//               cols={100}
//               placeholder="Type a message..."
//               value={newMessage}
//               onChange={(e) => setNewMessage(e.target.value)}
//             ></textarea>
//             <Button
//               variant="ghost"
//               className="text-black rounded-full"
//               onClick={handleSendMessage}
//               size="icon"
//             >
//               <Send className="w-5 h-5" />
//             </Button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Conversation;



"use client";
import { ChevronLeft, Ellipsis, File, Paperclip, Send } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useRouter } from 'next/navigation';
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useMessages } from "@/lib/customHooks/useMessages";
import { useSendMessage } from "@/lib/customHooks/useSendMessage";
import supabase from "@/lib/supabaseClient";
import useUser from "@/lib/customHooks/useUser";
import DateTimeComponent from "../DateTimeComponent";
import Spinner from "../Spinner";

type Props = {
  receiverId: string;  // ID of the user being sent a message to.
};

const Conversation = ({ receiverId }: Props) => {
  const router = useRouter();
  const userData = useUser();
  const [newMessage, setNewMessage] = useState('');
  const [receiverName, setReceiverName] = useState<string | null>(null);
  // const [conversationId, setConversationId] = useState<string | null>(null);
  const [conversationId, setConversationId] = useState<string>('');
  const { messages, users, loading, isNewConvo, refetch } = useMessages(conversationId);
 
  const { sendMessage } = useSendMessage();

  // console.log(receiverId,"receiverId")

  const newConversationCreate = async () => {
    // Create new conversation
    const { data: newConversation, error: createError } = await supabase
      .from('conversations')
      .insert([
        {
          participant_ids: [userData?.id, receiverId],
        },
      ])
      .select('id');

    if (createError) {
      console.error('Error creating conversation:', createError);
      return null;
    }

    if (newConversation && newConversation.length > 0) {
      return newConversation[0].id;
    }

    return null;
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() === '') return;

    if (!conversationId) {
      const newConversationId = await newConversationCreate();
      if (newConversationId) {
        setConversationId(newConversationId);
        await sendMessage(newConversationId, userData?.id, newMessage);
        setNewMessage('');
        
      }
    } else {
      await sendMessage(conversationId, userData?.id, newMessage);
      setNewMessage('');
      // refetch();
    }   
  };

  useEffect(() => {
    const fetchConversation = async () => {
      // Fetch existing conversation
      const { data: conversationData, error: conversationError } = await supabase
        .from('conversations')
        .select('id')
        .contains('participant_ids', [userData?.id, receiverId].filter(Boolean))
        .single();

      if (conversationError) {
        console.error('Error fetching conversation:', conversationError);
        return;
      }

      if (conversationData) {
        setConversationId(conversationData.id);
      } else {
        const newConversationId = await newConversationCreate();
        setConversationId(newConversationId);
      }
    };

    const fetchReceiverDetails = async () => {
      const { data: receiverData, error: receiverError } = await supabase
        .from('User Details')
        .select('Username')
        .eq('id', receiverId)
        .single();

      if (receiverError) {
        console.error('Error fetching receiver details:', receiverError);
      } else {
        setReceiverName(receiverData?.Username);
      }
    };

    if (receiverId) {
      fetchConversation();
      fetchReceiverDetails();
    }
  }, [receiverId, userData]);


  // useEffect(() => {
  //   if (!conversationId) return;
  //   console.log("useEffect triggered:");
  //   const messageSubscription = supabase
  //   .channel(`messages:conversation_id=eq.${conversationId}`)
  //   .on(
  //     'postgres_changes',
  //     {
  //       event: 'INSERT',
  //       schema: 'public',
  //       table: 'messages',
  //       filter: `conversation_id=eq.${conversationId}`,
  //     },
  //     (payload) => {
  //       if (payload.errors) {
  //         console.error('Subscription error:', payload.errors);
  //       } else {
  //         console.log("New message payload:", payload);
  //         refetch(); // Refetch messages whenever a new message is inserted
  //       }
  //     }
  //   )
  //   .subscribe();
  
  
  //   return () => {
  //     supabase.removeChannel(messageSubscription);
  //   };
  // }, [supabase,conversationId, refetch]);

// }, [conversationId, refetch]);
  








  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="flex items-center">
        <h1 className="text-1xl md:text-2xl lg:text-2xl xl:text-2xl my-6 font-bold">
          {receiverName}
        </h1>
      </div>
      <hr className="w-full" />
      <div className="flex flex-col">
        <div className="w-full flex-1 h-full overflow-y-auto md:w-3/4 lg:w-3/4 xl:w-3/4 p-5">
          {loading ? (
            <div className="text-center text-gray-600"> <Spinner />Loading messages...</div>
          ) : messages.length >0 ?  (
            messages.map((message) => (
              <div
                key={message.id}
                className={`flex py-5 ${message.sender === userData?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`flex w-full md:w-2/3 lg:w-2/3 xl:w-2/3 items-center ${message.sender === userData?.id ? 'justify-end' : 'justify-start'}`}
                >
                  {message.sender !== userData?.id && users[message.sender] && (
                    <Image
                      src={users[message.sender].Profile_Picture || "//DefaultDP.jpg"}
                      alt="avatar"
                      className="rounded-full w-10 h-10 md:w-16 lg:w-20 xl:w-20 md:h-16 xl:h-20 lg:h-20"
                      width={500}
                      height={500}
                    />
                  )}
                  <div className={`p-5 rounded-xl shadow-md ${message.sender === userData?.id ? 'bg-white mr-3' : 'bg-[#F6F193] ml-3'}`}>
                    <p className="text-sm lg:text-base md:text-base xl:text-base">
                      {message.content}
                    </p>
                    <p className="mt-3 text-[10px] text-slate-300 text-end">
                      <DateTimeComponent timestamp={message.timestamp} />
                    </p>
                  </div>
                  {message.sender === userData?.id && (
                    <Image
                      // src={users[userData?.id]?.Profile_Picture || "/DefaultDP.jpg"}
                      src={users[userData!.id]?.Profile_Picture || "/DefaultDP.jpg"}
                      alt="avatar"
                      className="rounded-full w-10 h-10 md:w-16 lg:w-20 xl:w-20 md:h-16 xl:h-20 lg:h-20"
                      width={500}
                      height={500}
                    />
                  )}
                </div>
              </div>
            ))
          ):(
            conversationId ?(<div className="text-center text-gray-600">ALmost there....</div>):(<div className="text-center text-gray-600">No messages yet, Start a new conversation.</div>)
          )}
          <div className="w-full mx-auto md:w-2/3 lg:w-3/4 xl:w-3/4 flex justify-between items-center border rounded-md my-10 p-3 h-12">
            <Button
              className="bg-[#ffdd44] hover:bg-[#fae069] text-black rounded-full"
              size="icon"
            >
              <Paperclip className="w-5 h-5" />
            </Button>
            <textarea
              className="m-1 p-1 w-full md:w-4/5 lg:w-full xl:w-4/5 h-10 resize-none focus:outline-none"
              cols={100}
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            ></textarea>
            <Button
              variant="ghost"
              className="text-black rounded-full"
              onClick={handleSendMessage}
              size="icon"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Conversation;

