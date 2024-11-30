import React, { useEffect, useState } from 'react'
import styles from "./_datale.module.scss"
import { useDispatch } from 'react-redux'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function DatalePage() {

    const [data , setData] = useState({})
    const navigate = useNavigate()
    const {id} = useParams()
   async function getSerive() {
    try {
        const res = await axios.get("/payments/payments-history/", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        const isData = res.data.filter((x)=>x.id==id);
        console.log(isData)
        setData(isData[0]);
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
        getSerive()
    },[id])
  return (
    <div >
      <div className="container">
       <div className={styles.datale_top}>
        <div onClick={()=>navigate(-1)} className={styles.datale_left}>
            <img src="/public/assets/svg/arrowleft.svg" alt="" />
            <p >Назад</p>
        </div>
        <h1>Детали заказа</h1>


       </div>
       <div className={styles.datale_info}>
        <div className={styles.datale_block_left}>
  
            <div className={styles.datale_block_item}>
                <p>Дата заказа:</p>
                <p>{data.order_date&&data.order_date.slice(0,10)}</p>
            </div>
            <div className={styles.datale_block_item}>
                <p>Статус заказа:</p>
                <p>{data.status&&data.status}</p>
            </div>
         
        </div>
        <div className={styles.datale_block_right}>
            <h5>Товар</h5>
            <ul >
                {
                    data.items&&data.items.map((el)=>(
                        <>
                         <li><span>{el.product_name} ({el.quantity}шт) 
                    <img src="/public/assets/svg/image001.svg" alt="" />
                    {el.price} сом</span>
                </li>
                        </>
                    ))
                }
               
             
                
            </ul>
            <div className={styles.datale_total}>Общая стоимость 
                    <img src="/public/assets/svg/image001.svg" alt="" />
                    {data.total_amount&&data.total_amount} сом</div>

        </div>
       </div>

      </div>
      
    </div>
  )
}

export default DatalePage
