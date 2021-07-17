import React from "react"
import {Link} from "react-router-dom"
import {Card} from "antd"

const UserNav = () =>{
return(
    <div>
    <Card className="BOXS">
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/user/history" className="nav-link">History</Link>
            </li>
            <li className="nav-item">
                <Link to="/user/password" className="nav-link">Password</Link>
            </li>
            <li className="nav-item">
                <Link to="/user/wishlist" className="nav-link">Wishlist</Link>
            </li>
        </ul>
    </nav>
   </Card>
   </div>
)
}
export default UserNav