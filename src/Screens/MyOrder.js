import React from 'react'
import {useState, useEffect} from 'react'
import Navbar from '../Components/Navbar'

export default function MyOrder(){
         const [orderData, setorderData] = useState({})

const fetchMyOrder = async () => {
    await fetch("http://localhost:5000/myOrderData", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body:JSON.stringify({
            email:localStorage.getItem('userEmail')
        })
    }).then(async (res) => {
        let response = await res.json()
        await setorderData(response)
    })



    // await res.map((data)=>{
    //    console.log(data)
    // })


}

useEffect(() => {
    fetchMyOrder()
}, [])

return (
    <div>
        <div>
            <Navbar />
        </div>

        <div className='container'>
            <div className='row'>

                {orderData !== {} ? Array(orderData).map(data => {
                    return (
                        data.orderData ?
                            data.orderData.order_data.slice(0).reverse().map((item) => {
                                return (
                                    item.map((arrayData) => {
                                        return (
                                            <>
                                                {arrayData.Order_date ? <div className='m-auto mt-5'>

                                                    {data = arrayData.Order_date}
                                                    <hr />
                                                </div> :

                                                    <div className='col-12 col-md-6 col-lg-3' >
                                                        <div className="card mt-3" style={{"width": "18rem", "maxHeight": "500px"}}>
                                                            <img src={arrayData.img} className="card-img-top" alt="..." style={{ height: "190px", objectFit: "fill" }} />
                                                            <div className="card-body">
                                                                <h5 className="card-title">{arrayData.name}</h5>
                                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                                    <span className='m-1'>Qty: {arrayData.Qty}</span>
                                                                    <div className=' d-inline h-100 w-20 fs-5' style={{"marginLeft":"9rem"}}>
                                                                        ₹{arrayData.price}/-
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>

                                                    </div>



                                                }
                                            </>
                                        )
                                    })

                                )
                            }) : ""
                    )
                }) : ""}
            </div>


        </div>
    </div>
        
    )
}
