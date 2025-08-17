// RazorpayButton.js
import React from "react";
import { Button } from "@/Components/ui/button";
import { AxiosInstance } from "@/lib/AxiosInstance";

const RazorpayButton = ({ amount, onSuccess }) => {
  const handlePayment = async () => {
    const { data } = await AxiosInstance.post("/Payments/createOrder", {
      amount: amount, // INR
    });

    const options = {
      key: data.key, // from Razorpay dashboard
      amount: data.order.amount,
      currency: "INR",
      name: "My Store",
      description: "Test Transaction",
      order_id: data.order.id,
      handler: async function (response) {
        const verification = await AxiosInstance.post("/Payments/verifyOrder", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
        });

        if (verification.data.success) {
          onSuccess({
            orderId: response.razorpay_order_id,
            paymentId: response.razorpay_payment_id,
          });
        } else {
          alert("Payment verification failed");
        }
      },
      prefill: {
        name: "Your Name",
        email: "email@example.com",
        contact: "9999999999",
      },
      theme: {
        color: "#3399cc",
      },
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return <Button onClick={handlePayment}>Pay Now</Button>;
};

export default RazorpayButton;
