import React, { useState } from 'react';
import axios from 'axios';
import styles from './_mBank.module.scss';
import MBankPopup from '../mBankPopup/MBankPopup';

function MBank() {
  const [phone, setPhone] = useState('');
  const [name, setName] = useState('');
  const [quid, setQuid] = useState('CBK19679');
  const [statusMessage, setStatusMessage] = useState('');
  const [popup, setPopup] = useState(false);
  const [number, setNumber] = useState('');

  const authenticateHeader =
    'b9aba2e0a23cb29c94b9986e924dcaeff09e390c37fd9ecca0f92acd81ed4899226cdd7e1ecfbd5169e3f3299d0f005fb415c1fa95ed00e605a7bb9529e84c85';

  const handlePopup = (isPopup) => {
    setPopup(isPopup);
  };

  const handlePhoneCheck = async () => {
    try {
      const phoneWithCountryCode = `996${phone}`;
      const response = await axios.get(`https://api.mbank.kg/v1/otp/check?phone=${phoneWithCountryCode}`, {
        headers: {
          authenticate: authenticateHeader,
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      });
      // console.log(response)

      console.log(response.data);
      if (response.data.code === 0) {
        setStatusMessage(response.data.comment);
        handlePopup(true);
        console.log(response.data)
        setNumber(phoneWithCountryCode);
        setName(response.data.displayName);
        setQuid(response.data.quid); // Сохраняем QUID для дальнейшего использования
      } else if (response.data.code === 114) {
        setStatusMessage('Плательщик не найден в системе');
      } else {
        setStatusMessage('Неизвестная ошибка');
        console.log("ошибка из неизвестная ошибка", response)
      }
    } catch (error) {
      setStatusMessage('Ошибка связи с сервером');
      console.error('Ошибка при проверке номера:', error.response || error.message);
    }
  };

  return (
    <>
      <div className={`${styles.login_input_1} ${styles.login_input_one}`}>
        <label htmlFor="phone">Номер Мбанк</label>
        <div className={styles.login_input}>
          <input
            type="text"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="Введите номер"
          />
          <div className={styles.select_dropdown}>
            <p>+996</p>
            <div className={styles.select_dropdown_img}>
              <img src="/assets/svg/arrow_bottom.svg" alt="arrow" />
            </div>
          </div>
        </div>
      </div>

      <button
        className="bg-regal-red w-full mt-3 rounded-md py-1 text-white"
        onClick={handlePhoneCheck}
      >
        Проверить номер
      </button>

      {statusMessage && <p>{statusMessage}</p>}

      {popup && (
        <MBankPopup
          setPopup={handlePopup}
          phone_number={number}
          name={name}
          quid={quid}
          statusMessagge={statusMessage}
        />
      )}
    </>
  );
}

export default MBank;
