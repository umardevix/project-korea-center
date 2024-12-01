import React, { useEffect, useState } from 'react'
import styles from "./_datale.module.scss"
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
function DatalePage() {
    const location = useLocation();
    const {item} = location.state
    // const [data , setData] = useState({})
    const navigate = useNavigate()
  return (
    <div >
      <div className="container">
       <div className={styles.datale_top}>
        <div onClick={()=>navigate(-1)} className={styles.datale_left}>
        ←
            <p >Назад</p>
        </div>
        <h1>Детали заказа</h1>


       </div>
       <div className={styles.datale_info}>
        <div className={styles.datale_block_left}>
  
            <div className={styles.datale_block_item}>
                <p>Дата заказа:</p>
                <p>{item.order_date&&item.order_date.slice(0,10)}</p>
            </div>
            <div className={styles.datale_block_item}>
                <p>Статус заказа:</p>
                <p>{item.status&&item.status}</p>
            </div>
            <div className={styles.datale_block_item}>
                <p>Номер заказа:</p>
                <p>{item.order_id&&item.order_id}</p>
            </div>
         
        </div>
        <div className={styles.datale_block_right}>
            <h5>Товар</h5>
            <ul >
                {
                    item.items&&item.items.map((el)=>(
                        <>
                         <li><span>{el.product_name} ({el.quantity}шт) 
                         ...............................................................
                    {el.price} сом</span>
                </li>
                        </>
                    ))
                }
               
             
                
            </ul>
            <div className={styles.datale_total}>Общая стоимость 
            ...............................................................
                    {item.total_amount&&item.total_amount} сом</div>

        </div>
       </div>

      </div>
      
    </div>
  )
}

export default DatalePage
