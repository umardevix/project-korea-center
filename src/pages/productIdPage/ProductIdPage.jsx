import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import IdFirstSection from '../../components/idFirstSection/IdFirstSection'
import styles from './_productId.module.scss'
import ProductSection from '../../components/productSection/ProductSection'
import { filterProducts, setSelectedModel } from '../../redux/productSlice/ProductSlice'
import Card from '../../components/card/Card'
import { useState } from 'react'
import {toast} from 'react-toastify'
import { addToBasket,updateBasketCount } from '../../redux/productSlice/ProductSlice'

function ProductIdPage({ isProduct = false }) {
  const { filteredProducts } = useSelector(state => state.products)
  const [loading,setLoading] = useState(false)
  const product = useLoaderData()

  const dispatch = useDispatch()

  const filterProductId = filteredProducts.filter(el => el.model === product.model)

  useEffect(() => {
    if (isProduct) {
      dispatch(setSelectedModel(product.model))
    }
  }, [isProduct, dispatch])

  const onAddToBasket = async () =>{
    setLoading(true)
    try{
      await dispatch(addToBasket(el)).unwrap();
      toast.success('Продукт добавлен в корзину');
      dispatch(updateBasketCount(1))
    }catch{
      toast.error('Ошибка при добавлении продукта в корзину')
    }finally{
      setLoading(false)
    }
  };



  return (
    <div>
      <IdFirstSection product={product} onAddToBasket={onAddToBasket}/>
      <div className='container'>
        <h1 className={styles.product_id_title}>Другие запчасти {product.model} поколение</h1>
        <section className='mt-[32px] md:mt-[58px] lg:mt-[42px]'>
          {
            filterProductId.map(el => (
              <Card key={el.id} el={el} />
            ))
          }
        </section>
      </div>
    </div>
  )
}

const productLoader = async ({ params }) => {
  const res = await axios.get(`/products/product/${params.id}/`)
  return res.data;


}

export { ProductIdPage as default, productLoader }
