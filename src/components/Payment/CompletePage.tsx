
import React, { useEffect, useState } from "react";
import { useStripe } from "@stripe/react-stripe-js";
import { useRouter } from "next/navigation";
import supabase from "@/lib/supabaseClient";
import "./Payment.css"; 




const SuccessIcon = (
  <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M15.4695 0.232963C15.8241 0.561287 15.8454 1.1149 15.5171 1.46949L6.14206 11.5945C5.97228 11.7778 5.73221 11.8799 5.48237 11.8748C5.23253 11.8698 4.99677 11.7582 4.83452 11.5681L0.459523 6.44311C0.145767 6.07557 0.18937 5.52327 0.556912 5.20951C0.924454 4.89575 1.47676 4.93936 1.79051 5.3069L5.52658 9.68343L14.233 0.280522C14.5613 -0.0740672 15.1149 -0.0953599 15.4695 0.232963Z" fill="white" />
  </svg>
);

const ErrorIcon = (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M1.25628 1.25628C1.59799 0.914573 2.15201 0.914573 2.49372 1.25628L8 6.76256L13.5063 1.25628C13.848 0.914573 14.402 0.914573 14.7437 1.25628C15.0854 1.59799 15.0854 2.15201 14.7437 2.49372L9.23744 8L14.7437 13.5063C15.0854 13.848 15.0854 14.402 14.7437 14.7437C14.402 15.0854 13.848 15.0854 13.5063 14.7437L8 9.23744L2.49372 14.7437C2.15201 15.0854 1.59799 15.0854 1.25628 14.7437C0.914573 14.402 0.914573 13.848 1.25628 13.5063L6.76256 8L1.25628 2.49372C0.914573 2.15201 0.914573 1.59799 1.25628 1.25628Z" fill="white" />
  </svg>
);

const InfoIcon = (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M10 1.5H4C2.61929 1.5 1.5 2.61929 1.5 4V10C1.5 11.3807 2.61929 12.5 4 12.5H10C11.3807 12.5 12.5 11.3807 12.5 10V4C12.5 2.61929 11.3807 1.5 10 1.5ZM4 0C1.79086 0 0 1.79086 0 4V10C0 12.2091 1.79086 14 4 14H10C12.2091 14 14 12.2091 14 10V4C14 1.79086 12.2091 0 10 0H4Z" fill="white" />
    <path fillRule="evenodd" clipRule="evenodd" d="M5.25 7C5.25 6.58579 5.58579 6.25 6 6.25H7.25C7.66421 6.25 8 6.58579 8 7V10.5C8 10.9142 7.66421 11.25 7.25 11.25C6.83579 11.25 6.5 10.9142 6.5 10.5V7.75H6C5.58579 7.75 5.25 7.41421 5.25 7Z" fill="white" />
    <path d="M5.75 4C5.75 3.31075 6.31075 2.75 7 2.75C7.68925 2.75 8.25 3.31075 8.25 4C8.25 4.68925 7.68925 5.25 7 5.25C6.31075 5.25 5.75 4.68925 5.75 4Z" fill="white" />
  </svg>
);

const STATUS_CONTENT_MAP: Record<string, { text: string; iconColor: string; icon: JSX.Element }> = {
  succeeded: {
    text: "Payment succeeded",
    iconColor: "#30B130",
    icon: SuccessIcon,
  },
  processing: {
    text: "Your payment is processing.",
    iconColor: "#6D6E78",
    icon: InfoIcon,
  },
  requires_payment_method: {
    text: "Your payment was not successful, please try again.",
    iconColor: "#DF1B41",
    icon: ErrorIcon,
  },
  default: {
    text: "Something went wrong, please try again.",
    iconColor: "#DF1B41",
    icon: ErrorIcon,
  }
};

