import React, { useState } from 'react';
import styles from "./_forgot.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Forgot() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [countryCode, setCountryCode] = useState("+996"); // Default country code
  const [border , setBorder] = useState(true);
  
  function formatPhoneNumber(value) {
    const cleaned = value.replace(/\D/g, "");
    const match = cleaned.match(/(\d{0,3})(\d{0,3})(\d{0,3})/);
  
    if (match) {
      return [match[1], match[2], match[3]].filter(Boolean).join("-");
    }
    return value;
  }
  
  function handlePhoneNumberChange(event) {
    const formattedNumber = formatPhoneNumber(event.target.value);
    setPhoneNumber(formattedNumber);
  }

  function handleCountryCodeChange(event) {
    setCountryCode(event.target.value);
  }
  
  async function postService() {
    try {
      const formattedPhoneNumber = `${countryCode}${phoneNumber.replace(/-/g, "")}`;
      const res = await axios.post("/account/forgot-password/phone/", {
        phone_number: formattedPhoneNumber
      });
      console.log(res);

      setBorder(true);
      if (res.status === 200) {
        // Navigate to ForgotCode with phone number
        navigate("/forgot-code", { state: { phone_number: formattedPhoneNumber } });
      }
    } catch (error) {
      console.log(error);
      setBorder(false);
      console.log(`${countryCode}${phoneNumber.replace(/-/g, "")}`);
    }
  }
  
  function handleSubmit(event) {
    event.preventDefault();
    postService();
  }

  return (
    <section className={styles.login_section}>
      <div className="container">
        <div className={styles.forgot_container}>
          <form onSubmit={handleSubmit} className={styles.login_info}>
            <div className={styles.login_title}>
              <h1>Забыли пароль?</h1>
            </div>
            <div className={styles.login_inputs}>
              <div className={`${styles.login_input_1} ${styles.login_input_one}`}>
                <span>Номер</span>
                <div className={`${styles.login_input} ${border ? styles.border_true : styles.border_false}`}>
                  <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                  />
                  <div className={styles.select_dropdown}>
                    <select onChange={handleCountryCodeChange} value={countryCode}>
                      <option value="+996">+996</option>
                      <option value="+7">+7</option>
                      <option value="+998">+998</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
            <div className={styles.login_button}>
              <button type="submit">Сбросить пароль</button>
              {border === false && <small>Код неверный. Попробуйте снова.</small>}
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

export default Forgot;
