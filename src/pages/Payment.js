import NAVB from "../components/Layout/NAVB"
import {Card} from "antd"
import {loadStripe} from "@stripe/stripe-js"
import {Elements} from "@stripe/react-stripe-js"
import StripePayment from "../components/Stripepayment"

const promise  = loadStripe(process.env.REACT_APP_STRIPE_KEY)



const Payment = () =>{



return(
<>
<div className="CommonD">
<NAVB/>
<br/>
<div className="container">
<Card>
<h3>Payment Section</h3>
<Elements stripe={promise}>
<StripePayment/>
</Elements>
</Card>
</div>
</div>
</>
)
}
export default Payment