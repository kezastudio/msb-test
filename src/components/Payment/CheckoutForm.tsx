// app/components/CheckoutForm.tsx

import React, { useState } from "react";
import {
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import "./Payment.css";

interface CheckoutFormProps {
//   dpmCheckerLink: string;
amount:string;
}

// const CheckoutForm: React.FC<CheckoutFormProps> = ({ dpmCheckerLink }) => {
    const CheckoutForm: React.FC<CheckoutFormProps> = ({amount}) => {
  const stripe = useStripe();
  const elements = useElements();

  const [message, setMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsLoading(true);

    // Determine return URL based on environment
    // const returnUrl = process.env.NEXT_PUBLIC_PAYMENT_RETURN_URL|| '';
    const returnUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/complete-payment`|| '';
    

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: returnUrl,
      },
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        setMessage(error.message || "An error occurred.");
      } else {
        setMessage("An unexpected error occurred.");
      }
    }

    setIsLoading(false);
  };

//   const paymentElementOptions = {
//     layout: "tabs",
//   };

  return (
    <>
      <form id="payment-form" onSubmit={handleSubmit}>
        {/* <PaymentElement id="payment-element" options={paymentElementOptions} /> */}
        <PaymentElement id="payment-element" />
        <button disabled={isLoading || !stripe || !elements} id="submit">
          <span id="button-text">
            {isLoading ? <div className="spinner" id="spinner"></div> : `Pay £${amount} `}
          </span>
        </button>
        {message && <div id="payment-message">{message}</div>}
      </form>
      {/* <div id="dpm-annotation">
        <p>
          Payment methods are dynamically displayed based on customer location, order amount, and currency.&nbsp;
          <a href={dpmCheckerLink} target="_blank" rel="noopener noreferrer" id="dpm-integration-checker">
            Preview payment methods by transaction
          </a>
        </p>
      </div> */}
    </>
  );
};

export default CheckoutForm;
