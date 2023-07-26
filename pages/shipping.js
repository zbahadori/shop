import { useContext, useEffect } from 'react'
import { CartContext } from '../context/cart'

import CheckoutWizard from "../components/CheckoutWizard"
import Layout from "../components/Layout"
import dynamic from 'next/dynamic'

import Cookies from 'js-cookie'
import { useForm } from 'react-hook-form'
import { useRouter } from 'next/router'
 
function Shipping(){

    const { handleSubmit, setValue, register } = useForm()
    const { state, dispatch } = useContext(CartContext)
    const { cart } = state 
    const { shippingData } = cart
    const router = useRouter()

    useEffect(() => {
        setValue('name', shippingData.name)
        setValue('address', shippingData.address)
        setValue('postalCode', shippingData.postalCode)
    }, [
        setValue,
        shippingData.name,
        shippingData.address,
        shippingData.postalCode
    ])

    function submitHandler({ name, address, postalCode }){
        dispatch({ 
            type: 'SAVE_SHIPPING_DATA', 
            payload:{ name, address, postalCode }
        })

        Cookies.set('cart', JSON.stringify({
            ...cart, 
            shippingData: {
                name, 
                address, 
                postalCode
            }
        }))
        router.push('/payment')
    }
    return(
        <Layout>
            <CheckoutWizard activeStep={1}/>
            <form className="mx-auto max-w-screen-md" onSubmit={handleSubmit(submitHandler)}>
                <h2 className="mb-4 text-xl">Shipping</h2>
                <div className="mb-4">
                    <input 
                        className="w-full rounded-xl p-2 outline-0" 
                        id="name"
                        placeholder="Name"
                        autoFocus
                        {...register('name')}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        className="w-full rounded-xl p-2 outline-0" 
                        id="address"
                        placeholder="Address"
                        autoFocus
                        {...register('address')}
                    />
                </div>
                <div className="mb-4">
                    <input 
                        className="w-full rounded-xl p-2 outline-0" 
                        id="postalCode"
                        placeholder="Postal Code"
                        autoFocus
                        {...register('postalCode')}
                    />
                </div>
                <div className="mb-4">
                    <button className="rounded-xl bg-gray-700 text-white px-4 py-2 w-28">Next</button>
                </div>
            </form>
        </Layout>
    )
}

// export default Shipping
export default dynamic(() => Promise.resolve(Shipping), { ssr: false })