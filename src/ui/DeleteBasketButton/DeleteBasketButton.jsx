import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteBasketItem } from '../../redux/productSlice/ProductSlice';

const DeleteBasketButton = ({ productId }) => {
    const dispatch = useDispatch();

    const handleDeleteBasket = () => {
        dispatch(deleteBasketItem(productId));
    };

    return (
        <button onClick={handleDeleteBasket}>
            Удалить из корзины
        </button>
    );
};

export default DeleteBasketButton;
