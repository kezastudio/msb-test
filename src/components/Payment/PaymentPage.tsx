// app/checkout/page.tsx
"use client"
import { useState, useEffect } from "react";
import { loadStripe,Appearance } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "../../components/Payment/CheckoutForm"
import { useRouter } from "next/navigation";
import "./Payment.css";

// Load Stripe outside of render to avoid recreating the Stripe object on each render.
const stripePromise = loadStripe("pk_test_51PajouCLGd2J5MjD94qNoTCcmrDGFhYfVcskH0HRtQpKZ3bUwaNofs2jKcKLx2Bd05NZPMH7cyNYxRMS1Kh2xCrF00P4i8r2Ub");

export default function CheckoutPage() {
//   const [clientSecret, setClientSecret] = useState("");
//   const [dpmCheckerLink, setDpmCheckerLink] = useState("");
const [clientSecret, setClientSecret] = useState<string | null>(null);
const [uid, setUid] = useState<string | null>(null);
const [amount, setAmount] = useState<number | null>(null);
const [cid, setCid] = useState<string | null>(null);
const router = useRouter();
 

useEffect(() => {
    // Parse query parameters from URL
    const params = new URLSearchParams(window.location.search);
    setUid(params.get("donor_id"));
    const amountParam = params.get("amount");
    setAmount(amountParam ? parseInt(amountParam, 10) : null);
    setCid(params.get("cid"));
  }, []);





//   useEffect(() => {
//     console.log("from payment intent useEffect")
//     // Fetch the payment intent when the component mounts
//     fetch("/api/create-payment-intent", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ items: [{ id: "1", amount: 1000 }] }),
//     })
//       .then((res) => res.json())
//       .then((data) => {
//         setClientSecret(data.clientSecret);
//         // setDpmCheckerLink(data.dpmCheckerLink); 
//       });
//   }, []);

useEffect(() => {
    if (amount) {
      console.log("from payment intent useEffect");

      // Fetch the payment intent when the component mounts
      fetch("/api/create-payment-intent", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: [{ id: "1", amount }],
          uid,
          cid,
        }),
      })
        .then((res) => res.json())
        .then((data: { clientSecret: string }) => {
          setClientSecret(data.clientSecret);
        });
    }
  }, [amount]);






  const appearance: Appearance = {
    theme: "stripe",
  };

  return (
    <div className="App">
      {clientSecret && (
        <Elements options={{ clientSecret, appearance, loader: "auto" }} stripe={stripePromise}>
          {/* <CheckoutForm dpmCheckerLink={dpmCheckerLink} /> */}
          <CheckoutForm  amount={`${amount}`}/>
        </Elements>
      )}
    </div>
  );
}