import React, {useEffect, useState} from "react";
import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import Card from "../Components/Card";
export default function Home(){

    const [search, setsearch] = useState("");
    const [itemCat, setitemCat] = useState([]);
    const[groceryitem, setgroceryitem] = useState([]);

    const loadData = async()=>{
        let response = await fetch("http://localhost:5000/groceryData",{
            method:"POST",
            headers:{
                'Content-Type' : 'application/json'
            }
        });
        response = await response.json();
        setgroceryitem(response[0]);
        setitemCat(response[1]);
        // console.log(response[0], response[1]);
    }

    useEffect(()=>{
        loadData()
    },[])

    return(
        <>
            <div><Navbar/></div>
            <div>
                <div id="carouselExampleControls" className="carousel slide" data-ride="carousel" style={{objectFit : "contain"}}>
                    <div className="carousel-inner" style={{maxHeight: "500px"}}>
                        <div className="carousel-caption" style={{zIndex:"10"}}>
                            <div className="input-group">
                                <input type="search" className="form-control rounded" placeholder="Search" aria-label="Search" aria-describedby="search-addon" value={search} onChange={(e)=>setsearch(e.target.value)}/>
                            </div>
                        </div>

                        <div className="carousel-item active">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?snacks" style={{filter: "brightness(30%)"}} alt="First slide"/>
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?grocery" style={{filter: "brightness(30%)"}} alt="Second slide"/>
                        </div>
                        <div className="carousel-item">
                        <img className="d-block w-100" src="https://source.unsplash.com/random/900x700/?colddrink" style={{filter: "brightness(30%)"}} alt="Third slide"/>
                        </div>
                    </div>
                    <button className="carousel-control-prev" data-bs-target="#carouselExampleControls" type = "button" data-bs-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" data-bs-target="#carouselExampleControls" type="button" data-bs-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>
            </div>
            <div className="container">
                {
                   itemCat !== [] 
                   ? itemCat.map((data)=>{
                        return(
                            <div className="row mb-3">
                                <div key={data._id} className="fs-3 m-3">{data.CategoryName}</div>
                                <hr/>
                                {
                                groceryitem !== [] 
                                ? groceryitem.filter((item)=>(item.CategoryName === data.CategoryName) && item.description.toLowerCase().includes(search.toLowerCase())).map(filterItems=>{
                                    return(
                                        <div key = {filterItems.id} className="col-12 col-md-6 col-lg-3"
                                        >
                                            <Card groceryItems = {filterItems}
                                                price = {filterItems.price}
                                            ></Card>
                                        </div>
                                    )
                                })
                                : <div>No such Data Found</div>
                                }
                            </div>
                            

                        )
                   })
                   :""
                }
            </div>
            <div><Footer/></div>
        </>
        

    )
}