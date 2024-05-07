import { loadStripe } from '@stripe/stripe-js';

export const checkout = async ({ lineItems, res }) => {
  let stripePromise: any = null;

  // Load Stripe
  const getStripe = () => {
    if (!stripePromise) {
      stripePromise = loadStripe(process.env.REACT_APP_STRIPE_KEY as string);
    }
    return stripePromise;
  };

  const stripe = await getStripe();

  // Redirect to Stripe checkout page
  await stripe.redirectToCheckout({
    mode: 'payment',
    lineItems: lineItems,
    successUrl: `http://localhost:3000/reservations/${res.data._id}`,
    cancelUrl: 'http://localhost:3000',
  });
};
