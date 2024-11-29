import React, { useEffect } from 'react'
import styles from "./_history.module.scss"
import axios from 'axios'
function History() {
 async function getItem () {
  let isItemId = JSON.parse(localStorage.getItem("id"));
  let isItemOrder_id = JSON.parse(localStorage.getItem("order_id"));
  try {
    const res = await axios.get(`/paymants/payments-status/${isItemId}/`)
    console.log(res)
    console.log(isItemId)
    console.log(isItemOrder_id)
    
  } catch (error) {
    console.log(error)
  }


  }
  useEffect(()=>{
    getItem()
  },[])
  return (
    <div className={styles.history_container}>
    <div className={styles.history_blocks}>
    <div className={styles.history_block}>
      <div className={styles.history_numbers}>
        <img src="/public/assets/svg/number.svg" alt="" />

      </div>
      <div className={styles.history_date}>
        <h4>Дата заказа</h4>
      </div>
      <div className={styles.history_quantity}></div>
    </div>
    </div>
    
        
      
    </div>
  )
}

export default History
