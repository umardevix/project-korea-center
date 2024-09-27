import axios from 'axios'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLoaderData } from 'react-router-dom'
import IdFirstSection from '../../components/idFirstSection/IdFirstSection'
import styles from './_productId.module.scss'

// import ProductSection from '../../components/productSection/ProductSection'
import { filterProducts, setSelectedModel } from '../../redux/productSlice/ProductSlice'
import Card from '../../components/card/Card'
import { useState } from 'react'

function ProductIdPage({ isProduct = false }) {
  const { filteredProducts } = useSelector(state => state.products)

  const product = useLoaderData()

  const dispatch = useDispatch()

  const filterProductId = filteredProducts.filter(el => el.model === product.model)

  useEffect(() => {
    if (isProduct) {
      dispatch(setSelectedModel(product.model))
    }
  }, [isProduct, dispatch])


  return (
    <div>
      <IdFirstSection product={product} />
      <div className='container'>
        <h1 className={styles.product_id_title}>Другие запчасти {product.model} поколение</h1>
        <section>
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
  const res = await axios.get(`/products/product/${params.id}`)
  return res.data

}

export { ProductIdPage as default, productLoader }

