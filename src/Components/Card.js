import React, { useState } from "react";
import {useCart, useDispatchCart} from './ContextReducer'
export default function Card(props){

    const [Qty, setQty] = useState(1);

    let dispatch = useDispatchCart();
    let data = useCart();
    let finalPrice = Qty*(props.price);    
    const handleAddtoCart = async()=>{
            let grocery= [];
            for(const item of data){
                if(item.id ===props.groceryItems._id){
                    grocery = item;

                    break;
                }
            }
            if(grocery.length !== 0){
                await dispatch({type:"UPDATE", id:props.groceryItems._id, price:finalPrice, Qty:Qty});
                return
            }

                await dispatch({type:"ADD", id:props.groceryItems._id, name:props.groceryItems.name, price:finalPrice,  Qty:Qty, description:props.groceryItems.description, img :props.groceryItems.img});
                
            
            
    }
    return (
        <div className="card mt-3" style={{"width": "18rem", "maxHeight": "500px"}}>
                    <img src={props.groceryItems.img} className="card-img-top" alt="..."  style={{height:120, width:100, alignSelf: "center"}}/>
                    <div className="card-body">
                        <h5 className="card-title">{props.groceryItems.name}</h5>
                        <p className="card-text"style={{ "height": "80px"}}>{props.groceryItems.description}</p>
                        <div className="container">
                            <div className="h-100 fs-5">
                                Total Price: {finalPrice}/-
                            </div>
                            
                            <div className="d-flex justify-content-center">
                                <span className="h-27 my-auto">Qty</span>
                                <select className="m-2 p-2 bg-success rounded text-white" onChange={(e)=>setQty(e.target.value)}>
                                        {Array.from(Array(6), (e,i)=>{
                                            return(
                                                <option key = {i+1} value={i+1}>{i+1}</option>
                                            )
                                        })}
                                </select>
                                <button className="btn btn-success py-2 px-4 m-2" onClick={handleAddtoCart}>Add to Cart</button>
                            </div>
                            
                        </div>
                   </div>
                </div>
    )
}