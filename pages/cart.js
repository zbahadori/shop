import { useContext } from "react"
import Layout from "../components/Layout"

import { CartContext, Store } from '../context/cart'
import Image from "next/image"
function CartPage(){
    const { state, dispatch } = useContext(CartContext)
    // const { state, dispatch } = useContext(Store)
    const { cart: { cartItems } } = state

    function removeItemHandler (item) {
        dispatch({type: 'REMOVE_ITEM', payload: item})
    }
    return(
        <Layout title="Shopping Cart">
            <h1 className="mb-4 text-xl  ">Shapping Cart</h1>
            {cartItems.length === 0 ? <div>Cart is empty</div> :
             <div className="grid md:grid-cols-4 md:gap-5">
                <div className="overflow-x-auto md:col-span-3">
                    <table className="min-w-full">
                        <thead className="border-b">
                            <tr>
                                <th className="px-5 text-left">Item</th>
                                <th className="p-5 text-right">Quantity</th>
                                <th className="p-5 text-right">Price</th>
                                <th className="p-5">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map((item) => (
                                <tr key={item.slug} className="border-b">
                                    <td className="text-center">
                                        <span /* className="flex items-center" */>
                                            <Image src={item.image} alt={item.title} width={10} height={10} layout="responsive" />
                                            {item.title}
                                        </span>
                                    </td>
                                    <td className="p-5 text-right">{item.qty}</td>
                                    <td className="p-5 text-right">{item.price}</td>
                                    <td className="p-5 text-center" onClick={() => removeItemHandler(item)}><button>Remove</button></td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
             </div>}
        </Layout>
    )
}
export default CartPage
