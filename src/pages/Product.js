import { useEffect, useState } from "react"
import { getProduct, getRelated, productStar } from "../components/functions/product"
import NAVB from "../components/Layout/NAVB"
import {Card , Tabs , Tooltip} from "antd"
import { HeartOutlined, ReadOutlined, ShoppingCartOutlined  , WhatsAppOutlined} from "@ant-design/icons"
import {Carousel} from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Default from "../images/Default.png"
import _ from "lodash";
import { useSelector  , useDispatch} from "react-redux"
import ProductListItems from "../components/Card/ProductListCard"
import StarRating from "react-star-ratings"
import { toast } from "react-toastify"
import RatingModal from "../components/Modals/RatingModal"
import { ShowAverage } from "../components/functions/Ratings"
import ProductCard from "../components/Card/ProductCard"
import {addToWishlist} from "../components/functions/user"
import {useHistory} from "react-router-dom"
import Seo from "../components/Seo"
import {name} from "../config/firebase"
const {Meta} = Card
const {TabPane} = Tabs


const Product = ({match }) =>{
// state
const [tooltip, setTooltip] = useState("Click to add");
const [product , setProduct] = useState({})
const [related , setRelated] = useState({})
const [star , setStar] = useState(0)
// slug
const {slug} = match.params
// redux
const { user, cart } = useSelector((state) => ({ ...state }));
const dispatch = useDispatch();
const Description =  product.description

const history = useHistory()

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
      
      dispatch({
        type: "SET_VISIBLE",
        payload: unique,
      });

    }
  };

  const handleAddToWishlist = (e) => {
    e.preventDefault();
    addToWishlist(product._id, user.token).then((res) => {
      console.log("ADDED TO WISHLIST", res.data);
      toast.success("Added to wishlist" , {position:"bottom-center"});
      history.push("/user/wishlist");
    });
  };


const onStarClick = (newRating , name) =>{
setStar(newRating)
productStar(name , star,user.token).then(res=>{
    console.log("rating Clicked", res.data)
    loadSingleproduct()
})
.catch(err=>console.log(err))
}
  


const loadSingleproduct = () =>{
getProduct(slug).then((res)=>{
  setProduct(res.data)
  getRelated(res.data._id).then(res=>setRelated(res.data))
})
console.log(related)
}


useEffect(()=>{ 
loadSingleproduct()
},[slug])

useEffect(()=>{
    if (product.ratings && user) {
        let existingRatingObject = product.ratings.find(
          (ele) => ele.postedBy.toString() === user._id.toString()
        );
        existingRatingObject && setStar(existingRatingObject.star); // current user's star
      }
},[])

return(
<div className="ProductCard">
    <Seo
    title={`${product.title} |  ${name}`}
    description={product.description}
    keywords ={`${product.title} , Kent Grand Star RO , Kent Products , AutoMatic Water Softeners , Industria Water Softeners , `}
    image={product.images[0].url}
    />
    <NAVB/>
    <br className="mb-3"/>
    <div className="container"> 
        <Card>
        <div className="row">
            <div className="col-md-5">
                {product.images && product.images.length ? (
                <Carousel showArrows={true} showIndicators={true} autoPlay >
                {product.images && product.images.map((i)=><img src={i.url} key={i.public_id}/>)}
                </Carousel>
                ):(
                <Card cover={<img src={Default} className="mb-3"/>}>
                </Card>
                )} 
                
            
            </div>
            <div className="col-md-7">
            <div className="card mb-2">
            <div className="card-body">
            <h2 className="ProductTitle">{product.title}</h2>
            <hr/>
            {product && product.ratings && product.ratings.length > 0 ? 
            ShowAverage(product) :  "No ratings Yet"}
            </div>
            </div>
            <ProductListItems product={product}/>
            <Card className="mb-3" type="inner" actions={[
            <>
            <a onClick={handleAddToWishlist}>
            <HeartOutlined  style={{fontSize:"2rem"}} className="text-danger"/> 
            <br/>
            Add to WishList
            </a>
            </>
            ,

             <Tooltip title={tooltip}>
             <a onClick={handleAddToCart}>
               <ShoppingCartOutlined style={{fontSize:"2rem"}} className="text-info" /> <br /> Add to
               Cart
             </a>
           </Tooltip>,

            <RatingModal onClick={onStarClick}>
            <StarRating
            name={product._id}
            numberOfStars={5}
            rating={2}
            changeRating={onStarClick}
            isSeletable={true}
            starRatedColor="#002d80"
            />
            </RatingModal>
        ]}>
                <Meta description={product.description}/>
            </Card>
            
            </div>
        </div>

       {/* tab */}
       <Tabs defaultActiveKey="1" type="card">
          <TabPane tab="Description" key="1">
            {Description}
          </TabPane>
          <TabPane tab="Contact Us" key="2">
            <button className="btn btn-raised">
            <WhatsAppOutlined style={{fontSize:"2rem"}} />
            </button>
          </TabPane>
          <TabPane tab="Card Tab 3" key="3">
            Content of card tab 3
          </TabPane>
        </Tabs>
        <br/>
        
        <hr/>
        <h4>Related Products</h4>
        <hr/>
        {related.length > 0 ?  related.map((r)=>(
        <div className="col-md-4">
          <ProductCard product={r}/>
        </div>
        )):"No Related Products"}


       </Card>
       <br/>
    </div>
</div>
)
}
export default Product