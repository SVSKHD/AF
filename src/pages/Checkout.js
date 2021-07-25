import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import NAVB from "../components/Layout/NAVB"
import {Card ,Input} from "antd"
import {toast} from "react-toastify"
import { 
  getUserCart , 
  emptyUserCart , 
  applyCoupon , 
  saveUserAddress ,
  saveUserPhone ,
  createCashOrderForUser
} from "../components/functions/user"
import ReactQuill from "react-quill"
import { add } from "lodash"


const ChecKout=({history})=>{
const [products , setProducts] = useState([])
const [total , setTotal] = useState(0)
const [address , setAddress] = useState("")
const [phone  , setPhone] = useState("")
const [addressSaved , setAddressSaved] = useState(false)
const [phonesaved , setPhoneSaved] = useState(false)
const [coupon , setCoupon] = useState("")

// discounted price
const [totalAfterDiscount , setTotalAfterDiscount] = useState(0)
const [discountedError , setDiscountError] = useState("")
const {user ,COD } = useSelector((state)=>({...state}))
const couponTrueOrFalse = useSelector((state) => state.coupon);

const dispatch = useDispatch()


useEffect(()=>{
getUserCart(user.token)
.then(res=>{
console.log("User Cart Res")
setProducts(res.data.products)
setTotal(res.data.cartTotal)
})
},[])

const applyDiscountCoupon = () => {
console.log("send coupon to backend", coupon);
applyCoupon(user.token, coupon).then((res) => {
console.log("RES ON COUPON APPLIED", res.data);
if (res.data) {
setTotalAfterDiscount(res.data);
// update redux coupon applied true/false
dispatch({
type: "COUPON_APPLIED",
payload: true,
});
}
// error
if (res.data.err) {
setDiscountError(res.data.err);
// update redux coupon applied true/false
dispatch({
type: "COUPON_APPLIED",
payload: false,
});
}
});
};

const createCashOrder = () => {
createCashOrderForUser(user.token, COD, couponTrueOrFalse).then((res) => {
console.log("USER CASH ORDER CREATED RES ", res);
// empty cart form redux, local Storage, reset coupon, reset COD, redirect
if (res.data.ok) {
// empty local storage
if (typeof window !== "undefined") localStorage.removeItem("cart");
// empty redux cart
dispatch({
type: "ADD_TO_CART",
payload: [],
});
// empty redux coupon
dispatch({
type: "COUPON_APPLIED",
payload: false,
});
// empty redux COD
dispatch({
type: "COD",
payload: false,
});
// mepty cart from backend
emptyUserCart(user.token);
// redirect
setTimeout(() => {
history.push("/user/history");
}, 1000);
}
});
};


const emptyCart = () => {
// remove from local storage
if (typeof window !== "undefined") {
localStorage.removeItem("cart");
}
// remove from redux
dispatch({
type: "ADD_TO_CART",
payload: [],
});
// remove from backend
emptyUserCart(user.token).then((res) => {
setProducts([]);
setTotal(0);
setTotalAfterDiscount(0);
setCoupon("");
toast.success("Cart is empty. Continue shopping.",{
position:"bottom-center",
});
});
};


const showProductSummary = () =>
products.map((p, i) => (
<div key={i}>
<p className="CartQuantity">
{p.product.title} ({p.color}) x {p.count} = ₹ {" "}
{p.product.price * p.count}
</p>
</div>
));

const showAddress = () =>{
return(
<>
<br/>
<input
className="form-control"
placeholder="Place Your Address Here"
onChange={()=>setAddress(address)}
/>
<br/>
<button onClick={saveAddressToDb} className="btn btn-raised">
Save Address
</button>
</>
)
}

const showPhone =(e)=>{
return(
<>
<div>
<br/>
<input
onChange={()=>setPhone(phone)}
type="phone"
maxLength={10}
placeholder="Place Your Phone NO"
className="form-control"
/>
<br/>
<button onClick={SavePhoneToDB} className="btn btn-raised">
Save Phone
</button>
</div>
</>
)
}

const SavePhoneToDB =() =>{
console.log(phone)
saveUserPhone(user.token, phone).then((res)=>{
if(res.data.ok){
setPhoneSaved(true)
toast.success("Phone Saved",{
position:"bottom-center"
})
}
})
}


const saveAddressToDb = () => {
// console.log(address);
saveUserAddress(user.token, address).then((res) => {
if (res.data.ok) {
setAddressSaved(true);
toast.success("Address saved" , {
position:"bottom-center"
});
}
});
};


const showApplyCoupon = () =>(
<>
<input
onChange={(e)=>setCoupon(e.target.value)}
value={coupon}
type="text"
className="form-control"
/>
<br/>
<button onClick={applyDiscountCoupon} className="btn btn-raised">Apply</button>
</>
)



return(
<>
<div className="CommonD">
<NAVB/>
<br/>
<div className="container">
<Card>
<div className="row">
<div className="col-md-8">
<div className="row">
<div className="col">
<h3>Delivery Address</h3>
<hr/>
{showAddress()}
</div>
<div className="col">
<h3>Phone No</h3>
<hr/>
{showPhone()}
</div>
</div>
<hr/>
<h3 className="text-left">Got Coupon ...?</h3>
<hr/>
{showApplyCoupon()}
<hr/>
{discountedError && (<p className="bg-danger text-white p-2">{discountedError}</p>)}
</div>

<div className="col-md-4">
<h3 className="CommonD">
Order Summary
</h3>
<hr/>
{showProductSummary()}
<hr/>

<p className="CartQuantity">Cart Total : ₹ {total} </p>
<hr/>
{totalAfterDiscount > 0 && (
<p className="bg-success text-white p-2">Dsicount Applied : {totalAfterDiscount}</p>
)}
<hr/>
<div class="btn-group" role="group" aria-label="Basic example">
{COD ? (
<button
className="btn btn-primary"
disabled={!addressSaved || !products.length}
onClick={createCashOrder}
>
Place Order
</button>
):(
<button
className="btn btn-primary"
disabled={!addressSaved || !phonesaved || !products.length}
onClick={()=>history.push("/payment")}
>
Place Order
</button>
)}
</div>
<button 
onClick={()=>history.push("/payment")}
disabled={!addressSaved || !phonesaved || !products.length} 
type="button" 
class="btn btn-raised">
Proceed to Checkout
</button>

<br/>

<button 
onClick={emptyCart} 
type="button" 
class="btn btn-danger">
  Empty Cart
</button>


</div>
</div>
</Card>
</div>
</div>
</>
)
}
export default ChecKout