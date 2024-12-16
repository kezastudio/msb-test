// import React from "react";
// import { Card, CardDescription, CardHeader, CardTitle } from "../ui/cardB";
// import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
// import Image from "next/image";
// import { Bookmark, Heart } from "lucide-react";
// import { Slider } from "../ui/slider";
// import { Button } from "../ui/button";

// type Props = {
//   username: string;
//   title: string;
//   description: string;
//   imageUrl: string;
//   postedDate: string;
//   goal: string;
//   raised: string;
//   toGo: string;
// };

// const DonateNowSingle = () => {
//   return (
//     <div className="flex flex-col items-center md:px-3 lg:px-3 xl:px-3 py-10">
//       <Card className="py-1 w-full md:max-w-[400px] lg:max-w-[600px] xl:max-w-[600px] ">
//         <div className="flex gap-3 items-center">
//           <Avatar className="h-6 w-6">
//             <AvatarImage src={"/avater-.png"} />
//             <AvatarFallback>CN</AvatarFallback>
//           </Avatar>
//           <h4 className="text-base font-semibold">jordanlester123</h4>
//         </div>
//         <div className="my-5">
//           <Image
//             src={"/card.png"}
//             className="min-w-[270px] "
//             alt="card"
//             width={600}
//             height={700}
//           />
//         </div>
//         <div className="flex gap-3 pb-3 ">
//           <Bookmark color="#FFDA44" size={25} />
//           <Heart size={25} />
//         </div>
//         <CardHeader className="py-3">
//           <CardTitle>Supporting the Homeless</CardTitle>
//           <CardDescription className="text-black">
//             Help us provide food, shelter, and clothing to the homeless in our
//             community.
//           </CardDescription>
//         </CardHeader>
//         <p className="text-gray-300 text-xs text-right">Posted 1 days ago</p>
//         <div className="py-3">
//           <p className="text-black text-sm font-semibold">0%</p>
//           <Slider className="" defaultValue={[33]} max={100} step={1} />
//         </div>
//         <div className="flex gap-5 justify-between items-center">
//           <div className="">
//             <p className="text-xs text-gray-300 font-medium">Our Goal</p>
//             <p className="text-sm font-semibold text-black">£10,000.00</p>
//           </div>
//           <div className="">
//             <p className="text-xs text-gray-300 font-medium">Raised</p>
//             <p className="text-sm font-semibold text-black">£10.00</p>
//           </div>
//           <div className="">
//             <p className="text-xs text-gray-300 font-medium">To Go</p>
//             <p className="text-sm font-semibold text-black">£9,990.00</p>
//           </div>
//         </div>
//       </Card>

//       <Button className=" bg-[#FFDA44] m-8 text-black font-bold hover:bg-[#fae595] px-20 py-5">
//         Donate Now
//       </Button>
//     </div>
//   );
// };

// export default DonateNowSingle;



"Use Client"
import React, { useState, useEffect } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Card, CardDescription, CardHeader, CardTitle } from "../ui/cardB";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Image from "next/image";
import { Bookmark, Heart, ReceiptPoundSterling } from "lucide-react";
import { Slider } from "../ui/slider";
import { Button } from "../ui/button";
import Link from 'next/link';
import Modal from "../../components/ui/modal";
// import PaymentPage from '../Donate/PaymentPage';
import PaymentPage from '../../components/Payment/PaymentPage'
import { Input } from "../ui/input";
import supabase from "@/lib/supabaseClient";
import DateTimeComponent from "../DateTimeComponent";



import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { donateBoxSchema, donateBoxSchemaType } from "@/lib/schema/profile";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";


interface Donation {
  Username: string;
  Profile_Picture: string;
  amount: number;
  transaction_time: string;
  donor_id: string;
}



type Props = {
  uid:string;
  username: string;
  title: string;
  description: string;
  imageUrl: string;
  postedDate: number;
  goal: string;
  raised: string;
  toGo: string;
  profilePicture: string;
  likes: string;
};

