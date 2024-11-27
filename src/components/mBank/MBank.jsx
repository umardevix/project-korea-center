import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './_mBank.module.scss';

function MBank() {
  const navigate = useNavigate();

  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [quid, setQuid] = useState('');
  const [txnId, setTxnId] = useState('');
  const [statusMessage, setStatusMessage] = useState('');

  // ХЭШ авторизации, предоставляемый банком
  const authenticateHeader = 'bcec992fec1e20efcc7458839dafca53b5cb855b288562233b7ad1c7bb62b835';

  // Функция для отправки номера телефона на проверку
  const handlePhoneCheck = async () => {
    try {
      const phoneWithCountryCode = `996${phone}`;  // Форматируем номер телефона с кодом страны
      const response = await axios.get(`/payment/otp/check`, {
        params: { phone: phoneWithCountryCode },
        headers: {
          'authenticate': authenticateHeader,  // Добавляем хэш авторизации
          'Accept': 'application/json',         // Указываем, что ожидаем JSON
          'Content-Type': 'application/json'    // Указываем тип контента
        }
      });

      console.log(response);


      // Проверяем код ответа в теле ответа (не HTTP статус)
      if (response.data.code === 0) {
        // Плательщик найден
        setStatusMessage('Плательщик найден в системе');
        createPayment();
      } else if (response.data.code === 114) {
        // Плательщик не найден
        setStatusMessage('Плательщик не найден в системе');
      } else {
        // Обработка других кодов ошибок
        setStatusMessage('Неизвестная ошибка');
      }
    } catch (error) {
      // Логируем ошибки, если запрос не удался
      setStatusMessage('Ошибка связи с сервером');
      console.error('Ошибка при проверке номера:', error.response || error.message);
    }
  };


  // Функция для создания платежа
  const createPayment = async () => {
    try {
      const response = await axios.get(`/payment/otp/create`, {
        params: {
          phone: `996${phone}`,
          amount: 1000,
          quid: 'CBK123',
          comment: 'test'
        },
        headers: {
          'authenticate': authenticateHeader,  // Добавляем хэш авторизации
          'Accept': 'application/json',         // Указываем, что ожидаем JSON
          'Content-Type': 'application/json'    // Указываем тип контента
        }
      });

      if (response.data.code === 110) {
        setStatusMessage('Транзакция успешно создана');
        setQuid('CBK123');
        setTxnId(response.data.txnId);
      } else {
        setStatusMessage(response.data.comment);
      }
    } catch (error) {
      setStatusMessage('Ошибка создания платежа');
      console.error(error);
    }
  };

  // Функция для подтверждения платежа
  const confirmPayment = async () => {
    try {
      const response = await axios.get(`/payment/otp/confirm`, {
        params: {
          quid,
          otp
        },
        headers: {
          'authenticate': authenticateHeader,  // Добавляем хэш авторизации
          'Accept': 'application/json',         // Указываем, что ожидаем JSON
          'Content-Type': 'application/json'    // Указываем тип контента
        }
      });

      if (response.data.code === 220) {
        setStatusMessage('Транзакция успешно подтверждена');
        checkStatus();
      } else {
        setStatusMessage(response.data.comment);
      }
    } catch (error) {
      setStatusMessage('Ошибка подтверждения платежа');
      console.error(error);
    }
  };

  // Функция для проверки статуса платежа
  const checkStatus = async () => {
    try {
      const response = await axios.get(`/payment/otp/status`, {
        params: { quid },
        headers: {
          'authenticate': authenticateHeader,  // Добавляем хэш авторизации
          'Accept': 'application/json',         // Указываем, что ожидаем JSON
          'Content-Type': 'application/json'    // Указываем тип контента
        }
      });

      if (response.data.code === 330) {
        setStatusMessage('Транзакция успешна!');
      } else if (response.data.code === 331) {
        setStatusMessage('Транзакция в процессе обработки');
      } else {
        setStatusMessage('Транзакция неуспешна');
      }
    } catch (error) {
      setStatusMessage('Ошибка проверки статуса');
      console.error(error);
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

      {quid && (
        <div>
          <input
            type="text"
            placeholder="Введите OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
          />
          <button
            className="bg-regal-red w-full mt-3 rounded-md py-1 text-white"
            onClick={confirmPayment}
          >
            Подтвердить платеж
          </button>
        </div>
      )}

      {txnId && (
        <button
          className="bg-regal-red w-full mt-3 rounded-md py-1 text-white"
          onClick={checkStatus}
        >
          Проверить статус
        </button>
      )}
    </>
  );
}

export default MBank;
