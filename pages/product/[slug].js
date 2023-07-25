import { useRouter } from "next/router";
import Layout from "../../components/Layout";


import Image from "next/image";
import { useContext, useState } from "react";
import { CartContext } from "../../context/cart";
import db from '../../utils/db'
import Product from '../../models/product'
function ProductPage({ product }) {
  const { state, dispatch } = useContext(CartContext)
  const router = useRouter();

  if (!product) {
    return <div>Product Not Found!</div>;
  }



  function addToCartHandler(){
    const existingItem = state.cart.cartItems.find(
      (item) => item.slug === product.slug
    )

    const qty = existingItem ? existingItem.qty + 1 : 1;
    if(qty > product.count){  
      alert('Product is out!')
      return
    }
    dispatch({type: 'ADD_ITEMS', payload: { ...product, qty }})
    router.push('/cart')
  }

  return (
    <Layout title={product.title}>
      <div className="grid md:grid-cols-4 md:gap-3 bg-white rounded-xl p-10">
        <div className="md:col-span-1">
          <Image
            className="rounded-xl"
            src={product.image}
            alt={product.title}
            width={300}
            height={300}
            layout="responsive"
          />
        </div>
        <div className="text-lg">
          <h2>{product.title}</h2>
          <p>{product.cat}</p>
          <p>{product.description}</p>
        </div>
        <div className="p-5">
          <div className="mb-2 flex justify-between">
            <div>Price: </div>
            <div>{product.price}</div>
          </div>
          <div className="mb-2 flex justify-between">
            <div>Status: </div>
            <div>{product.count > 0 ? 'Available' : 'Un Available'}</div> 
          </div>
          {<button 
            onClick={addToCartHandler}
            className="rounded-xl bg-gray-700 text-white px-4 py-2 w-full">Add To Cart</button> }
        </div>
      </div>
    </Layout>
  );
}
export default ProductPage;

export async function getServerSideProps(context){
  const { params } = context
  const { slug } = params
  await db.connect()
  const product = await Product.findOne({slug}).lean()
  return{
    props: {
      product: product ? db.convertToObj(product) : null
    }
  }
}
 
