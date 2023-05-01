import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'

export default function Login(){
    const [data, setdata] = useState({
        email:"",
        password:""
    })
    let navigate = useNavigate();
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const response = await fetch("http://localhost:5000/loginuser", {
            method:'POST',
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({email: data.email, password:data.password})
        });
        const json = await response.json()
        console.log(json);
        
        if(!json.success){
            alert("Enter Valid Credentials")
        }
        else{
            localStorage.setItem("userEmail", data.email)
            localStorage.setItem("authToken", json.authToken);
            navigate("/");
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
                <label htmlFor="exampleInputEmail1" className="form-label text-white" >Email address</label>
                <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='email' value= {data.email}onChange={onChange}/>
                <div id="emailHelp" className="form-text text-white">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label text-white" >Password</label>
                <input type="password" className="form-control" id="exampleInputPassword1" name='password' value= {data.password} onChange= {onChange}/>
            </div>
            <button type="submit" className="m-3 btn btn-success">Submit</button>
            <Link to="/createuser" className= 'm-2 btn btn-primary'>Register</Link>
            </form>
        </div>
        </div>
        </>
    )
}