import React, { useEffect, useState } from "react"
import NAVB from "../../components/Layout/NAVB"
import UserNav from "../../components/Layout/UserNav"
import {Card} from "antd"
import { useSelector } from "react-redux"
import { getUserOrders } from "../../components/functions/user"
import ShowPaymentInfo from "../../components/Card/ShowpaymentInfo"
import { PDFDownloadLink } from "@react-pdf/renderer";
import Invoice from "../../components/orders/Invoice"

const History = () =>{
const [orders , setOrders] = useState([])
const {user} = useSelector((state)=>({...state}))

useEffect(()=>{
loadUserOrders()
},[])

const loadUserOrders = () =>getUserOrders(user.token).then(res=>{
console.log(JSON.stringify(res.data , null ,4))
setOrders(res.data)
})



const showOrderInCard = (order) =>(
<>
<div>
{order.products.map((p,i)=>(
<div className="text-left">
<div className="card">
<div className="card-body">


<p>Product - Name : {p.product.title}</p>
<p>Product - Brand : {p.product.brand}</p>
<p>Price Purchased at : {p.product.price}</p>
<p>Product Count : {p.count}</p>
<p>Product-Color : {p.color}</p>
<p>Product-Currency : {p.currency}</p>


</div>
</div>
</div>
))}
</div>
</> 
)

const showDownloadLink = (order) => (
<PDFDownloadLink
document={<Invoice order={order} />}
fileName="AquaInvoice.pdf"
className="btn btn-sm btn-block btn-outline-primary"
>
Download Invoice
</PDFDownloadLink>
);

const showEachOrder = () =>orders.map((order , i)=>(
<div key={i} className="m-5 p-3 card">
<h3>Order Summary</h3>
<hr/>
<div className="row">
<div className="col-md-6">
{showOrderInCard(order)}

</div>
<div className="col-md-6">
<ShowPaymentInfo order={order} />
</div>
</div>
<hr/>
<br/>
<div className="row">
    <div className="col">
        {showDownloadLink(order)}
    </div>
</div>
</div>
))

return(
<div className="CommonD">
<NAVB>

<br className="mb-3"/>
<div className="container">
<Card>
<h1 className="HometextDark">"{user.name}" Dashboard</h1>
<hr/>

<div className="row">
<div className="col-md-4 col-sm-6">

<UserNav/>
<hr/>
</div>
<div className="col-md-8">
<h4 className="">{orders.length ? "Purchased Orders" : "No Purchase orders"}</h4>
<hr/>
{showEachOrder()}
</div>
</div>
</Card>
</div>
</NAVB>
</div>
)
}
export default History