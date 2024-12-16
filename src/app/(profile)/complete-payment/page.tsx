"use client"

import CompletePage from '../../../components/Payment/CompletePage'
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

const stripePromise = loadStripe("pk_test_51PajouCLGd2J5MjD94qNoTCcmrDGFhYfVcskH0HRtQpKZ3bUwaNofs2jKcKLx2Bd05NZPMH7cyNYxRMS1Kh2xCrF00P4i8r2Ub");

export default function CompletePayment() {

  return (
    <div>
         <Elements stripe={stripePromise}> 
      <CompletePage />
      </Elements> 
    </div>
  );
}



