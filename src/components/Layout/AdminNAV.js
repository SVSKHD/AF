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
            <hr/>
            <h5>Blog Section</h5>
            <li className="nav-item">
                <Link to="/admin/blogcategory" className="nav-link">Blog-category</Link>
            </li>
            <li className="nav-item">
                <Link to="/admin/blog" className="nav-link">Blogs</Link>
            </li>
        </ul>
    </nav>
   </Card>
   </div>
)
}
export default AdminNav