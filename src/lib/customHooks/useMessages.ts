


// hooks/useMessages.ts
// import { useState, useEffect } from 'react';
// import supabase from "../supabaseClient";

// export const useMessages = (conversationId: string) => {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [loading, setLoading] = useState<boolean>(true);

//   useEffect(() => {
//     const fetchMessages = async () => {
//       const { data, error } = await supabase
//         .from('messages')
//         .select('*')
//         .eq('conversation_id', conversationId)
//         .order('timestamp', { ascending: true });

//       if (error) {
//         console.error('Error fetching messages:', error);
//       } else {
//         setMessages(data);
//       }
//       setLoading(false);
//     };

//     fetchMessages();
//   }, [conversationId]);

//   return { messages, loading };
// };


// // hooks/useMessages.ts
// import { useState, useEffect, useCallback } from 'react';
// import supabase from '../supabaseClient';
// import { useRouter } from 'next/navigation';

// export const useMessages = (conversationId: string,) => {
//   const [messages, setMessages] = useState<any[]>([]);
//   const [users, setUsers] = useState<any>({});
//   const [loading, setLoading] = useState<boolean>(true);
//   const [isNewConvo, setIsNewConvo] = useState<boolean>(false);
//   const router=useRouter()
 

// //   const fetchMessages = useCallback(async () => {
// //     setLoading(true);
// //     const { data: messagesData, error: messagesError } = await supabase
// //       .from('messages')
// //       .select('*')
// //       .eq('conversation_id', conversationId)
// //       .order('timestamp', { ascending: true });

// //     if (messagesError) {
// //       console.error('Error fetching messages:', messagesError);
// //     } else {
// //       setMessages(messagesData);
// //       const userIds = [...new Set(messagesData.map(msg => msg.sender))];
// //       const { data: usersData, error: usersError } = await supabase
// //         .from('User Details')
// //         .select('id, Username, Profile_Picture')
// //         .in('id', userIds);

// //       if (usersError) {
// //         console.error('Error fetching user details:', usersError);
// //       } else {
// //         const usersMap = usersData.reduce((acc: any, user: any) => {
// //           acc[user.id] = user;
// //           return acc;
// //         }, {});
// //         setUsers(usersMap);
// //       }
// // }
// //     setLoading(false);
// //   }, [conversationId]);




// const fetchMessages = useCallback(
//   async () => {
//     setLoading(true);

//     const { data: { user }, error } = await supabase.auth.getUser();
//     if (error) {
//       console.error('Error fetching user:', error);
//     }


    
//     const { data: conversationData, error: conversationError } = await supabase
//       .from("conversations")
//       .select("participant_ids")
//       .eq("id", conversationId)
//       .single();

//     if (conversationError) {
//       console.error("Error fetching conversation:", conversationError);
      
//       setLoading(false);
      
//       return;
//     }
// console.log("user?.id",user?.id)
//     if (conversationData && !conversationData?.participant_ids.includes(user?.id)) {
//       // User is not a participant, handle unauthorized access
//       console.error("Access denied: You are not a participant in this conversation.");
//       alert("Access denied: You are not a participant in this conversation.")
//       router.push("/404"); // Redirect to an unauthorized access page
//       setLoading(false);
//       return;
//     }

//     // Fetch messages if validation passes
//     const { data: messagesData, error: messagesError } = await supabase
//       .from("messages")
//       .select("*")
//       .eq("conversation_id", conversationId)
//       .order("timestamp", { ascending: true });

//     if (messagesError) {
//       console.error("Error fetching messages:", messagesError);
//     } else {
//       setMessages(messagesData);

//       // Fetch user details for the senders of the messages
//       const userIds = [...new Set(messagesData.map((msg) => msg.sender))];
//       const { data: usersData, error: usersError } = await supabase
//         .from("User Details")
//         .select("id, Username, Profile_Picture")
//         .in("id", userIds);

//       if (usersError) {
//         console.error("Error fetching user details:", usersError);
//       } else {
//         const usersMap = usersData.reduce((acc: any, user: any) => {
//           acc[user.id] = user;
//           return acc;
//         }, {});
//         setUsers(usersMap);
//       }
//     }

//     setLoading(false);
//   },
//   [conversationId, router]
// );






//   useEffect(() => {
//     fetchMessages();
// console.log("isNewConvo:",isNewConvo)
//   }, [conversationId, fetchMessages]);

//   return { messages, users, loading,isNewConvo, refetch: fetchMessages };
// };







import { useState, useEffect, useCallback } from 'react';
import supabase from '../supabaseClient';
import { useRouter } from 'next/navigation';

export const useMessages = (conversationId: string) => {
  const [messages, setMessages] = useState<any[]>([]);
  const [users, setUsers] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const [isNewConvo, setIsNewConvo] = useState<boolean>(false);
  const router = useRouter();

  const fetchMessages = useCallback(async () => {
    
    setLoading(true);
    if (!conversationId) 
      {
        setLoading(false);
        return;} // Early return if conversationId is null

    const { data: { user }, error } = await supabase.auth.getUser();
    if (error) {
      console.error('Error fetching user:', error);
    }

    const { data: conversationData, error: conversationError } = await supabase
      .from('conversations')
      .select('participant_ids')
      .eq('id', conversationId)
      .single();

      if (!conversationData) {
        console.error('Error fetching conversation, No Conversation Exist:', conversationData);
        setLoading(false);
      }

    if (conversationError) {
      console.error('Error fetching conversation:', conversationError);
      setLoading(false);
      return;
    }

    if (conversationData && !conversationData.participant_ids.includes(user?.id)) {
      // User is not a participant, handle unauthorized access
      console.error('Access denied: You are not a participant in this conversation.');
      alert('Access denied: You are not a participant in this conversation.');
      router.push('/404'); // Redirect to an unauthorized access page
      setLoading(false);
      return;
    }

    // Fetch messages if validation passes
    const { data: messagesData, error: messagesError } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('timestamp', { ascending: true });

    if (messagesError) {
      console.error('Error fetching messages:', messagesError);
    } else {
      setMessages(messagesData);

      // Fetch user details for the senders of the messages
      // const userIds = [...new Set(messagesData.map((msg) => msg.sender))];
      const userIds = Array.from(new Set(messagesData.map((msg) => msg.sender)));
      const { data: usersData, error: usersError } = await supabase
        .from('User Details')
        .select('id, Username, Profile_Picture')
        .in('id', userIds);

      if (usersError) {
        console.error('Error fetching user details:', usersError);
      } else {
        const usersMap = usersData.reduce((acc: any, user: any) => {
          acc[user.id] = user;
          return acc;
        }, {});
        setUsers(usersMap);
      }
    }

    setLoading(false);
  }, [conversationId, router]);

  useEffect(() => {
    fetchMessages();
    console.log('isNewConvo:', isNewConvo);
  }, [conversationId, fetchMessages]);

  useEffect(() => {
    if (!conversationId) return;

    console.log('Setting up subscription for:', conversationId);

    const messageSubscription = supabase
      .channel(`messages:conversation_id=eq.${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => {
          if (payload.errors) {
            console.error('Subscription error:', payload.errors);
          } else {
            console.log('New message payload:', payload);
            // fetchMessages(); // Refetch messages whenever a new message is inserted
            setMessages((prevMessages) => [...prevMessages, payload.new]);
          }
        }
      )
      .subscribe();

    return () => {
      console.log('Cleaning up subscription for:', conversationId);
      supabase.removeChannel(messageSubscription);
    };
  }, [conversationId]);

  return { messages, users, loading, isNewConvo, refetch: fetchMessages };
};


