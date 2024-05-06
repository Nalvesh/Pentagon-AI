import Stripe from "stripe";
export const stripe = new  Stripe('sk_test_51P1EpVSIt9d7SfSm2moldaihXYCnpV51ooxtjfyP4SRCOaCaR5milsHf3BIdCJWZv23SLFTNYRgWs3yOPQv5Xvku00hkeQLG8T', {

  typescript:true,
});
// import Stripe from "stripe";

// export const stripe = new Stripe(process.env.STRIPE_API_SECRET_KEY!, {
//   apiVersion: "2023-10-16",
//   typescript: true,
// });
