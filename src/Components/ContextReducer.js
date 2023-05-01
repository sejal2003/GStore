import React, {createContext,useContext, useReducer} from 'react'

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action)=>{
    switch(action.type){
        case "ADD":
            return[...state,{id:action.id, name:action.name, Qty: action.Qty, price:action.price, description:action.description, img:action.img}]
        case "REMOVE":
            let newArr= [...state]
            newArr.splice(action.index, 1)
            return newArr;
        
        case "UPDATE":
            
            let arr = [...state];
            arr.find((grocery, index)=>{
                if(grocery.id === action.id){
                    arr[index] = {...grocery, Qty:parseInt(action.Qty)+ grocery.Qty, price: action.price+grocery.price}
                    
                }
                return arr
            })
            return arr

        case "DROP":
            let empArray = []
            return empArray;
        default:
            console.log("error in Reducer");
    }
}

export const CartProvider = ({children})=>{
    const[state, dispatch] = useReducer(reducer, [])
        return(
            <CartDispatchContext.Provider value = {dispatch}>
                <CartStateContext.Provider value = {state}>
                    {children}
                </CartStateContext.Provider>
            </CartDispatchContext.Provider>
        )
}

export const useCart= ()=>useContext(CartStateContext);
export const useDispatchCart = ()=>useContext(CartDispatchContext);