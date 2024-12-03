import React, { useEffect, useState } from 'react'
import styles from "./_history.module.scss"
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPopupSlice } from '../../redux/popupSlice/popupSlice';
function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}
function History() {
  const [items, setItems] = useState([]);
  console.log(items)
  console.log(items)
  const dispatch = useDispatch();
  const [statusMessage,setStatusMessage] = useState("")
  const [isorder_id,setIsOrderId] = useState(`MBK${generateRandomNumber()}`);
  
  const { total } = useSelector((state) => state.total);
  
  const [data , setData] = useState([])
  console.log(data)
  async function handleGet() {
    try {
      const res = await axios.get("/payments/payments-history/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(res.data);
      console.log("getHistory",res)
    } catch (error) {
      if (error.response) {
        console.error("Ошибка ответа сервера:", error.response.data);
      } else if (error.request) {
        console.error("Запрос не был выполнен:", error.request);
      } else {
        console.error("Ошибка:", error.message);
      }
    }
  }
  async function getBasket () {
    const accessTocen = localStorage.getItem("accessToken");
  
    try {
      const res = await axios.get("https://koreacenter.kg/api/basket/",{
        headers:{
          Authorization:`Bearer ${accessTocen}`
        }
      })
      // console.log(res)
      setItems(res.data.items)
      
    } catch (error) {
      console.log(error)
      
    }

  }
  useEffect(()=>{
    getBasket()
    getItem()
    handleGet()
  },[])
  async function postSerivce () {
    
    const accessToken = localStorage.getItem("accessToken"); // Получение токена

    if (!accessToken) {
      console.error("Токен авторизации не найден");
      setStatusMessage("Ошибка: токен авторизации не найден");
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
    console.log(formattedItems)
    
    console.log("Отправляемые данные для items:", formattedItems,items);
    
    console.log(formattedItems);
    try {
      const response = await axios.post(
        "/payments/orders/create/",
        {
          order_id: isItemOrder_id, // Убедитесь, что передается корректный ID заказа
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
        // Успешно создан заказ, удаляем корзину
        deleteServer();
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
  async function deleteServer() {
  
    const accessToken = localStorage.getItem("accessToken"); // Получение токена
  try {
    const res = await axios.delete("https://koreacenter.kg/api/basket/delete/",{
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      
    })
    console.log("delete",res)
      if(res.status===204){
        dispatch(setPopupSlice(true))
        
        localStorage.removeItem("id");
        localStorage.removeItem("order_id");
        handleGet()
    }
  } catch (error) {
    console.log(error)
    
  }
  
  
  }
  async function getItem () {
   let isItemId = JSON.parse(localStorage.getItem("id"));
   let isItemOrder_id = JSON.parse(localStorage.getItem("order_id"));
   if(isItemId&&isItemOrder_id){
    try {
      const res = await axios.get(`/payments/payments-status/${isItemId}/${isItemOrder_id}/`)
      console.log(res)
      if(res.data.status==="completed"){
        // alert("ваш заказ успешно куплен")
        console.log("get sussion , order_id",res)
        postSerivce()
    
      }
      console.log(isItemId)
      console.log(isItemOrder_id)
      
    } catch (error) {
      console.log(error,"is get item")
      localStorage.removeItem("id");
      localStorage.removeItem("order_id");
    

    }
   }

   

  }
 
  return (
    <div className={styles.history_container}>
    <div className={styles.history_blocks}>
    <div className={`${styles.history_block} ${styles.history_block_1}`}>
      <div className={styles.history_numbers}>
      №

      </div>
      <div className={styles.history_date}>
        <h4>Действия</h4>
      </div>
      <div className={styles.history_date}>
        <h4>Дата заказа</h4>
      </div>
      <div className={styles.history_quantity}>
        <h4>Количество </h4>
      </div>
      <div className={styles.history_quantity}>
        <h4>Статус заказа </h4>
      </div>
    </div>
    {
      data.map((item,index)=>(<>
    <div key={item.id} className={styles.history_block}>
      <div className={styles.history_numbers}>
        <p>{index+1}</p>

      </div>
      <div className={styles.history_date}>
        <Link state={{item}} to={`/datale/${item.id}`} className={styles.history_prosmotr}>Просмотр</Link>
      </div>
      <div className={styles.history_date}>
        <p>{item.order_date.slice(0,10)}</p>
      </div>
      <div className={styles.history_quantity}>
      <p>
  {item.items.length} шт
  </p>

      </div>
      <div className={styles.history_quantity}>
        <p>{item.status} </p>
      </div>
    </div>
      </>))
    }
    </div>
    
        
      
    </div>
  )
}

export default History
