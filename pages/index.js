import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import db from '../utils/db'
import Product from '../models/product'

import { CartContext } from '../context/cart'
import { useContext } from "react";
import { toast } from "react-toastify";
import dynamic from 'next/dynamic'

// export default function Home({products}) {
function Home({products}) {

  const { state, dispatch } = useContext(CartContext)
  const { cart } = state

  function addToCartHandler(product){
    const existingItem = cart.cartItems.find((item) => item.slug === product.slug)
    const qty = existingItem ? existingItem.qty + 1 : 1

    dispatch({ type: 'ADD_ITEMS', payload: { ...product, qty } })
    toast.success('product added.')
  }

  return (
    <Layout title='Home page'>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((pItem) => (
          <ProductItem addToCart={addToCartHandler} key={pItem.slug} item={pItem} />
        ))}
      </div>
    </Layout>
  )
}

export default dynamic(() => Promise.resolve(Home), { ssr: false })

export async function getServerSideProps(){ // این تابع قبل از رندر شدن کامئونننت اجرا میشه
  await db.connect()

  const products = await Product.find().lean() //az lean estefade mikonim ta query sabok tari dashte bashim

  return{
    props: {
      products : products.map(db.convertToObj)
    }
  }
}
