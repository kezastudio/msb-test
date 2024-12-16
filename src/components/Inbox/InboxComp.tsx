// import React from "react";
// import { Button } from "../ui/button";
// import { Ellipsis } from "lucide-react";

// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

// type Props = {};

// const InboxComp = (props: Props) => {
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
//     <div className="w-full flex flex-col items-center ">
//       <div className=" w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
//         <h1 className="text-2xl my-5 md:text-4xl text-center lg:text-4xl xl:text-4xl font-bold ">
//           Inbox
//         </h1>
//         {/* <Button
//           variant="ghost"
//           className="text-black rounded-full ml-auto"
//           size="icon"
//         >
//           <Ellipsis className="w-5 h-5" />
//         </Button> */}
//       </div>

//       <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3py-8 px-4">
//         {messages.map((message) => (
//           <div
//             className="w-full  px-2  hover:bg-slate-50 transition-all"
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
//                   <p className="text-sm text-gray-400 my-1">
//                     {message.message}
//                   </p>
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

// export default InboxComp;

"use client"
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { Ellipsis } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import supabase from "@/lib/supabaseClient";
import useUser from "@/lib/customHooks/useUser";
import DateTimeComponent from "../DateTimeComponent";
import Spinner from "../Spinner";

interface Message {
  id: string;
  name: string;
  imageUrl: string;
  message: string;
  time: string;
}

interface Conversation {
  id: string;
  participant_ids: string[];
  last_message: string;
  last_message_time: string;
  name:string;
  profilePicture:string;
  otherId:string;
}

type Props = {};

const InboxComp: React.FC<Props> = (props: Props ) => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const[loading,setLoading]=useState<boolean>(false)
  const router = useRouter()
  const userData=useUser();

  useEffect(() => {
setLoading(true)
    const fetchConversations = async () => {
      const { data, error } = await supabase
        .from("conversations")
        .select("id, participant_ids, updated_at")
        .contains("participant_ids", [userData?.id])
        .order("updated_at", { ascending: false });

      if (error) {
        console.error("Error fetching conversations:", error);
        setLoading(false)
        return;
      }

      const convosWithLastMessage = await Promise.all(
        data.map(async (conversation) => {
          const { data: messages } = await supabase
            .from("messages")
            .select("content, timestamp,sender")
            .eq("conversation_id", conversation.id)
            .order("timestamp", { ascending: false })
            .limit(1)
            .single();

            const { data: receiver } = await supabase
            .from("User Details")
            .select("Profile_Picture,Username")
            // .eq("id",  conversation.participant_ids.find(id => id !== userData?.id))
            .eq("id",  conversation.participant_ids.find((id: string) => id !== userData?.id))
            .single();
           

          return {
            id: conversation.id,
            participant_ids: conversation.participant_ids,
            last_message: messages?.content || "No messages yet",
            last_message_time: messages?.timestamp || conversation.updated_at,
            senderId:messages?.sender,
            // otherId : conversation.participant_ids.find(id => id !== userData?.id),
            otherId : conversation.participant_ids.find((id: string) => id !== userData?.id),
            profilePicture:receiver?.Profile_Picture,
            name:receiver?.Username
          };
        })
      );

     

      setConversations(convosWithLastMessage);
      setLoading(false)
    };

    userData?.id && fetchConversations();
  }, [userData?.id]);

  const handleConversationClick = (conversationId: string) => {
    router.push(`/message/${conversationId}`);
  };

  if (loading) {
    return (
      <div className="w-full flex flex-col items-center">
        <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
          <h1 className="text-2xl my-5 md:text-4xl text-center lg:text-4xl xl:text-4xl font-bold">
            Inbox
          </h1>
        </div>
        <Spinner />
      </div>
    );
  }
  


  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3">
        <h1 className="text-2xl my-5 md:text-4xl text-center lg:text-4xl xl:text-4xl font-bold">
          Inbox
        </h1>
      </div>

      <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 py-8 px-4">
        {conversations.length === 0 ? (
          <div className="text-center text-gray-500">No conversations found</div>
        ) : (
          conversations.map((conversation) => (
            <div
              className="w-full px-2 hover:bg-slate-50 transition-all cursor-pointer"
              key={conversation.id}
              onClick={() => handleConversationClick(conversation?.otherId)}
            >
              <div className="flex py-5 justify-between items-center gap-5">
                <div className="flex items-center gap-5">
                  <Avatar>
                    {/* <AvatarImage src={conversation?.profilePicture} />  */}
                    <AvatarImage src={conversation?.profilePicture || "DefaultDP.jpg"}/>
                    <AvatarFallback>NA</AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-base font-bold">
                      {/* {conversation.participant_ids
                        .filter((id) => id !== userData?.id)
                        .join(", ")} */}
                        {conversation?.name}
                    </div>
                    <p className="text-sm text-gray-400 my-1">
                      {conversation.last_message}
                    </p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  {/* {new Date(conversation.last_message_time).toLocaleString()} */}
                  <DateTimeComponent timestamp={conversation.last_message_time} />
                </div>
              </div>
              <hr />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default InboxComp;

