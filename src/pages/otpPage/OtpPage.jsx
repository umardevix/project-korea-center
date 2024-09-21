import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./_otp.module.scss";
import Popup from "../../components/popup/Popup";
import axios from "axios";

function OtpPage() {
  const navigate  =  useNavigate()
  const location = useLocation();
  const [phone_number, setPhoneNumber] = useState(location.state?.phone_number || "");
  const [code, setCode] = useState("");
  const [popup, setPopup] = useState(true);
  const [phone_code , setPhoneCode] = useState(phone_number, code)

  async function postService() {
    console.log("Phone Number:", phone_number);
    console.log("Code:", code);

    if (!phone_number || !code) {
      console.error("Phone number or code is missing!");
      return;
    }

    try {
      const res = await axios.post("/account/verify-code/",{
        phone_number:phone_number,
        verification_code:code
      });
      console.log(res);
      console.log({phone_number,code})
      if (res.status === 200) {
        setPopup(false)
      }
    } catch (error) {
      console.error("Error in OTP post", error);
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    postService();
  }

  return (
    <section className={styles.payment_section}>
      <div className="container">
        <div className={styles.payment_container}>
          <div className={styles.payment_header}>
            <span>
              Главная <img src="/assets/svg/right.svg" alt="" />
            </span>
            <span>
              Корзина <img src="/assets/svg/right.svg" alt="" />
            </span>
            <span>Оформить заказ</span>
          </div>
          <form onSubmit={handleSubmit}>
            <label htmlFor="otp_code">Код подтверждения</label>
            <div className={styles.payment_info}>
              <div className={`${styles.login_input_1} ${styles.login_input_2}`}>
                <div className={styles.login_input}>
                  <input
                    onChange={(e) => setCode(e.target.value)}
                    value={code}
                    type="number"
                    id="otp_code"
                    placeholder="Введите код из SMS"
                  />
                </div>
                <small>Напишите код, который вам пришел через SMS</small>
              </div>
              <div className={styles.login_button}>
                <button type="submit">Подтвердить</button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {!popup && <Popup text={"ваш аккауте успешно создан"} to={"login"}/>}
    </section>
  );
}

export default OtpPage;
