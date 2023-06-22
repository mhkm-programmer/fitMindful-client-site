import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useState, useEffect } from "react";
import useAuth from "../../../../hooks/useAuth";
import useAxiosSecure from "../../../../hooks/useAxiosSecure";

const Checkout = ({ cart, price }) => {
  console.log(cart);
  const { user } = useAuth();
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const [processing, setProcessing] = useState(false);
  const [transactionId, setTransactionId] = useState("");

  useEffect(() => {
    if (price > 0) {
      axiosSecure.post("/create-payment-intent", { price }).then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
    }
  }, [price, axiosSecure]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      setCardError(error.message);
    } else {
      setCardError("");
      //   console.log("[PaymentMethod]", paymentMethod);
    }

    setProcessing(true);
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "unknown",
            name: user?.displayName || "unknown",
          },
        },
      });

    if (confirmError) {
      console.log(confirmError);
    }
    console.log("Payment Intent", paymentIntent);

    setProcessing(false);

    if (paymentIntent.status === "succeeded") {
      setTransactionId(paymentIntent.id);
      //save payment info to the server
      const payment = {
        email: user?.email,
        transactionId: paymentIntent.id,
        price: price,
        date: new Date(),
        quantity: cart.length,
        cartItems: cart.map((item) => item._id),
        classImage: cart.map((item) => item.image),
        itemsName: cart.map((item) => item.name),
        seats: cart.map((item) => item.seats),
        status: "service pending",
      };
      axiosSecure.post("/payment", payment).then((res) => {
        console.log(res.data);
        if (res.data.insertResult.insertedId) {
        }
      });
    }
  };

  return (
    <div>
      <form className="w-1/2 mx-auto" onSubmit={handleSubmit}>
        {/* <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          className="p-3 border border-gray-300 rounded"
        /> */}
        <CardElement
          options={{
            style: {
              base: {
                fontSize: "16px",
                color: "#424770",
                "::placeholder": {
                  color: "#aab7c4",
                },
              },
              invalid: {
                color: "#9e2146",
              },
            },
          }}
          onChange={() => {
            setCardError("");
          }}
          className="p-3  border border-gray-300 rounded"
        />
        <button
          className="btn btn-gradiant mt-4"
          type="submit"
          disabled={!stripe || !clientSecret || processing}
        >
          Pay with Stripe
        </button>
        {cardError && (
          <p className="container mx-auto text-red-500">{cardError}</p>
        )}
        {transactionId && (
          <p className="container mx-auto text-green-500">
            Your Transaction ID: {transactionId}
          </p>
        )}
      </form>
    </div>
  );
};

export default Checkout;
