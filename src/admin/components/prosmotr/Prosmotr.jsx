import React from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import styles from './_prosmotr_product.module.scss';

const products = [
    {
        name: "Антенна усилитель AM/FM",
        quantity: "2шт",
        price: "4500 сом",
    },
    {
        name: "Антенна усилитель AM/FM",
        quantity: "2шт",
        price: "4500 сом",
    },
    {
        name: "Антенна усилитель AM/FM",
        quantity: "2шт",
        price: "4500 сом",
    },
    {
        name: "Антенна усилитель AM/FM",
        quantity: "2шт",
        price: "4500 сом",
    }
];

const Prosmotr = () => {
    const location = useLocation();
    const { order } = location.state;

    const orderDetails = [
        { label: 'Номер заказа', value: order.id },
        { label: 'Дата заказа', value: order.date },
        { label: 'Клиент', value: order.name },
        { label: 'Телефон', value: '+996 704 449 999' },
        { label: 'Адрес', value: '2118 Thornridge Cir. Syracuse, Connecticut 35624' },
        { label: 'Статус заказа', value: order.status },
    ];

    return (
        <>
            <section>
                <div className="container">
                    <div className={styles.wrapper_back}>
                        <Link to='/admin/order'>
                        <button className={styles.btn_back}>
                            <span className="mr-2">←</span> Назад
                        </button>
                        
                        </Link>
                        <h2 className={styles.details_h2}>Детали заказа</h2>
                    </div>

                    <div className={styles.block_left_right}>
                        <div className={styles.block_left}>
                            {orderDetails.map((detail, index) => (
                                <div className={styles.zakaz} key={index}>
                                    <p className={styles[`detail_one_${index}`]}>{detail.label}:</p>
                                    <p className={styles[`detail_two_${index}`]}>{detail.value}</p>
                                </div>
                            ))}
                        </div>

                        <div className={styles.block_right}>
                            <p className={styles.tovar_p}>Товар:</p>

                            {products.map((product, index) => (
                                <div className={styles.tovar_block} key={index}>
                                    <p>{index + 1}. {product.name}</p>
                                    <p>{product.quantity}</p>
                                    <p>...............................................................</p>
                                    <p>{product.price}</p>
                                </div>
                            ))}

                            <div className={styles.line}></div>

                            <div className={styles.block_total}>
                                <p>Общая стоимость</p>
                                <p>..............................................................</p>
                                <p>18 000 сом</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Prosmotr;




