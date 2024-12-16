import Conversation from "@/components/Inbox/Conversation";
import React from "react";

type Props = {
  params: {
    message_id: string; //Conversation Id if exist or Receiver Id
    
  };
};

const page = ({ params: { message_id} }: Props) => {
  console.log("from message",message_id);
  return (
    <div>
      <Conversation receiverId={message_id} />
    </div>
  );
};

export default page;
