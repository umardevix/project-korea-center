import React, { useEffect, useState } from "react";
import styles from "./_green_button.module.scss";
import axios from "axios";

function GreenButton({ price }) {
  const [priceUSD, setPriceUSD] = useState(null)
  const [priceRUB, setPriceRUB] = useState(null)

  useEffect(() => {
    const fetchExchangeRates = async () => {
      try {
        const res = await axios.get('https://latest.currency-api.pages.dev/v1/currencies/kgs.json')

        if (res.data.kgs.usd && res.data.kgs.rub) {
          setPriceUSD((price * res.data.kgs.usd).toFixed(2))
          setPriceRUB((price * res.data.kgs.rub).toFixed(2))
        }

      } catch (error) {
        console.error("Ошибка при получении курса валют:", error);
      }
    }
    fetchExchangeRates()
  }, [price])

  return (
    <div className={styles.price}>
      <button>В наличии</button>
      <p>{price} сом</p>
      <span>~ {priceUSD} $ <br />~ {priceRUB} ₽</span>
    </div>
  );
}

export default GreenButton;
