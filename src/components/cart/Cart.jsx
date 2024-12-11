import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";

function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);

  async function getBasket() {
    const accessToken = localStorage.getItem("accessToken");

    try {
      const res = await axios.get("https://koreacenter.kg/api/basket/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

     

      setItems(res.data.items);
      setTotal(res.data.total_price);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    getBasket();
  }, []);

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

      if (response.data && response.data.payment_session && response.data.pay_url && response.data.order_id) {
        localStorage.setItem("id", JSON.stringify(response.data.payment_session));
        localStorage.setItem("order_id", JSON.stringify(response.data.order_id));
        localStorage.setItem("pay_url", JSON.stringify(response.data.pay_url));

        let islocalId = JSON.parse(localStorage.getItem("id"));
        let islocalOrder_id = JSON.parse(localStorage.getItem("order_id"));
        let pay_url = JSON.parse(localStorage.getItem("pay_url"));

        if (islocalId === response.data.payment_session && islocalOrder_id === response.data.order_id && pay_url === response.data.pay_url) {
          window.location.href = `${response.data.pay_url}${response.data.payment_session}`;
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
