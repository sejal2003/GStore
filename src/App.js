import Home from './Screens/Home';
import Login from './Screens/Login';
import Signup from './Screens/Signup';
import Cart from './Screens/Cart';
import MyOrder from './Screens/MyOrder';
import './App.css';
import{
  BrowserRouter as Router,
  Routes,
  Route

} from "react-router-dom"
import { CartProvider } from './Components/ContextReducer';


function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path = "/" element = {<Home/>} />
            <Route exact path = "/login" element = {<Login/>} />
            <Route exact path = "/createuser" element = {<Signup/>} />
            <Route exact path = "/cart" element  = {<Cart/>}/>
            <Route exact path = "/myOrder" element  = {<MyOrder/>}/>
          </Routes>
        </div>
      </Router>
    </CartProvider>
    
    
  );
}

export default App;
