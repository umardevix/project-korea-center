import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearUser } from '../../redux/userSlice/userSlice';
import axios from 'axios';
import History from '../../components/history/History';

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.user);
  const [orderHistory, setOrderHistory] = useState([]);
  const [data , setData] = useState([])
  async function handleGet() {
    try {
      const res = await axios.get("/payments/payments-history", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
      });
      setData(res.data.items);
    } catch (error) {
      if (error.response) {
        console.error("Ошибка ответа сервера:", error.response.data);
      } else if (error.request) {
        console.error("Запрос не был выполнен:", error.request);
      } else {
        console.error("Ошибка:", error.message);
      }
    }
  }
  

  useEffect(() => {
    handleGet ()
    const fetchOrderHistory = async () => {
      try {
        const response = await axios.get('/account/orders/', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        });
        if (response.status === 200) {
          setOrderHistory(response.data); // Assuming response.data is the order array
        }
      } catch (error) {
        console.error("Ошибка при получении истории заказов:", error);
      }
    };

    fetchOrderHistory();
  }, []);

  const handleLogout = () => {
    dispatch(clearUser());
    navigate('/login'); // Redirect to the login page after logout
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 p-4">
      <div className="bg-white shadow-md rounded-lg p-6 max-w-4xl w-full mt-4">
        <h1 className="text-2xl font-semibold text-center mb-4 text-gray-800">
          Добро пожаловать в ваш аккаунт, {user.first_name}!
        </h1>
        <div className="flex flex-col md:flex-row">
          {/* Account Information Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md md:w-1/2 mr-0 md:mr-4 mb-4 md:mb-0">
            <h2 className="text-xl font-semibold mb-4">Информация об аккаунте</h2>
            <p className="text-gray-700"><strong>Имя:</strong> {user.first_name} {user.last_name}</p>
            <p className="text-gray-700"><strong>Телефон:</strong> {user.phone_number}</p>
            <p className="text-gray-700"><strong>Дата регистрации:</strong> {new Date(user.date_joined).toLocaleDateString()}</p>
            <button
              className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 rounded transition duration-200"
              onClick={handleLogout}
            >
              Выйти
            </button>
          </div>

          {/* Order History Section */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md md:w-1/2">
            <h2 className="text-xl font-semibold mb-4">История заказов</h2>
            <ul className="space-y-2">
              {orderHistory.length > 0 ? (
                orderHistory.map(order => (
                  <li key={order.id} className="flex justify-between bg-white p-2 rounded shadow">
                    <span>Заказ {order.id}</span>
                    <span>{order.amount} товаров</span>
                    <span>{order.date}</span>
                  </li>
                ))
              ) : (
                <li className="text-gray-600">{data.length===0?"нет заказов":data.length}</li>
              )}
            </ul>
          </div>
        </div>
      </div>
        <History/>
    </div>
  );
};

export default ProfilePage;
