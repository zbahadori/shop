import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import db from '../utils/db'
import Product from '../models/product'


export default function Home({products}) {
  return (
    <Layout title='Home page'>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
        {products.map((pItem) => (
          <ProductItem key={pItem.slug} item={pItem} />
        ))}
      </div>
    </Layout>
  )
}

export async function getServerSideProps(){ // این تابع قبل از رندر شدن کامئونننت اجرا میشه
  await db.connect()

  const products = await Product.find().lean() //az lean estefade mikonim ta query sabok tari dashte bashim

  return{
    props: {
      products : products.map(db.convertToObj)
    }
  }
}
