import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './_admin_order.module.scss';

export const AdminOrder = () => {
    const [orders, setOrders] = useState([
        { id: 1, date: '20-04-2024', name: 'Иванов Иван', amount: '50 шт', status: 'Отправлен' },
        { id: 2, date: '21-01-2023', name: 'Асанов Асан', amount: '12 шт', status: 'Отправлен' },
        { id: 3, date: '23-02-2024', name: 'Wade Warren', amount: '123 шт', status: 'В обработке' },
        { id: 4, date: '26-03-2024', name: 'Esther Howard', amount: '34 шт', status: 'В обработке' },
        { id: 5, date: '27-04-2024', name: 'Courtney Henry', amount: '34 шт', status: 'В обработке' },
        { id: 6, date: '30-07-2024', name: 'Jenny Wilson', amount: '44 шт', status: 'Отменен' },
        { id: 7, date: '01-08-2024', name: 'Guy Hawkins', amount: '444 шт', status: 'Отправлен' }
    ]);

    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };
	

    const handleDelete = (id) => {
        const updatedOrders = orders.filter(order => order.id !== id);
        setOrders(updatedOrders);
    };

    const filteredOrders = orders.filter(order => {
        const matchesSearchTerm = order.name.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatusFilter = filter === '' || order.status === filter;

        let matchesDateFilter = true;
        if (startDate || endDate) {
            const [day, month, year] = order.date.split('-');
            const orderDate = new Date(`${year}-${month}-${day}`);
            const start = startDate ? new Date(startDate) : null;
            const end = endDate ? new Date(endDate) : null;

            matchesDateFilter =
                (!start || orderDate >= start) &&
                (!end || orderDate <= end);
        }

        return matchesSearchTerm && matchesStatusFilter && matchesDateFilter;
    });

    return (
        <>
            <section>
                <div className='container'>
                    <Link to='/admin'>
                        <button className={styles.btn_back}>
                            <span className="mr-2">←</span> Назад
                        </button>
                    </Link>

                    <h1 className={styles.pro_zakaz}>Просмотр заказов</h1>
                    <p className={styles.status_text}>Статус заказа</p>
                    <div className={styles.searchSection}>
                        <input
                            type="text"
                            placeholder="Поиск ..."
                            value={searchTerm}
                            onChange={handleSearchChange}
                            className={styles.input_search}
                        />

                        <div className={styles.filters}>
                            <div className={styles.flexContents}>
                                <p className={styles.filters_p}>От</p>
                                <input 
                                    type="date" 
                                    className={styles.input_data} 
                                    value={startDate}
                                    onChange={(e) => setStartDate(e.target.value)} 
                                />
                                <p className={styles.filters_p}>До</p>
                                <input 
                                    type="date" 
                                    className={styles.input_data} 
                                    value={endDate}
                                    onChange={(e) => setEndDate(e.target.value)} 
                                />
                            </div>

                            <div className={styles.textStatus}></div>
                            <div className={styles.text}>
                                <select
                                    className={styles.select}
                                    value={filter}
                                    onChange={(e) => setFilter(e.target.value)}
                                >
                                    <option value="">Все</option>
                                    <option value="Отправлен">Отправлен</option>
                                    <option value="В обработке">В обработке</option>
                                    <option value="Отменен">Отменен</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <table className={styles.label}>
                        <thead className={styles.label_thead}>
                            <tr className={styles.thead_tr}>
                                <th className={styles.tr_th}>№</th>
                                <th className={styles.tr_th}>Дата заказа</th>
                                <th className={styles.tr_th}>Фамилия Имя</th>
                                <th className={styles.tr_th}>Количество</th>
                                <th className={styles.tr_th}>Статус заказа</th>
                                <th className={styles.tr_th}>Действия</th>
                                <th className={styles.tr_th}>Удалить</th>
                            </tr>
                        </thead>
                        <tbody className={styles.lbody}>
                            {filteredOrders.length > 0 ? (
                                filteredOrders.map((order, index) => (
                                    <tr key={order.id} className={styles.tr_center}>
                                        <td className={styles.tr_td}>{index + 1}</td>
                                        <td className={styles.tr_td}>{order.date}</td>
                                        <td className={styles.tr_td}>{order.name}</td>
                                        <td className={styles.tr_td}>{order.amount}</td>
                                        <td className={styles.tr_td}>{order.status}</td>

                                        <td className={styles.tr_td}>
                                            <Link to={`/prosmotr/${order.id}`} state={{ order }}>
                                                <button className={styles.btn_pros}>Просмотр</button>
                                            </Link>
                                        </td>

                                        <td className={styles.tr_td}>
                                            <button
                                                className={styles.btn_delete}
                                                onClick={() => handleDelete(order.id)}
                                            >
                                                Удалить
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td colSpan="7" className={styles.tr_td}>Нет заказов по вашему запросу</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </section>
        </>
    );
};


