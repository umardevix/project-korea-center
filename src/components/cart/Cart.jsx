import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Cart() {
  const items = useSelector((state) => state.basket.items) || [];
  const [success_id, setSuccessid] = useState(null)
  const location = useLocation()

  const handlePayment = async () => {
    const accessToken = localStorage.getItem('accessToken');

    // Формируем массив только с ID продуктов
    const productIds = items.map(item => item.product.id);

    // Проверка на наличие товаров для оплаты
    if (productIds.length === 0) {
      console.error('No products selected for payment');
      return; // Если нет выбранных товаров, не отправляем запрос
    }

    try {
      const response = await axios.post('/payments/start-payments/', {
        product_ids: productIds
      }, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        }
      });

      if (response) {
        console.log(response.data.payment_session)
        // window.location.href = response.data.pay_url + response.data.payment_session



        // https://sandbox.payler.com/gapi/Pay?session_id=nvazvvmAbv6zsvDNuC1Xn7Kcbyq7ptzKlP4u,
        // https://sandbox.payler.com/gapi/Pay?session_id=lnxLKA4wqMwLz2Htxv18raMpMKevSc8aEi3I
      }

    } catch (error) {
      console.error('Request failed:', error);

      if (error.response) {
        // Логируем подробности ошибки от сервера
        console.error('Response error details:', error.response.data);
      } else {
        console.error('Error details:', error.message);
      }
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