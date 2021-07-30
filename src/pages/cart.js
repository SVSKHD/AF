import { useDispatch, useSelector } from "react-redux"
import NAVB from "../components/Layout/NAVB"
import {Card} from "antd"
import {userCart} from "../components/functions/user"
import { Link } from "react-router-dom"
import {ShoppingCartOutlined} from "@ant-design/icons"
import ProductCartCard from "../components/Card/ProductCartCard"

const Cart = ({history}) =>{
const { cart, user } = useSelector((state) => ({ ...state }));
const dispatch = useDispatch();

const getTotal = () =>{
return cart.reduce((currentValue , nextValue)=>{
return currentValue + nextValue.count * nextValue.price
},0)
}

const saveOrderToDb = () => {
// console.log("cart", JSON.stringify(cart, null, 4));
userCart(cart, user.token)
.then((res) => {
console.log("CART POST RES", res);
if (res.data.ok) history.push("/checkout");
})
.catch((err) => console.log("cart save err", err));
};

const saveCashOrderToDb = () => {
// console.log("cart", JSON.stringify(cart, null, 4));
dispatch({
type: "COD",
payload: true,
});
userCart(cart, user.token)
.then((res) => {
console.log("CART POST RES", res);
if (res.data.ok) history.push("/checkout");
})
.catch((err) => console.log("cart save err", err));
};

return(
<>
<div className="CommonD">
<NAVB>
<div className="container">
<Card>
<div className="row">
<div className="col-md-8">

{!cart.length ? (
<h3 className="HometextDark">
No Products in Cart
</h3>
):(
<h3 className="HometextDark">Checkout Section</h3>
)}
<hr/>

{!cart.length ? (
<div className="text-center">
    <button className="btn bt-raised"><ShoppingCartOutlined/> is Empty</button>
</div>
):(
   <>
    {cart.map((p) => (
        <ProductCartCard key={p._id} p={p}/>
    ))} 
  </>
)}
</div>
<div className="col-md-4">

<h2 className="HometextDark">Order Summarary</h2>
<hr/>
{cart.map((c,i)=>(
<div key={i}>
<p className="text-left">
{c.title} * {c.count} = ₹ {c.price * c.count}
</p>
</div>
))}
<hr/>
<h3 className="HometextDark">Total : ₹  {getTotal()}</h3>
<hr/>




{user ? (
<>
<button 
onClick={saveOrderToDb}
disabled={!cart.length} 
className="btn btn-primary">
    Proceed to Checkout
</button>

<button
onClick={saveCashOrderToDb}
className="btn btn-sm btn-warning mt-2"
disabled={!cart.length}
>
Pay Cash on Delivery
</button>
</>
):(
<button className="btn btn-raised">
    <Link 
    to={{
        pathname:"/login",
        state:{from:"cart"}        
    }}
    >
    Login to Checkout
    </Link>
</button>
)}



</div>
</div>
</Card>
</div>
<br className="mb-5"/>
</NAVB>
</div>
</>
)
}
export default Cart

