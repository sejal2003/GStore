import React from 'react'
import Navbar from '../Components/Navbar';

import { useCart, useDispatchCart } from '../Components/ContextReducer';
export default function Cart() {
  let data = useCart();
  let dispatch = useDispatchCart();
  if (data.length === 0) {
    return (
      <div>
        <Navbar/>
        <div className='m-5 w-100 text-center fs-3'>The Cart is Empty!</div>
      </div>
    )
  }
  
  const handleCheckOut = async()=>{
    let userEmail = localStorage.getItem("userEmail");
    let response= await fetch("http://localhost:5000/orderData",{
      method : 'POST',
      headers :{
        'Content-Type' : 'application/json'
      },
      body:JSON.stringify({
        order_data:data,
        email:userEmail,
        order_date:new Date().toDateString()
      })
    }
    );
    if(response.status === 200){
      dispatch({type:"DROP"})
    }
  }

  let totalPrice = data.reduce((total, grocery) => total + grocery.price, 0)
  return (

    <div>
      <Navbar/>
      <div className='container m-auto mt-5 table-responsive  table-responsive-sm table-responsive-md' >
        <table className='table table-hover '>
          <thead className=' text-success fs-4'>
            <tr>
              <th scope='col' >#</th>
              <th scope='col' >Name</th>
              <th scope='col' >Description</th>
              <th scope='col' >Quantity</th>
              <th scope='col' >Amount</th>
              <th scope='col' ></th>
            </tr>
          </thead>
          <tbody>
            {data.map((grocery, index) => (
              <tr>
                <th scope='row' >{index + 1}</th>
                <td >{grocery.name}</td>
                <td>{grocery.description}</td>
                <td>{grocery.Qty}</td>
                <td>{grocery.price}</td>
                <td ><button type="button" className="btn p-0"><i className="bi bi-trash" onClick={() => { dispatch({ type: "REMOVE", index: index }) }} /></button> </td>
                </tr>
            ))}
          </tbody>
        </table>
        <div><h1 className='fs-2'>Total Price: {totalPrice}/-</h1></div>
        <div>
          <button className='btn bg-success mt-5 text-white' onClick={handleCheckOut} > Check Out </button>
        </div>
      </div>


    </div>
  )
}