const CompletePage: React.FC = () => {
  const stripe = useStripe();
  const router = useRouter(); 
  const [status, setStatus] = useState<string>("default");
  const [intentId, setIntentId] = useState<string | null>(null); 
  const [campaignId, setCampaignId] = useState<string | null>(null); 
  const [userId, setUserId] = useState('');

  

  useEffect(() => {
    const fetchUserData = async () => {

      const { data: { user } } = await supabase.auth.getUser()
  
      if (user) {
        console.log("User Found from Favourite Content", user.id);
        setUserId(user.id)
      }
    };

    fetchUserData();
   
  }, []);


const insertPaymentDetails= async (payload:any) => {

  try {
   
   
console.log("payload",payload)


    // Insert into the transactions table
    const {data:transactionData, error } = await supabase
      .from('transactions')
      .insert([payload]);

    if (error) {
      console.error("Error inserting donation data:", error.message);
    } else {
      console.log("Donation submitted:", transactionData);
      router.push(`/donate-now?cid=${payload.cid}`);
    }
  } catch (error) {
    console.error("An unexpected error occurred:", error);
  }
}





  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get("payment_intent_client_secret");

    if (!clientSecret) {
      return;
    }

    stripe.retrievePaymentIntent(clientSecret).then(({ paymentIntent }) => {
      if (!paymentIntent) {
        return;
      }

     
console.log("paymentIntent",paymentIntent.status)
      setStatus(paymentIntent.status);
      setIntentId(paymentIntent.id);
      setCampaignId(paymentIntent.description);

      const payload = {
        amount: paymentIntent.amount, 
        cid: paymentIntent.description,  //campaign content id  
        donor_id: userId, 
        payment_id:paymentIntent.id,
      };
     if (paymentIntent.status === "succeeded") {
      insertPaymentDetails(payload)}
    



    });
  }, [stripe,userId]);

  return (
    <div id="payment-status">
      <div id="status-icon" style={{ backgroundColor: STATUS_CONTENT_MAP[status].iconColor }}>
        {STATUS_CONTENT_MAP[status].icon}
      </div>
      <h2 id="status-text">{STATUS_CONTENT_MAP[status].text}</h2>
      {intentId && (
        <div id="details-table">
          <table>
            <tbody>
              <tr>
                <td className="TableLabel">id</td>
                <td id="intent-id" className="TableContent">{intentId}</td>
              </tr>
              <tr>
                <td className="TableLabel">status</td>
                <td id="intent-status" className="TableContent">{status}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
      {/* {intentId && (
        <a href={`https://dashboard.stripe.com/payments/${intentId}`} id="view-details" rel="noopener noreferrer" target="_blank">
          View details
          <svg width="15" height="14" viewBox="0 0 15 14" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ paddingLeft: '5px' }}>
            <path fillRule="evenodd" clipRule="evenodd" d="M3.125 3.49998C2.64175 3.49998 2.25 3.89173 2.25 4.37498V11.375C2.25 11.8582 2.64175 12.25 3.125 12.25H10.125C10.6082 12.25 11 11.8582 11 11.375V10.25H8.875C8.61337 10.25 8.375 10.4874 8.375 10.75C8.375 11.0126 8.61337 11.25 8.875 11.25H11.125C11.1923 11.25 11.25 11.3077 11.25 11.375C11.25 11.4423 11.1923 11.5 11.125 11.5H3.125C3.0577 11.5 3 11.4423 3 11.375C3 11.3077 3.0577 11.25 3.125 11.25H4.375C4.61263 11.25 4.875 10.9874 4.875 10.75C4.875 10.5126 4.61263 10.25 4.375 10.25H3.125C2.64175 10.25 2.25 10.6418 2.25 11.125V11.375C2.25 11.6587 2.38675 11.875 2.59375 12.0355L2.55825 12H10.125C10.4082 12 10.5 11.8918 10.5 11.625V4.37498C10.5 4.10816 10.4082 3.99998 10.125 3.99998H5.875C5.49175 3.99998 5.25 4.24173 5.25 4.62498C5.25 5.00823 5.49175 5.24998 5.875 5.24998H10.125C10.4082 5.24998 10.5 5.14173 10.5 4.87498V3.49998H3.125Z" fill="#0066FF" />
          </svg>
        </a>
      )} */}
      {campaignId &&  <button className="button" onClick={() => router.push(`/donate-now?cid=${campaignId}`)} type="button" id="submit">
        Back to the Campaign Page
      </button> }
     
    </div>
  );
};

export default CompletePage;
