// hooks/useSendMessage.ts
import supabase from "../supabaseClient";
import { toast } from "react-toastify";

export const useSendMessage = () => {
  // const sendMessage = async (conversationId: string, sender: string, content: string) => {
    const sendMessage = async (conversationId: string, sender: string | undefined, content: string) => {
    const { error } = await supabase
      .from('messages')
      .insert([
        {
          conversation_id: conversationId,
          sender,
          content,
        },
      ]);

    if (error) {
      console.error('Error sending message:', error);
    }
    toast.success("Message Sent Successfully !", {
      // position: toast.POSITION?.TOP_CENTER,
      position: "top-center",
    })
  };

  return { sendMessage };
};
