import Stripe from "stripe";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

import primadb from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";

export async function POST (req:Request){

    const body = await req.text();
    const signature = headers().get("Stripe-Signature")as string;

    let event: Stripe.Event;

    try{

        event= stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.SRIPE_WEBHOOK_SECRET;

        )
    }
    catch(error: any){

        return new NextResponse ('Webhook Error : ${error.message}', {status :400});
    }
}