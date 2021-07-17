
const ShowPaymentInfo = ({order})=>{
return(
<>
<div>
    <p>
        <span>OrderId : {order.paymentIntent.id}</span>
        <hr/>
        <span>Amount : {(order.paymentIntent.amount/=100).toLocaleString("en-US",{
            style:"currency",
            currency:"INR"
        })}
        </span>{""}
        <hr/>
        <span>Currency : "INR"</span>{""}
        <hr/>
        <span>method : {order.paymentIntent.payment_method_types[0]} </span>{""}
        <hr/>
        <span>Payment : {order.paymentIntent.status.toUpperCase()}</span>{""}
        <hr/>
        <span>Order on :{""} 
        {new Date(order.paymentIntent.created*1000).toLocaleString()}
        </span>
        <hr/>
        <span>Status : <div className="badge-info">{order.orderStatus}</div></span>
    </p>
</div>
</>
)
}
export default ShowPaymentInfo