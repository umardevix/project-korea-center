import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import styles from "./_m_b_popup.module.scss";
import { setPopupSlice } from "../../redux/popupSlice/popupSlice";
import { useNavigate } from "react-router-dom";

function generateRandomNumber() {
  return Math.floor(100000 + Math.random() * 900000);
}

const authenticateHeader =
  "b9aba2e0a23cb29c94b9986e924dcaeff09e390c37fd9ecca0f92acd81ed4899226cdd7e1ecfbd5169e3f3299d0f005fb415c1fa95ed00e605a7bb9529e84c85";

function MBankPopup({ setPopup, name, phone_number }) {
  const { items } = useSelector((state) => state.basket);
  const [total, setTotal] = useState(0);
  const [quid, setQuid] = useState(`CBK${generateRandomNumber()}`);
  const [isorder_id, setIsOrderId] = useState(`MBK${generateRandomNumber()}`);
  const [otp, setOtp] = useState("");
  const [statusMessage, setStatusMessage] = useState("");
  const [popupop, setPopupOp] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isQuid, setIsQuid] = useState();

  const handleClose = () => setPopup(false);

  async function getBasket() {
    const accessToken = localStorage.getItem("accessToken");
    try {
      const res = await axios.get("https://koreacenter.kg/api/basket/", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      setTotal(res.data.total_price);
    } catch (error) {
      console.log(error);
    }
  }

  const createPayment = async () => {
    try {
      const params = {
        phone: phone_number,
        amount: total * 100,
        quid: quid,
        comment: "Пополнение баланса",
      };
      setIsQuid(params.quid);

      const headers = {
        authenticate: authenticateHeader,
        Accept: "application/json",
        "Content-Type": "application/json",
      };

      const response = await axios.get("/mbank/otp/create", {
        params,
        headers,
      });

      if (response.data.code === 110) {
        setStatusMessage("Транзакция успешно создана");
        setPopupOp(true);
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
      const response = await axios.get("/mbank/otp/confirm", {
        params: { quid, otp },
        headers: {
          authenticate: authenticateHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (response.data.code === 220) {
        setStatusMessage("Транзакция успешно подтверждена");
        await handleStatus();
      } else {
        setStatusMessage(response.data.comment || "Ошибка подтверждения");
      }
    } catch (error) {
      setStatusMessage("Ошибка подтверждения платежа");
      console.error("Ошибка подтверждения платежа:", error);
    }
  };

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
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const handleGet = async () => {
    const accessToken = localStorage.getItem("accessToken");
    if (!accessToken) {
      setStatusMessage("Ошибка: токен авторизации не найден");
      return;
    }

    const formattedItems = items.map((item) => ({
      product: item.product?.id || item.product.id,
      price: parseFloat(item.product.price),
      quantity: item.quantity || 1,
    }));

    try {
      const response = await axios.post(
        "/payments/orders/create/",
        {
          order_id: isorder_id,
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

      if (response.status === 201) {
        await deleteServer();
      }
    } catch (error) {
      console.error("Ошибка при создании заказа:", error.response?.data || error);
    }
  };

  async function handleStatus() {
    try {
      if (!isQuid) {
        throw new Error("Quid is undefined!");
      }

      const res = await axios.get(`/mbank/otp/status?quid=${isQuid}`, {
        headers: {
          authenticate: authenticateHeader,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });

      if (res.data.code === 330) {
        await handleGet();
        setStatusMessage("Транзакция успешно завершена");
      } else if (res.data.code === 331) {
        setStatusMessage("Транзакция в процессе обработки. Подождите...");
        setTimeout(handleStatus, 5000); // Проверка через 5 секунд
      } else {
        setStatusMessage(res.data.comment || "Ошибка обработки транзакции");
      }
    } catch (error) {
      setStatusMessage(error.response?.data.comment || "Ошибка проверки статуса");
      console.error("Error:", error.message, error.response?.data || error);
    }
  }

  const handleChange = (e) => {
    const value = e.target.value;
    setOtp(value);

    if (value === "1234") {
      handleConfirm();
    }
  };

  useEffect(() => {
    getBasket();
  }, []);

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
