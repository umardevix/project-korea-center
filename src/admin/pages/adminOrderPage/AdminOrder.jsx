import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './_admin_order.module.scss';
import axios from 'axios';

export const AdminOrder = () => {
    const [data, setData] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('');
    const [endDate, setEndDate] = useState('');
    const [startDate, setStartDate] = useState('');

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    async function getService() {
        try {
            const res = await axios.get('/payments/payments-admin/', {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                },
            });
            setData(res.data);
        } catch (error) {
            if (error.response) {
                console.error('Server Error:', error.response.data);
            } else if (error.request) {
                console.error('Request Error:', error.request);
            } else {
                console.error('General Error:', error.message);
            }
        }
    }

    useEffect(() => {
        getService();
    }, []);

    const handleDelete = async (id) => {
        try {
            const res = await axios.delete(`/payments/orders/${id}/delete/`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                    "Content-Type": "application/json",
                },
            });
            if (res.status === 204) {
                setData(data.filter(order => order.id !== id));
            }
        } catch (error) {
            console.error('Error deleting order:', error.message);
        }
    };

    async function handleChange(id, newStatus) {
        try {
            const response = await axios.patch(
                `/payments/orders/${id}/update/`,
                { status: newStatus },
                {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
                        'Content-Type': 'application/json',
                    },
                }
            );

            if (response.status === 200) {
                setData(prevData =>
                    prevData.map(order =>
                        order.id === id ? { ...order, status: newStatus } : order
                    )
                );
            }
        } catch (error) {
            console.error('Error updating status:', error.message);
        }
    }

    const filteredOrders = data.filter(order => {
        // Преобразуем введенный текст в нижний регистр
        const term = searchTerm.toLowerCase();
    
        // Проверяем, содержит ли client_name или order_id введенную строку
        const matchesSearchTerm = 
            (order?.client_name?.toLowerCase().includes(term) || 
             order?.order_id?.toLowerCase().includes(term)); // Преобразуем order_id в строку и нижний регистр
    
        const matchesStatusFilter = filter === '' || order.status === filter;
    
        let matchesDateFilter = true;
        if (startDate || endDate) {
            const orderDate = new Date(order.order_date.slice(0, 10)); // Дата заказа
            const start = startDate ? new Date(startDate) : null; // Начало диапазона
            const end = endDate ? new Date(endDate) : null; // Конец диапазона
    
            matchesDateFilter =
                (!start || orderDate >= start) &&
                (!end || orderDate <= end);
        }
    
        return matchesSearchTerm && matchesStatusFilter && matchesDateFilter;
    });
    
    

    return (
        <section>
            <div className="container">
                <Link to="/admin">
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
                </div>
                <table className={styles.label}>
                    <thead className={styles.label_thead}>
                        <tr className={styles.thead_tr}>
                            <th className={styles.tr_th}>№</th>
                            <th className={styles.tr_th}>Дата заказа</th>
                            <th className={styles.tr_th}>Номер заказа</th>
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
                                    <td className={styles.tr_td}>{order.order_date.slice(0, 10)}</td>
                                    <td className={styles.tr_td}>{order.order_id}</td>
                                    <td className={styles.tr_td}>{order.client_name}</td>
                                    <td className={styles.tr_td}>{order.items.length}</td>
                                    <td className={styles.tr_td}>
                                        <select
                                            onChange={(e) => handleChange(order.id, e.target.value)}
                                            className={styles.select_status}
                                            value={order.status}
                                        >
                                            <option value={order.status}>{order.status}</option>
                                            <option value={order.status === 'Отправлен' ? 'Доставлен' : 'Отправлен'}>
                                                {order.status === 'Отправлен' ? 'Доставлен' : 'Отправлен'}
                                            </option>
                                        </select>
                                    </td>
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
            
        </section>
    );
};
