import React, {useState} from 'react';
import {Link} from 'react-router-dom';

export default function Signup(){
    const [data, setdata] = useState({
        name:"",
        email:"",
        password:"",
        geolocation:""
    })
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/createuser", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({name:data.name, email: data.email, password:data.password, location: data.geolocation})
        });
        const json = await response.json()
        console.log(json);
        
        if(!json.success){
            alert("Enter Valid Credentials")
        }
    }
    const onChange= (event)=>{
        setdata({...data,[event.target.name]:event.target.value})
    }
    return(
        <>
        <div  style={{"background-color": "black", "height":"100vh"}}>
        <nav className="navbar navbar-expand-lg bg-success mb-3">
            <div className="container-fluid ">
                <Link className="navbar-brand fs-1 fst-italic text-white" to="/">GStore</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item ">
                        <Link className="nav-link active text-white fs-5" aria-current="page" to="/">Home</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
            <div className='container'>
            <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label text-white"  >Name</label>
                <input type="text" className="form-control" name='name' value= {data.name} onChange={onChange}/>
            </div>    
            <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label text-white" >Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value= {data.email}onChange={onChange}/>
                <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-white" >Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value= {data.password} onChange= {onChange}/>
            </div>
            <div className="mb-3">
                <label htmlFor="location" className="form-label text-white" >Address</label>
                <input type="text" className="form-control" id="location" name='geolocation' value= {data.geolocation} onChange= {onChange}/>
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/login" className= 'm-2 btn btn-primary'>Already a user</Link>
            </form>
            </div>
        </div>
        </>
    )
}