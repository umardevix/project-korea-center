import React from 'react'
import styles from "./_popup.module.scss"
import {useNavigate} from "react-router-dom"

function newPopup() {
    const navigate = useNavigate()
    return (
        <section>
            <div className={styles.new_fixed}>
                <div className='container'>
                    <div className={styles.new_container}>
                        <div className={styles.new_info}>
                            <div className={styles.new_content}>
                                <h1>Вы уверены, что получили товар?</h1>
                                <div className={styles.two_button}>
                                    <button onClick={()=>navigate('/basket')} className={styles.two_button_1}>Нет</button>
                                    <button onClick={()=>navigate('/')}  className={styles.two_button_2}>Да</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    )
}

export default newPopup
