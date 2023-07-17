import { createContext, useReducer } from "react";

export const CartContext = createContext()

const initalState = {
    cart: { cartItems: [] }
}

function reducer(state, action){
     switch(action.type){
        case 'ADD_ITEMS': {
            const newItem = action.payload

            const existingItem = state.catr.cartItems.find((item) => item.slug === newItem.slug)

            const cartItems = existingItem 
            ? state.cart.cartItems.map(
                (item) => item.title === existingItem.title 
                    ?   newItem 
                    :   item
                )
            : [...state.cart.cartItems, newItem]
            
            return {...state, cart: {...state.cart, cartItems}}
        }

        default : return state 
     }
}

export function CartContextProvider({children}){

    const [state, dispatch] = useReducer(reducer, initalState)

    const value = { state, dispatch }

    return <CartContext.Provider value={value}>{ children }</CartContext.Provider>
}
