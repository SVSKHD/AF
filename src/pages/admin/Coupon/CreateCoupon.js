import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Card } from "antd";
import NAVB from "../../../components/Layout/NAVB";
import AdminNav from "../../../components/Layout/AdminNAV"
import {getCoupons , removeCoupon , createCoupon} from "../../../components/functions/coupon"
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker"
import {FaTimesCircle} from "react-icons/fa"

const CreateCoupon = () =>{
const [name , setName] = useState("")
const [expiry , setExpiry] = useState("")
const [discount , setDiscount] = useState("")
const [loading , setLoading] = useState("")
const [coupons , setCoupons] = useState([])


// redux
const {user} = useSelector((state)=>({...state}))

useEffect(()=>{
loadAllCoupons()
},[])

const loadAllCoupons = () => getCoupons().then((res)=>setCoupons(res.data))

const handleSubmit = (e) =>{
e.preventDefault()
setLoading(true)
createCoupon({name , expiry , discount},user.token)
.then((res)=>{
setLoading(false)
loadAllCoupons()
setName("")
setDiscount("")
setExpiry("")
toast.success(`${res.data.name} is created`)
})
}


const handleRemove = (couponId) =>{
if(window.confirm("Delete this Coupon")){
setLoading(true)
removeCoupon(couponId , user.token)
.then((res)=>{
loadAllCoupons()
setLoading(false)
toast.error(`Coupon name: ${res.data.name} deleted`)
})
.catch((err)=>console.log(err))
}
}

return(
<>
<div className="CommonD">
<NAVB/>
<div>
<div className="container">
<Card>
<h2 className="HometextDark">Create Coupon</h2>
<hr/>
<div className="row">
<div className="col-md-4">
<AdminNav/>
</div>
<div className="col-md-8">

<form onSubmit={handleSubmit}>
<div className="form-group">
<label className="text-muted">Name</label>
<input
type="text"
className="form-control"
onChange={(e) => setName(e.target.value)}
value={name}
autoFocus
required
/>
</div>

<div className="form-group">
<label className="text-muted">Discount %</label>
<input
type="text"
className="form-control"
onChange={(e) => setDiscount(e.target.value)}
value={discount}
required
/>
</div>

<div className="form-group">
<label className="text-muted">Expiry</label>
<br />
<DatePicker
className="form-control"
selected={new Date()}
value={expiry}
onChange={(date) => setExpiry(date)}
required
/>
</div>

<button className="btn btn-outline-raised">Save</button>
</form>
{coupons.map((c) => (
<div className="CouponCard" key={c._id}>
<div className="col-md-4">
<div className="card">
<div className="card-body text-left">
<div className="CouponCard">Name : {c.name}</div>
<br/>
<div>Expiry: {new Date(c.expiry).toLocaleDateString()}</div>
<br/>
<div>Discount : {c.discount}%</div>
<br/>
<button onClick={()=>{handleRemove(c._id)}} className="btn btn-raised"><FaTimesCircle/></button>
</div>
</div>
</div>
</div>
))}

</div>
</div>
</Card>
</div>
</div>
</div>
</>
)
}
export default CreateCoupon