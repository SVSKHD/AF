import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { auth } from "../../config/firebase";
import {Card} from "antd"
import NAVB from "../../components/Layout/NAVB";








const ForgotPassword = ({history}) =>{
const [email , setEmail] = useState("")
const [loading , setLoading] = useState(false)

const {user} = useSelector((state)=>({...state}))

useEffect(()=>{
if(user && user.token)history.push("/")
},[user , history])

const handleSubmit = async (e) =>{
e.preventDefault()
setLoading(true)
const config={
    url:process.env.REACT_APP_FORGOT_REDIRECT_URL,
    handleCodeInApp:true,
};
await auth.sendPasswordResetEmail(email , config)
.then(()=>{
   setEmail("")
   setLoading(false)
   toast.success("Check your Email for Resetting Password",{position:"bottom-center"})
})
.catch((error)=>{
    setLoading(false)
    toast.error(error.message,{position:"bottom-center"})
    console.log(error.message)
})
}

return(
<div>
<NAVB/>
<div className="container col-md-6 offset-md-3 p-5">

<Card>
{loading ? (
    <h4 className="CommonD">Loading</h4>
):(
    <h4 className="CommonDload">Forgot Password</h4>
)}
<form onSubmit={handleSubmit}>

<input
type="email"
value={email}
className="form-control"
onChange={e=>setEmail(e.target.value)}
autoFocus
placeholder="Place Your Registered Email"

/>

<button className="btn btn-raised" disabled={!email}>submit</button>


</form>
</Card>
</div>
</div>
)
}
export default ForgotPassword