import { auth, currentUser } from "@clerk/nextjs";
import { NextResponse } from "next/server";

import { prismadb } from "@/lib/prismadb";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

const settingsUrl = absoluteUrl("/settings");

export async function GET() {
  try {
    const { userId } = auth();
    const user = await currentUser();

    if (!userId || !user)
      return new NextResponse("Unauthorized.", { status: 401 });

    const userSubscription = await prismadb.userSubscription.findUnique({
      where: {
        userId,
      },
    });

    if (userSubscription && userSubscription.stripeCustomerId) {
      const stripeSession = await stripe.billingPortal.sessions.create({
        customer: userSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      return new NextResponse(JSON.stringify({ url: stripeSession.url }), {
        status: 200,
      });
    }

    const stripeSession = await stripe.checkout.sessions.create({
      success_url: "https://pentagonai-efkgk82b5-nalveshs-projects.vercel.app/settings",
      cancel_url: "https://pentagonai-efkgk82b5-nalveshs-projects.vercel.app/settings",
      payment_method_types: ["card"],
      mode: "subscription",
      billing_address_collection: "required",
      customer_email: user.emailAddresses[0].emailAddress,
      line_items: [
        {
          price_data: {
            currency: "INR",
            product_data: {
              name: "Pentagoan pro",
              description: "Unlimited AI Generations.",
            },
            unit_amount: 2000, // $20
            recurring: {
              interval: "month",
            },
          },
          quantity: 1,
        },
      ],
      metadata: {
        userId,
      },
    });

    return new NextResponse(JSON.stringify({ url: stripeSession.url }), {
      status: 200,
    });
  } catch (error: unknown) {
    console.error("[STRIPE_ERROR]: ", error);
    return new NextResponse("Internal server error.", { status: 500 });
  }
}
