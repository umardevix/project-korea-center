import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

function Cart() {
  const [items, setItems] = useState([]);
  const [total, setTotal] = useState(0);
  console.log(items)
  const location = useLocation();
  async function getBasket () {
    const accessTocen = localStorage.getItem("accessToken");
  
    try {
      const res = await axios.get("https://koreacenter.kg/api/basket/",{
        headers:{
          Authorization:`Bearer ${accessTocen}`
        }
      })
      // console.log(res)
      const formattedItems = res.data.items.map((item) => ({
        product: item.product?.id || item.product.id, // Используем ID товара
        price: parseFloat(item.product.price), // Приводим цену к числу
        quantity: item.quantity || 1, // Устанавливаем количество (по умолчанию 1)
      }));
      console.log(formattedItems)
      setItems(res.data.items)
      setTotal(res.data.total_price);
      
    } catch (error) {
      console.log(error)
      
    }

  }
  useEffect(()=>{
    getBasket()
  },[])
  async function postSerivce () {
    
    const accessToken = localStorage.getItem("accessToken"); // Получение токена

    if (!accessToken) {
      console.error("Токен авторизации не найден");
      // setStatusMessage("Ошибка: токен авторизации не найден");
      return;
    }

    // Преобразуем items для корректной структуры
    
    let isItemOrder_id = JSON.parse(localStorage.getItem("order_id"));
    console.log(isItemOrder_id)

  // if(isItemOrder_id){
    // const formattedItems = items.map((item) => {
    //   // Проверяем наличие свойства product
    //   if (!item.product || !item.product.id) {
    //     console.error("Ошибка: отсутствует ID товара в item:", item);
    //     return null;
    //   }
      
    //   // Возвращаем объект в нужной структуре
    //   return {
    //     product: item.product.id, // Используем ID товара
    //     price: parseFloat(item.product.price) || 0, // Преобразуем цену в число (по умолчанию 0)
    //     quantity: item.quantity || 1, // Устанавливаем количество (по умолчанию 1)
    //   };
    // }).filter(Boolean); // Удаляем null-значения
    const formattedItems = items.map((item) => ({
      product: item.product?.id || item.product.id, // Используем ID товара
      price: parseFloat(item.product.price), // Приводим цену к числу
      quantity: item.quantity || 1, // Устанавливаем количество (по умолчанию 1)
    }));
    // console.log(formattedItems)
    
    // console.log("Отправляемые данные для items:", formattedItems,items);
    
    // console.log(formattedItems);
    try {
      const response = await axios.post(
        "/payments/orders/create/",
        {
          order_id: isItemOrder_id, // Убедитесь, что пеедается корректный ID заказа
          total_amount: total, // Общая сумма заказа
          items: formattedItems, // Сформированный массив items
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      
      console.log("Успешный ответ сервера:", response.data);
      
      if (response.status === 201) {
        let islocalId = JSON.parse(localStorage.getItem("id"));
        let islocalOrder_id = JSON.parse(localStorage.getItem("order_id"));
        if(islocalOrder_id && islocalId){
          
              window.location.href = `${response.data.pay_url}${response.data.payment_session}`;
        }
        // Успешно создан заказ, удаляем корзину
        // deleteServer();
      }
    } catch (error) {
      console.error(
        "Ошибка при создании заказа:",
        error.response?.data || error.message
      );
    }
    
  // }
  // else{
  //   alert("error order id")
  // }
  }

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
              // window.location.href = `${response.data.pay_url}${response.data.payment_session}`;
              postSerivce()
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

