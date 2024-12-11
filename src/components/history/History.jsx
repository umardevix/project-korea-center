import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import styles from "./_history.module.scss";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { setPopupSlice } from "../../redux/popupSlice/popupSlice";

function History() {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);

  async function handleGet() {
    try {
      const res = await axios.get("/payments/payments-history/", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(res.data);
      console.log("getHistory", res);
    } catch (error) {
      console.error("Error fetching payment history:", error);
    }
  }
  async function getBasket()
   {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get("https://koreacenter.kg/api/basket/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      console.log(res)
      if(res.status ===200){
        handleSuccessfulPayment(res.data.items,res.data.total_price,accessToken);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getPaymentStatus();
    handleGet();
  }, []);

  async function getPaymentStatus() {
    let isItemId = JSON.parse(localStorage.getItem("id"));
    let isItemOrder_id = JSON.parse(localStorage.getItem("order_id"));
    // if () {
      try {
        const res = await axios.get(`/payments/payments-status/${isItemId}/${isItemOrder_id}/`);
console.log(res)
        if (res.data.status === "completed") {
          getBasket()
        } else if (res.data.status === "failed") {
          toast.error("Недостаточно средств");
          handleFailedPayment();
        } else {
          handleFailedPayment();
        }
      } catch (error) {
        console.log("Error fetching payment status:", error);
        handleFailedPayment();
      }
    // }
  }

  async function handleSuccessfulPayment(items,total,accessToken) {
    
    let isItemOrder_id = JSON.parse(localStorage.getItem("order_id"));
    const formattedItems = items.map((item) => ({
      product: item.product?.id || item.product.id,
      price: parseFloat(item.product.price),
      quantity: item.quantity || 1,
    }));
    console.log(formattedItems)
    console.log(isItemOrder_id,total,formattedItems)

    try {
      const res = await axios.post(
        "/payments/orders/create/",
        {
          order_id:isItemOrder_id,
          total_amount: total,
          items: formattedItems,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      console.log(res)
      if (res.status === 201) {
        await deleteServer();
      }

    } catch (error) {
      console.error("Error updating history:", error);
    }
  }
  async function deleteServer() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.delete(
        "https://koreacenter.kg/api/basket/delete/",
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );
      if (res.status === 204) {
        dispatch(setPopupSlice(true));
        handleFailedPayment()

      }
    } catch (error) {
      console.log(error);
    }
  }

  function handleFailedPayment() {
    localStorage.removeItem("id");
    localStorage.removeItem("order_id");
    localStorage.removeItem("pay_url");
    handleGet();
  }

  return (
    <div className={styles.history_container}>
      <div className={styles.history_blocks}>
        <div className={`${styles.history_block} ${styles.history_block_1}`}>
          <div className={styles.history_numbers}>№</div>
          <div className={styles.history_date}>
            <h4>Действия</h4>
          </div>
          <div className={styles.history_date}>
            <h4>Дата заказа</h4>
          </div>
          <div className={styles.history_quantity}>
            <h4>Количество</h4>
          </div>
          <div className={styles.history_quantity}>
            <h4>Статус заказа</h4>
          </div>
        </div>
        {data.map((item, index) => (
          <div key={item.id} className={styles.history_block}>
            <div className={styles.history_numbers}>
              <p>{index + 1}</p>
            </div>
            <div className={styles.history_date}>
              <Link state={{ item }} to={`/datale/${item.id}`} className={styles.history_prosmotr}>
                Просмотр
              </Link>
            </div>
            <div className={styles.history_date}>
              <p>{item.order_date.slice(0, 10)}</p>
            </div>
            <div className={styles.history_quantity}>
              <p>{item.items.length} шт</p>
            </div>
            <div className={styles.history_quantity}>
              <p>{item.status}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default History;
