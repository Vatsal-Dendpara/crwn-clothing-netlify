import { useSelector } from "react-redux";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import Button, { BUTTON_TYPES } from "../button/button.component";
import {
  FormContainer,
  PaymentButton,
  PaymentFormContainer,
} from "./payment-form.styles";
import { selectCartTotal } from "../../store/cart/cart.selector";
import { selectCurrentUser } from "../../store/user/user.selector";
import { useState } from "react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const amount = useSelector(selectCartTotal);
  const currentUser = useSelector(selectCurrentUser);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const paymentHandler = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    setIsProcessingPayment(true);

    const response = await fetch("/.netlify/functions/create-payment-intent", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ amount: amount * 100 }),
    }).then((res) => {
      return res.json();
    });

    const {
      paymentIntent: { client_secret },
    } = response;

    const paymentResult = await stripe.confirmCardPayment(client_secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: currentUser ? currentUser.displayName : "Guest",
        },
      },
    });

    setIsProcessingPayment(false);

    if (paymentResult.error) {
      console.log(paymentResult.error.message);
      alert(paymentResult.error.message);
    } else {
      if (paymentResult.paymentIntent.status === "succeeded")
        alert("Payment successfull");
    }
  };
  return (
    <PaymentFormContainer>
      <FormContainer>
        <h2>Credit Card Payment: </h2>
        <CardElement />
        <PaymentButton>
          <Button
            buttonType={BUTTON_TYPES.inverted}
            onClick={paymentHandler}
            isLoading={isProcessingPayment}
          >
            Pay Now
          </Button>
        </PaymentButton>
      </FormContainer>
    </PaymentFormContainer>
  );
};

export default PaymentForm;
