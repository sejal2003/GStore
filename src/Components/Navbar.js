import React from "react"
import Badge from 'react-bootstrap/Badge';
import {Link, useNavigate} from 'react-router-dom';
import { useCart } from '../Components/ContextReducer';

export default function Navbar(){

    const navigate = useNavigate();
    const handleLogout=()=>{
        localStorage.removeItem('authToken');
        navigate('/login');
    }
    let data = useCart();
    return(
        <nav className="navbar navbar-expand-lg bg-success ">
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
                        {(localStorage.getItem('authToken'))?
                            <li className="nav-item ">
                            <Link className="nav-link text-white fs-5" aria-current="page" to="/myOrder">My Orders</Link>
                            </li>
                        : ""}
                    </ul>
                    {(localStorage.getItem('authToken'))?
                            <div>
                            <Link className="mx-3 text-white" to ="/cart"><i className="bi bi-cart2 fs-3"/>{"   "}
                            <Badge pill bg="danger">
                                {(data.length)? data.length:""}
                            </Badge>
                            </Link>

                            <div className="btn btn-danger mx-2" onClick={handleLogout}>Logout</div>
                            </div>
                        : 
                    <div>
                        <Link className="btn btn-outline-light mx-2" to="/Login">Login</Link>
                        
                        <Link className="btn btn-outline-light mx-2" to="/createuser">SignUp</Link>
                    </div>
                    }
                        
                </div>
            </div>

        </nav>
    )
}