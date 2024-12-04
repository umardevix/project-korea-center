import React, { useEffect, useState } from 'react'
import styles from "./_history.module.scss"
import axios from 'axios'
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { setPopupSlice } from '../../redux/popupSlice/popupSlice';
import { toast } from 'react-toastify';

function History() {
  const dispatch = useDispatch();
  
  
  const [data , setData] = useState([])
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

  useEffect(()=>{
    getItem()
    handleGet()
  },[])

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
  const handleDelete = async (id) => {
    try {
        const res = await axios.delete(`/payments/orders/${id}/delete/`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                "Content-Type": "application/json",
            },
        });
        if (res.status === 204) {
          localStorage.removeItem("id");
        localStorage.removeItem("order_id");
        localStorage.removeItem("pay_url");
        handleGet()
            // setData(data.filter(order => order.id !== id));
        }
    } catch (error) {
        console.error('Error deleting order:', error.message);
    }
};
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
       deleteServer()
    
      }
      else if(res.data.status==="failed"){
        toast.error('у не достоточно средств ');
      }
      else{
        const isData = data.filter((x)=>x.order_id==isItemOrder_id)
        handleDelete(isData[0].id)

        

      }
      console.log(isItemId)
      console.log(isItemOrder_id)
      
    } catch (error) {
      console.log(error,"is get item")
      localStorage.removeItem("id");
      localStorage.removeItem("order_id");
      localStorage.removeItem("pay_url");
    

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
