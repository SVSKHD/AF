
import React, { useState, useEffect } from "react";
import ProductCard from "../Card/ProductCard";
import {getCategory} from "../functions/category"


const Purifiers = (props) =>{

const [loading , setLoading] = useState(false)
const [products , setProducts] = useState([])
const [category , setCategory] = useState({})

useEffect(()=>{
loadProducts()
},[])

const loadProducts = () =>{
    setLoading(true)
    getCategory("ro-purifiers").then((res) => {
        setProducts(res.data.products);
        setLoading(false);
        });
}


return(
<>
<div>
<hr/>
<h3 className="text-white">RO-Purifiers</h3>
<hr/>
<div className="row">
{products.map((p) => (
<div className="col-md-4" key={p._id}>
<ProductCard product={p} />
</div>
))}
</div>
</div>
</>
)
}
export default Purifiers