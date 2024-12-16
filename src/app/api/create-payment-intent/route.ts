// app/api/create-payment-intent/route.ts

import Campaigns from "@/app/(menu)/campaigns/page";
import { NextResponse } from "next/server";
import Stripe from "stripe";

// const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
const stripe = new Stripe("sk_test_51PajouCLGd2J5MjDfzCQlawcmOlLrFllsVFZs7cQztajPF5a3IbztbhmBXQN7uvI5zrzuDyoV520XT3BatxBnReN00fhlhtKxp");


export async function POST(request: Request) {
  const { items,uid,cid } = await request.json();
  console.log("payment Intent",items,uid,cid)

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: items[0].amount, 
      currency: "GBP",
      receipt_email: "msb@gmail.com", 
     description:cid,
    });

   

    return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    // return NextResponse.json({ clientSecret: "pi_3QFDppP1Gt4oXRVi0AdvKIMp_secret_ZeYdH1M0MbiBsmbLYblDVb7Vr" });
  } catch (error) {
    return NextResponse.json({ error: "Failed to create payment intent" }, { status: 500 });
  }
}





