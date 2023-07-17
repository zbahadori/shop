import Layout from "../components/Layout";
import Product from "../components/Product";
import ProductItems from '../components/data/products.json'


export default function Home() {
  return (
    <Layout title='Home page'>
      <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-4">
        {ProductItems.map((pItem) => (
          <Product key={pItem.slug} item={pItem} />
        ))}
      </div>
    </Layout>
  )
}