const DonateNowSingle: React.FC<Props> = ({
  uid,
  username,
  title,
  description,
  imageUrl,
  postedDate,
  goal,
  raised,
  toGo,
  profilePicture,
  likes,
}) => {

  const form = useForm<donateBoxSchemaType>({
    resolver: zodResolver(donateBoxSchema),
    // defaultValues: {
    //   amount: 0,  
    // },
  });
  const router = useRouter();
  const searchParams = useSearchParams()

  const cid = searchParams.get('cid')
  // console.log("cid",cid)

  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);

  const [userId, setUserId] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // Track submission
  const [showForm, setShowForm] = useState(false); // Track whether the form should be shown
  const [hasDonated, setHasDonated] = useState(false);
 


  const [isModalOpen, setModalOpen] = useState(false);
  const [isVideoFile, setIsVideoFile] = useState(false);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);



  const fetchUserData = async () => {

    const { data: { user } } = await supabase.auth.getUser()

    if (user) {
      console.log("User Found from Favourite Content", user.id);
      setUserId(user.id)
    }
  };

  useEffect(() => {
    fetchUserData();
    if (userId) {
      // Fetch the donation status once the user ID is available
      fetchDonationStatus();
    }
  }, [userId]); 

  // useEffect(() => {

  //   //Fetching The Current Logged In User
  //   fetchUserData();


  //   // Simulate a database fetch for donation status
  //   const fetchDonationStatus = async () => {
  //     // Replace this with actual database fetch
  //     const userHasDonated = await simulateDatabaseFetch();
  //     setHasDonated(userHasDonated);
  //   };

  //   fetchDonationStatus();
  // }, []);

  // // Simulate a database fetch function (for demonstration purposes)
  // const simulateDatabaseFetch = async () => {
  //   // Simulating a user who has donated before. You can change this to false for testing the "Donate Now" button.
  //   return true; // Set to false for first-time donors
  // };

// Real database check for donation status
const fetchDonationStatus = async () => {
  if (!userId) return;

  try {
    const { data, error } = await supabase
      .from('transactions') // Assuming the table is called 'transactions'
      .select('transaction_id') // Only need to check if a record exists
      .eq('donor_id', userId) // Match logged-in user
      .eq('cid', cid) // Match campaign
      .limit(1); // We only need to know if at least one donation exists

    if (error) {
      console.error('Error fetching donation status:', error.message);
      return;
    }
console.log("data.error",data.length)
    // If data is returned, the user has donated
    setHasDonated(data.length > 0);
  } catch (err) {
    console.error('Error fetching donation status:', err);
  }
};


