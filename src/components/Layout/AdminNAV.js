import React from "react"
import {Link} from "react-router-dom"
import {Card} from "antd"

const AdminNav = () =>{
return(
    <div>
    <Card className="BOXS">
    <nav>
        <ul className="nav flex-column">
            <li className="nav-item">
                <Link to="/admin/allproducts" className="nav-link">All Products</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/password" className="nav-link">Password</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/category" className="nav-link">Categories</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/subcategory" className="nav-link">SubCategories</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/product" className="nav-link">Products</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/coupon" className="nav-link">Coupons</Link>
            </li>
        </ul>
    </nav>
   </Card>
   </div>
)
}
export default AdminNav