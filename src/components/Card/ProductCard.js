import { ShoppingCartOutlined , EyeOutlined } from "@ant-design/icons"
import {Card , Skeleton , Switch , Tooltip} from "antd"
import { Link } from "react-router-dom"
import Default from "../../images/Default.png"
import { ShowAverage } from "../../components/functions/Ratings"
import { useDispatch, useSelector } from "react-redux"
import _ from "lodash"
import { useState } from "react"

const {Meta} = Card

const ProductCard = ({product}) =>{
const [tooltip , setTooltip] = useState("Click to Add")
const {user , cart} = useSelector((state)=>({...state}))
const {title, description, images, slug ,price , quantity} = product

const dispatch = useDispatch()


const handleAddToCart = () => {
    // create cart array
    let cart = [];
    if (typeof window !== "undefined") {
      // if cart is in local storage GET it
      if (localStorage.getItem("cart")) {
        cart = JSON.parse(localStorage.getItem("cart"));
      }
      // push new product to cart
      cart.push({
        ...product,
        count: 1,
      });
      // remove duplicates
      let unique = _.uniqWith(cart, _.isEqual);
      // save to local storage
      // console.log('unique', unique)
      localStorage.setItem("cart", JSON.stringify(unique));
      // show tooltip
      setTooltip("Added");

      // add to reeux state
      dispatch({
        type: "ADD_TO_CART",
        payload: unique,
      });
      // show cart items in side drawer
      dispatch({
        type: "SET_VISIBLE",
        payload: true,
      });
    }
  };



return(
<div className="ProductCard mb-2">

<Card
hoverable
className="ProductRound"
type="inner"
cover={
<img
src={images && images.length ? images[0].url : Default}
style={{ height: "250px", objectFit: "cover" }}
/>
}
actions={[
<Link to={`/product/${slug}`}>
<EyeOutlined className="text-info" /> <br/> View product
</Link>,
<>
<Tooltip title={tooltip}>
<a onClick={handleAddToCart} disabled={quantity<1} 
>
<ShoppingCartOutlined
className="text-danger"
/>
<br/>
{quantity<1?"Out of Stock" : "Add To Cart"}

</a>
</Tooltip>
</>
]}
>
{product && product.ratings && product.ratings.length > 0 ? 
ShowAverage(product) :  "No ratings Yet"}
<Meta
title={title}
description={`${description.substring(0,18)}...`}
/>
<p className="ProductPrice">₹ {price}</p>
</Card>

</div>
)
}
export default ProductCard