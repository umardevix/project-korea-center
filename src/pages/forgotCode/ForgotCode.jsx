import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./_forgot_code.module.scss";
import axios from "axios";

function ForgotCode() {
  const navigate = useNavigate();
  const location = useLocation();
  const [phoneNumber, setPhoneNumber] = useState(location.state?.phone_number || "");
  const [code, setCode] = useState("");
  const [error, setError] = useState("");

  async function postService() {
    try {
      const res = await axios.post("/account/forgot-password/verify-code/", {
        phone_number: phoneNumber,
        verification_code: code
      });
      console.log(res)

      if (res.status === 200) {
        // Navigate to new-password and pass phoneNumber and code as state
        navigate("/new-password", { state: { phone_number: phoneNumber, verification_code: code } });
      }
    } catch (error) {
      setError("Код подтверждения истек. Пожалуйста, запросите новый код.");
      console.log(phoneNumber, code)
      console.error("Error in OTP post", error);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!phoneNumber || !code) {
      setError("Заполните все поля.");
      return;
    }
    postService();
  }

  return (
    <section className={styles.payment_section_forgot}>
      <div className="container">
        <div className={styles.payment_container}>
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
                {error && <small>{error}</small>}
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default ForgotCode;
