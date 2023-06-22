import React from "react";

import Checkout from "./Checkout";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";

import TitleSubtitle from "../../../Shared/TitleSubtitle/TitleSubtitle";
import useCart from "../../../../hooks/useCart";

//TODO: provide publish api
const stripePromise = loadStripe(import.meta.env.VITE_Payment);
const Payment = () => {
  const [cart] = useCart();
  console.log(cart);
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  const price = parseFloat(total.toFixed(2))
  return (
    <div className="w-full">
     
     <div className="pb-8">
     <TitleSubtitle title="Payment" subtitle="100% secure payment process"/>
     </div>
      <Elements stripe={stripePromise}>
        <Checkout cart={cart} price={price} />
      </Elements>
    </div>
  );
};

export default Payment;