useEffect(() => {
  fetchUserData();
  if (userId) {
    // Fetch the donation status once the user ID is available
    fetchDonationStatus();
  }
}, [userId]); // Runs when userId is updated




  const fetchDonations = async () => {
    try {
      // Fetch the transactions data first
      const { data: transactionsData, error } = await supabase
        .from('transactions')
        .select('amount, transaction_time, donor_id')
        .eq('cid', cid);

      if (error) {
        console.error('Error fetching donations:', error.message);
        return;
      }

      if (transactionsData && transactionsData.length > 0) {
        // Extract donor IDs from the transactions
        const donorIds = transactionsData.map(donation => donation.donor_id);

        // Step 2: Fetch user details based on donor IDs
        const { data: userDetails, error: userDetailsError } = await supabase
          .from('User Details')
          .select('id, Username, Profile_Picture')
          .in('id', donorIds); // Fetch all users whose IDs are in the donorIds array

        if (userDetailsError) {
          console.error('Error fetching user details:', userDetailsError.message);
          return;
        }

        // Merge transactions with user details
        const donationsWithUserDetails = transactionsData.map(donation => {
          const user = userDetails.find(user => user.id === donation.donor_id);
          return {
            ...donation,
            Username: user?.Username,
            Profile_Picture: user?.Profile_Picture,
          };
        });

        // Calculate total donation amount and count
        const totalAmount = transactionsData.reduce((acc, donation) => acc + donation.amount, 0);
        const totalDonations = transactionsData.length;

        setDonations(donationsWithUserDetails); // Set the merged data
        setTotalDonationAmount(totalAmount);
        setTotalDonations(totalDonations);
      }
    } catch (err) {
      console.error('Error fetching donations:', err);
    }
  };


  useEffect(() => {
  
//Fetching The List Of Donations
    fetchDonations();
  }, [cid]);
  


 

  const onSubmit = async (data: donateBoxSchemaType) => {

//     try {
//       // Construct the payload for the transaction
//       const payload = {
//         amount: data.amount, 
//         cid: cid,  
//         uid: uid,  
//         donor_id: userId, 
//       };
// console.log("payload",payload)

  
//       // Insert into the transactions table
//       const {data:transactionData, error } = await supabase
//         .from('transactions')
//         .insert([payload]);
  
//       if (error) {
//         console.error("Error inserting donation data:", error.message);
//       } else {
//         setHasDonated(true);
//         setIsSubmitted(true);
//         setShowForm(false);

//         console.log("Donation submitted:", transactionData);
//         router.push(`/payment?donor_id=${userId}&amount=${data.amount}&cid=${cid}`);
//       }
//     } catch (error) {
//       console.error("An unexpected error occurred:", error);
//     }

    setHasDonated(true);
    setIsSubmitted(true);
    setShowForm(false);
    console.log("Donation submitted:", data);
    router.push(`/payment?donor_id=${userId}&amount=${data.amount}&cid=${cid}`);
  };

  const handleDonateNow = () => {
    setShowForm(true); // Show the donation form when "Donate Now" is clicked
  };

  const handleDonateAgain = () => {
    setShowForm(true); // Hide form, show button
    // setIsSubmitted(false); // Reset submission state to allow re-donation
  };


  

  const isVideoFiles = (url: string): true | false => {
    const videoExtensions = ['mp4', 'webm', 'ogg'];
    const extensionMatch = url.split('.').pop();
    const extension = extensionMatch ? extensionMatch.toLowerCase() : '';

    // console.log(`URL: ${url}, Extension: ${extension}`); // Debugging line

    return videoExtensions.includes(extension) ? true : false;
  };


  useEffect(() => {
    console.log("from subscriotion useEffect")
     const subscribeToRealTimeChanges = async () => {
       // Subscribe to real-time changes in the Likes table
       const donationsChannel = supabase
         .channel(`donations:cid=eq.${cid}`)
         .on(
           'postgres_changes',
           {
             event: '*',
             schema: 'public',
             table: 'transactions',
             filter: `cid=eq.${cid}`
             
           },
           (payload) => {
             if (payload.errors) {
               console.error('Subscription error:', payload.errors);
             } else {
             console.log('Donation received!', payload);}
              // Refetch donations whenever there is an insert, update, or delete
         fetchDonations();
           }
         )
         .subscribe();
   
       // Clean up subscriptions on unmount
       return () => {
         supabase.removeChannel(donationsChannel);
       };
     };
   
    
     subscribeToRealTimeChanges();
 
   }, [cid,isSubmitted,onSubmit]);










  return (
    <div className="flex flex-col items-center  md:px-1 lg:px-3 xl:px-3 py-10">
      {/* <Card className="py-1 w-full md:max-w-[400px] lg:max-w-[400px] xl:max-w-[400px] "> */}
      {/* <Card className="max-w-[650px] py-4 px-2  md:px-1"> */}
      <Card className="w-full max-w-[90%] md:max-w-[650px] py-4 px-4 sm:px-6 md:px-8 lg:px-10">

        <div className="flex gap-3 items-center">
          <Avatar className="h-6 w-6">
            <AvatarImage src={profilePicture} />
            <AvatarFallback>{username?.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <h4 className="text-base font-semibold">{username}</h4>
        </div>
        <div className="flex justify-center my-5">
          {/* {isVideoFiles(imageUrl) ? (<video width="650" height="200" controls className="object-cover w-64 h-64"> */}
          {isVideoFiles(imageUrl) ? (<video width="450" height="100" controls className="min-w-[270px]">
            <source src={imageUrl} type="video/mp4" />

            Your browser does not support the video tag.
          </video>) : (<Image
            src={imageUrl}
            className="min-w-[270px]"
            alt="card"
            width={450}
            height={250}
          />)}

        </div>
        <div className="flex gap-3 pb-3">
          {/* <Bookmark color="#FFDA44" size={25} /> */}
          {/* <Heart size={25} /> */}
          <button disabled >

            <Bookmark
              size={25}
              color={"#A9A9A9"}
            // fill={likes ? "#FFDA44" : "none"}
            />

          </button>
          <button disabled >

            <Heart
              size={25}
              color={"#A9A9A9"}
            // fill={likes ? "#FFDA44" : "none"}
            />

          </button>
          <span>{likes}Likes</span>
        </div>
        <CardHeader className="py-3">
          <CardTitle>{title}</CardTitle>
          <CardDescription className="text-black">
            {description}
          </CardDescription>
        </CardHeader>
        <p className="text-gray-300 text-xs text-right">Posted {postedDate} days ago</p>
        <div className="py-3 px-3">
          <p className="text-black text-sm font-semibold">0%</p>
          <Slider className="" defaultValue={[33]} max={100} step={1} />
        </div>

        <div className="flex gap-5 justify-between items-center">
          <div className="">
            <p className="text-xs text-gray-300 font-medium">Our Goal</p>
            <p className="text-sm font-semibold text-black">{goal}</p>
          </div>
          <div className="">
            <p className="text-xs text-gray-300 font-medium">Raised</p>
            <p className="text-sm font-semibold text-black">{raised}</p>
          </div>
          <div className="">
            <p className="text-xs text-gray-300 font-medium">To Go</p>
            <p className="text-sm font-semibold text-black">{toGo}</p>
          </div>
        </div>
      </Card>
      {/* {!showForm && !isSubmitted && (
      <Button className="bg-[#FFDA44] m-8 text-black font-bold hover:bg-[#fae595] px-20 py-5"  onClick={handleDonateNow}>
          Donate Now
        </Button>)} */}

      {/* <Button className="bg-[#FFDA44] m-8 text-black font-bold hover:bg-[#fae595] px-20 py-5" onClick={openModal}>
        Donate Now
      </Button> */}

      {/* <Modal isOpen={isModalOpen} onClose={closeModal} title="Payment Page">
        <div>
         
          <PaymentPage />
        </div>
      </Modal> */}

      {showForm && (
        // Show the donation form when "Donate Now" is clicked
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 " >
            <FormField
              name="amount"
              control={form.control}
              render={({ field }) => (
                <FormItem>
                  {/* <FormLabel className="font-semibold">Donation Amount (£)</FormLabel> */}
                  <FormControl >
                    {/* <input
                type="number"
                step="0.01"
                placeholder="Enter a donation amount (£)"
                {...field} // This binds the input to the form field
              /> */}
                    <Input className="w-full sm:w-[450px] p-2" type="number" step="0.01" min="0" placeholder="Enter a donation amount (£)" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* <Link href="/payment"> */}
            <Button type="submit" className="bg-[#FFDA44]  m-8  text-black font-bold hover:bg-[#fae595] px-20 py-5 w-full ml-0 sm:ml-mx-auto" >
              Donate
            </Button>
            {/* </Link> */}
          </form>
        </Form>)}



      <div className="mt-8">
        {/* <h3 className="text-lg font-semibold">Transaction successful!</h3> */}
        {!showForm && (
          <div className="flex justify-center items-center space-x-4 my-8">
            {!hasDonated ?
              (<Button className="bg-[#FFDA44] m-8 text-black font-bold hover:bg-[#fae595] px-20 py-5 sm:ml-mx-auto " onClick={handleDonateNow}>
                Donate Now
              </Button>
              ) : (<>
                <Button
                  className="border border-[#FFDA44] bg-[none] m-8 text-black font-bold hover:bg-[#fae595] px-20 py-5 mr-1"

                  onClick={handleDonateAgain}
                >
                  Donate Again
                </Button>


                <Link
                  href={`/donations/${cid}`}
                  // className="ml-1 text-blue-500"
                  // className="ml-1 text-300"
                  className="text-500 flex items-center"
                  title='My Donations'
                >
                  <ReceiptPoundSterling size={35} fill="#FFDA44" />
                </Link>
              </>

              )}
          </div>
        )}
        

        <div className="mt-6">
      {/* Display total donation amount and number of donations */}
      <p className="text-gray-600 mb-4">
        £{totalDonationAmount.toFixed(2)} from {totalDonations} donations
      </p>

      {/* Display list of donations */}
      <ul className="list-none">
        {donations.map((donation, index) => (
          <li key={index} className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center mb-3 p-2 border border-gray-200 rounded-lg">
            {/* Username and Avatar */}
            <div className="flex items-center">
              <img
                src={donation.Profile_Picture || `/path-to-avatar/default.jpg`} // Fallback to default avatar if null
                alt={donation.Username}
                className="w-8 h-8 rounded-full mr-4"
              />
              <span className="font-semibold text-lg sm:text-base">
                {donation.Username}
              </span>
            </div>

            {/* Donation Amount */}
            <div className="flex justify-between sm:justify-start items-center text-gray-700 sm:text-left ml-2">
              <span className="font-bold text-base mr-2"> Donated £{donation.amount}</span>
            </div>

            {/* Time */}
            <div className="text-sm text-gray-500 text-right ">
              {/* {new Date(donation.transaction_time).toLocaleString()} */}
              { <DateTimeComponent timestamp={donation.transaction_time} />}
            </div>
          </li>
        ))}
      </ul>
    </div>









      </div>




{/* <PaymentPage/> */}

      {/* <Link href="/payment">
        <Button className="bg-[#FFDA44] m-8 text-black font-bold hover:bg-[#fae595] px-20 py-5">
          Donate Now
        </Button>
      </Link> */}


    </div>
  );
};

export default DonateNowSingle;

