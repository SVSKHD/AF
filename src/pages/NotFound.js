import {FaArrowAltCircleLeft} from "react-icons/fa"
import { Link } from "react-router-dom"
import Default from "../images/Default.png"

const NotFound = () =>{
return(
<>
<br/>
<div className="container">
<div>
<div className="card">
<div className="card-body">

<img
className="rounded"
height="200"
width="200"
alt="AquaKart"
src={Default}
/>
<br className="mb-4"/>
<button className="btn btn-raised">
    <Link to="/">
    <FaArrowAltCircleLeft/>
    </Link>
</button>
</div>
</div>
</div>
</div>
</>
)
}
export default NotFound