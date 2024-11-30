import React, { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./_m_b_popup.module.scss";
import { setPopupSlice } from "../../redux/popupSlice/popupSlice";
import { useNavigate } from "react-router-dom";

// Генерация случайного 6-значного числа
function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

function MBankPopup({ setPopup, name, phone_number }) {
  const { items } = useSelector((state) => state.basket);
  const { total } = useSelector((state) => state.total);
  const [quid, setQuid] = useState(`CBK${generateRandomNumber()}`);
  const [isorder_id,setIsOrderId] = useState(`MBK${generateRandomNumber()}`);
  const [otp, setOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [popupop, setPopupOp] = useState(false);
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const authenticateHeader =
    "bcec992fec1e20efcc7458839dafca53b5cb855b288562233b7ad1c7bb62b835";

  const handleClose = () => setPopup(false);

  const createPayment = async () => {
    try {
      const response = await axios.get("/payment/otp/create", {
        params: {
          phone: phone_number,
          amount: total * 100,
          quid,
          comment: "Пополнение баланса",
        },
        headers: {
          authenticate: authenticateHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.code === 110) {
        setStatusMessage("Транзакция успешно создана");
        setPopupOp(true);
        console.log(response.data);
      } else {
        setStatusMessage(response.data.comment || "Ошибка создания платежа");
        setPopupOp(false);
      }
    } catch (error) {
      setStatusMessage("Ошибка создания платежа");
      console.error("Ошибка создания платежа:", error);
    }
  };

  const handleConfirm = async () => {
    try {
      const response = await axios.get("/payment/otp/confirm", {
        params: { quid, otp },
        headers: {
          authenticate: authenticateHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.code === 220) {
        setStatusMessage("Транзакция успешно подтверждена");
        console.log(response.data);
      } else {
        setStatusMessage(response.data.comment || "Ошибка подтверждения");
        console.log(response.data);

        if (response.data.code === 228) {
          await handleGet();
        }
      }
    } catch (error) {
      setStatusMessage("Ошибка подтверждения платежа");
      console.error("Ошибка подтверждения платежа:", error);
    }
  };
async function deleteServer() {
  
  const accessToken = localStorage.getItem("accessToken"); // Получение токена
try {
  const res = await axios.delete("https://koreacenter.kg/api/basket/delete/",{
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    
  })
    if(res.status===204){
 dispatch(setPopupSlice(true))
    navigate("/profile") // dispatch(setPopupSlice(true))
    navigate("/profile")
  }
} catch (error) {
  console.log(error)
  
}


}
  const handleGet = async () => {
    const accessToken = localStorage.getItem("accessToken"); // Получение токена

    if (!accessToken) {
      console.error("Токен авторизации не найден");
      setStatusMessage("Ошибка: токен авторизации не найден");
      return;
    }

    // Преобразуем items для корректной структуры
    const formattedItems = items.map((item) => ({
      product: item.product?.id || item.product.id, // Используем ID товара
      price: parseFloat(item.product.price), // Приводим цену к числу
      quantity: item.quantity || 1, // Устанавливаем количество (по умолчанию 1)
    }));
    console.log(items);

    console.log("Отправляемые данные для items:", formattedItems);

    try {
        const response = await axios.post(
            "/payments/orders/create/",
            {
              order_id: isorder_id, // Убедитkjkjaесь, что это число (ID клиента)
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
      console.log(response.data);
      console.log(response);
      if(response.status===201){
       await deleteServer()
        
   
      }
    } catch (error) {
      console.error(
        "Ошибка при создании заказа:",
        error.response?.data || error
      );
    }
  };

  const handleChange = (e) => {
    const value = e.target.value;
    setOtp(value);

    if (value === "1234") {
      handleConfirm();
    }
  };

  return (
    <div className={styles.mb_popup}>
      <div className="container">
        <div className={styles.mb_popup_info}>
          <div className={styles.mb_logo}>
            <img src="/assets/images/mblogo.png" alt="M-Bank Logo" />
            <p>
              Укажите номер телефона (на него придет СМС), к которому привязан
              MBANK для пополнения своего баланса:
            </p>
          </div>
          <div className={styles.mb_phone_number}>
            <p>{phone_number}</p>
          </div>
          <div className={styles.mb_content}>
            <h1>Статус: ожидание подтверждения</h1>
            <div className={styles.mb_blocks}>
              <div className={styles.mb_block}>
                <p>Плательщик</p>
                <span>{name}</span>
              </div>
              <div className={styles.mb_block}>
                <p>Сумма к оплате</p>
                <span>{total} сом</span>
              </div>
            </div>
            <div className={styles.mb_button}>
              {popupop && (
                <input
                  type="number"
                  placeholder="Введите OTP"
                  value={otp}
                  onChange={handleChange}
                />
              )}
              <button disabled={popupop} onClick={createPayment}>
                Создать транзакцию
              </button>
            </div>
            <div className={styles.mb_close}>
              <span onClick={handleClose}>Закрыть</span>
            </div>
            {statusMessage && <p>{statusMessage}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MBankPopup;
// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyOTc1OTA0LCJpYXQiOjE3MzI4ODc5NzcsImp0aSI6ImM5Zjk1N2YyNDIxYzQ4NDZiOWExOThlY2ExYTZmNDc3IiwidXNlcl9pZCI6MjcsInJvbGUiOm51bGx9.7nl0pboIlBnO-Rha1RxbmvdoQezFrCUweuHqSUU71x0
//eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzMyOTc1OTA0LCJpYXQiOjE3MzI4ODc5NzcsImp0aSI6ImM5Zjk1N2YyNDIxYzQ4NDZiOWExOThlY2ExYTZmNDc3IiwidXNlcl9pZCI6MjcsInJvbGUiOm51bGx9.7nl0pboIlBnO-Rha1RxbmvdoQezFrCUweuHqSUU71x0
// {"first_name":"doolotkeldi","last_name":"alanov","phone_number":"+996501246086","date_joined":"2024-11-28T06:27:07.244865Z","is_active":true,"role":null,"country":null,"id":27}