import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Cart() {
  const items = useSelector((state) => state.basket.items) || [];
  const location = useLocation();

  const handlePayment = async () => {
    const accessToken = localStorage.getItem("accessToken");
    const productIds = items.map((item) => item.product.id);

    if (productIds.length === 0) {
      console.error("No products selected for payment");
      return;
    }

    try {
      const response = await axios.post(
        "/payments/start-payments/",
        { product_ids: productIds },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data && response.data.payment_session && response.data.pay_url&&response.data.order_id) {
        try {
          const res = await axios.get(
            `/paymants/payments-status/${response.data.payment_session}/${response.data.order_id}`
          );
          if (res.status === 200) {
            localStorage.setItem("id", JSON.stringify(response.data.payment_session));
            localStorage.setItem("order_id", JSON.stringify(response.data.order_id));
            let islocalId = JSON.parse(localStorage.getItem("id"));
            let islocalOrder_id = JSON.parse(localStorage.getItem("order_id"));
            if(islocalId===response.data.payment_session&&islocalOrder_id===response.data.order_id){

              window.location.href = `${response.data.pay_url}${response.data.payment_session}`;
            }
          }
        } catch (error) {
          console.error("Payment status fetch error:", error.response?.data || error.message);
        }
      } else {
        console.error("Invalid response format:", response.data);
      }
    } catch (error) {
      console.error("Request failed:", error.response?.data || error.message);
    }
  };

  return (
    <div className="w-full">
      <button
        className="bg-regal-red w-full mt-3 py-1 rounded-md text-regal-white"
        onClick={handlePayment}
      >
        Оплатить
      </button>
    </div>
  );
}

export default Cart;

