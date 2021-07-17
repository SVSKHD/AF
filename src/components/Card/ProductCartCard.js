import ModalImage from "react-modal-image"
import Default from "../../images/Default.png"
import {Button} from "antd"
import { useDispatch } from "react-redux"
import {toast} from "react-toastify"
import {CloseCircleFilled} from "@ant-design/icons"
import {FaCheckCircle , FaTimesCircle} from "react-icons/fa"

const ProductCartCard = ({p}) =>{
const colors = ["Black", "Brown", "Silver", "White", "Blue"];
const dispatch = useDispatch()

const handleColorChange = (e) => {
console.log("color changed", e.target.value);

let cart = [];
if (typeof window !== "undefined") {
if (localStorage.getItem("cart")) {
cart = JSON.parse(localStorage.getItem("cart"));
}

cart.map((product, i) => {
if (product._id === p._id) {
cart[i].color = e.target.value;
}
});

//  console.log('cart udpate color', cart)
localStorage.setItem("cart", JSON.stringify(cart));
dispatch({
type: "ADD_TO_CART",
payload: cart,
});
}
};

const handleQuantityChange = (e) => {
// console.log("available quantity", p.quantity);
let count = e.target.value < 1 ? 1 : e.target.value;

if (count > p.quantity) {
toast.error(`Max available quantity: ${p.quantity}`);
return;
}

let cart = [];

if (typeof window !== "undefined") {
if (localStorage.getItem("cart")) {
cart = JSON.parse(localStorage.getItem("cart"));
}

cart.map((product, i) => {
if (product._id == p._id) {
cart[i].count = count;
}
});

localStorage.setItem("cart", JSON.stringify(cart));
dispatch({
type: "ADD_TO_CART",
payload: cart,
});
}
};

const handleRemove = () => {
// console.log(p._id, "to remove");
let cart = [];

if (typeof window !== "undefined") {
if (localStorage.getItem("cart")) {
cart = JSON.parse(localStorage.getItem("cart"));
}
// [1,2,3,4,5]
cart.map((product, i) => {
if (product._id === p._id) {
cart.splice(i, 1);
}
});

localStorage.setItem("cart", JSON.stringify(cart));
dispatch({
type: "ADD_TO_CART",
payload: cart,
});
}
};



return(
<>
<div className="mb-2">
<div className="card">
<div className="card-body">
<div className="row">
<div className="col-md-4">
<div>
{p.images.length ? (
<ModalImage small={p.images[0].url} large={p.images[0].url} />
) : (
<ModalImage small={Default} large={Default} />
)}
</div>
</div>

<div className="col-md-8">
<div className="text-left">
<h5>Name : {p.title}</h5>
<h6>Price : ₹ {p.price}</h6>
<h6>Brand : {p.brand}</h6>

<div className="row">
<div className="col-md-4">
<h5>Color : </h5>
</div>
<div className="col-md-8">
<select 
onChange={handleColorChange} 
name="color"
placeholder="Choose the Color"
className="form-control">
{p.color ? (
<option value={p.color}>{p.color}</option>
) : (
<option>Select</option>
)}
{colors
.filter((c) => c !== p.color)
.map((c) => (
<option key={c} value={c}>
{c}
</option>
))}
</select>
</div>
</div>


<hr/>


<div className="row">
<div className="col-md-4">
<h5>Quantity : </h5>
</div>
<div className="col-md-8">
<input
type="number"
className="form-control"
value={p.count}
onChange={handleQuantityChange}
/>
</div>
</div>

<hr/>

<div className="row">
<div className="col-md-4">
<h5>Shipping : </h5>
</div>
<div className="col-md-8">
{p.shipping === "Yes" ? (
<FaCheckCircle className="text-success" size={25} />
) : (
<FaTimesCircle className="text-danger" size={25}/>
)}
</div>
</div>

<hr/>

<Button
shape="round"
onClick={handleRemove}
type="dashed"
size="large"
block
danger
icon={<CloseCircleFilled/>}
>Remove From Cart</Button>





</div>
</div>
</div>
</div>
</div>
</div>
</>
)
}
export default ProductCartCard