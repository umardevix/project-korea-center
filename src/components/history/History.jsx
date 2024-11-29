import React, { useEffect } from 'react'
import styles from "./_history.module.scss"
import axios from 'axios'
function History() {
 async function getItem () {
  let isItemId = JSON.parse(localStorage.getItem("id"));
  try {
    const res = await axios.get(`/paymants/payments-status/${isItemId}/`)
    console.log(res)
    console.log(isItemId)
    
  } catch (error) {
    console.log(error)
  }


  }
  useEffect(()=>{
    getItem()
  },[])
  return (
    <div>
        history
      
    </div>
  )
}

export default History
