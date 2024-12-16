"use client"

import React,{useState,useEffect} from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import supabase from "@/lib/supabaseClient";
// import { Link } from "lucide-react";
import Link from 'next/link';
import DateTimeComponent from "../DateTimeComponent";

type Props = {};

interface Donation {
  // Username: string;
  // Profile_Picture: string;
  amount: number;
  transaction_time: string;
  // cid: string;
}

const DonationsCompo = (props: Props) => {

  //Renaming Useparams
  // const params = useParams();
  // const userId = params.donation_id;
  // console.info("userId:",userId)

  const {donation_id} = useParams();

 
  const [donations, setDonations] = useState<Donation[]>([]);
  const [totalDonationAmount, setTotalDonationAmount] = useState(0);
  const [totalDonations, setTotalDonations] = useState(0);
  

  
  // const donations = [
  //   {
  //     id: 1,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 2,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 3,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 4,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 5,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 6,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 7,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 8,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 9,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  //   {
  //     id: 10,
  //     title: "Donated",
  //     money: "1000",
  //     time: "2 days ago",
  //   },
  // ];


  const fetchDonations = async () => {

    const { data: { user } } = await supabase.auth.getUser()


    try {
      // Fetch the transactions data first
      const { data: transactionsData, error } = await supabase
        .from('transactions')
        .select('amount, transaction_time')
        .eq('cid', donation_id)
        .eq('donor_id', user?.id);;

      if (error) {
        console.error('Error fetching donations:', error.message);
        return;
      }

      
        // Calculate total donation amount and count
        const totalAmount = transactionsData.reduce((acc, donation) => acc + donation.amount, 0);
        const totalDonations = transactionsData.length;

        setDonations(transactionsData); 
        setTotalDonationAmount(totalAmount);
        setTotalDonations(totalDonations);
      
    } catch (err) {
      console.error('Error fetching donations:', err);
    }
  };


  useEffect(() => {
  
//Fetching The List Of Donations
    fetchDonations();
  }, [donation_id]);










  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="w-full md:w-2/3 my-2 lg:w-2/3 xl:w-2/3">
        <h1 className="text-2xl my-3 text-center md:text-4xl lg:text-4xl xl:text-4xl font-bold ">
          My Donations
        </h1>
      </div>

      <div className="w-full md:w-2/3 lg:w-2/3 xl:w-2/3 px-4 py-8">
        {donations.map((donate,index) => (
           <Link
           href={{ pathname: '/donate-now', query: {cid:donation_id } }}
           title='Donated Post'
           key={index}
         >
          <div
            className=" px-2  hover:bg-slate-50 transition-all"
            key={index}
          >
            <div className="flex py-5 justify-between items-center gap-5  ">
              <div className="flex items-center gap-5">
                <div className="">
                  <div className="text-sm font-semibold text-black-600">
                    Donated €{donate.amount}
                  </div>
                </div>
              </div>

              <div className="text-sm text-gray-400">{ <DateTimeComponent timestamp={donate.transaction_time} />}</div>
            </div>
            <hr />
          </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default DonationsCompo;
