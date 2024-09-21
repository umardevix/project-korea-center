import React from 'react'
import styles from "./_notfountpage.module.scss"
import {useNavigate} from "react-router-dom"
function NotFountPage() {
    const navigate = useNavigate()
  return (
    <section className={styles.notfound_section}>
        <div className='container'>
            <div className={styles.notfound_container}>
                <div className={styles.notfound_header}>
                    <h1>404 Не найдено</h1>
                    <p>Ваша посещенная страница не найдена. Вы можете перейти на домашнюю страницу.</p>

                </div>
              
                <div className={styles.notfound_button}>
                    <button onClick={()=>navigate("/")}>Вернуться в главный</button>

                </div>

            </div>

        </div>

       
    </section>
  )
}

export default NotFountPage

