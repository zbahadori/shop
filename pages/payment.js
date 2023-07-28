import Layout from "../components/Layout";
import CheckoutWizard from '../components/CheckoutWizard'
import { useRouter } from "next/router";
import { useContext, useState } from "react";
import dynamic from "next/dynamic";
import { CartContext } from '../context/cart' 
import Cookies from "js-cookie";


function PaymentPage(){
    const {state, dispatch} = useContext(CartContext)
    const { cart } = state
    const { paymentMethod } = cart

    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('')
    const router = useRouter()
    const methods = ['Gateway', 'Offline Payment']

    function submitHandler(event) {
        event.preventDefault()

        if(! selectedPaymentMethod){ 
            alert('please select payment method')
        }

        dispatch({
            type: 'SAVE_PAYMENT_METHOD',
            payload: selectedPaymentMethod
        })

        Cookies.set('cart', JSON.stringify({
            ...cart,
            paymentMethod: selectedPaymentMethod
        }))
        
        router.push('/placeorder')
    }



    return(
        <Layout title='payment page'>
            <CheckoutWizard activeStep={2} />
            <form className="mx-auto max-w-screen-md" onSubmit={submitHandler}>
                <h2 className="mb-4 text-xl">Payment Method</h2>
                {methods.map((item) => (
                    <div className="mb-4" key={item}>
                        <input  
                            name="paymentMethod"
                            className="p-2 outline-none focus:right-0"
                            id={item}
                            type="radio"
                            checked={selectedPaymentMethod === item || paymentMethod === item }
                            // checked={selectedPaymentMethod === item }
                            onChange={() => setSelectedPaymentMethod(item)}
                        />
                        <label className="p-2" htmlFor={item}>
                            {item}
                        </label>
                    </div>
                ))}
               <div className="mb-4 flex justify-between">
                <button 
                    onClick={() => router.push('/shipping')}
                    type="button"
                 className="rounded-xl bg-gray-300 text-gray-700 px-4 py-2 w-28">Back</button>
                <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">Next</button>
               </div>
            </form>
        </Layout>
    )
}

export default PaymentPage
// export default dynamic(() => Promise.resolve(PaymentPage), { ssr: false })
