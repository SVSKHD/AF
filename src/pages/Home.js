
import React, { useEffect, useState } from 'react';
import NAVB from '../components/Layout/NAVB';
import Typed from "react-typed"
import { getProductbyCount } from '../components/functions/product';
import ProductCard from '../components/Card/ProductCard';
import LoadingCard from '../components/Card/LoadingCard';
import {Pagination} from "antd"
import NewArrivals from '../components/home/NewArrivals';
import CategoryList from "../components/category/CategoryList"
import SubList from "../components/sub/SubList"
import Search from 'antd/lib/transfer/search';
import Seo from '../components/Seo';
import Default from "../images/Default.png"
import  Footer  from '../components/Layout/Footer';
import Purifiers from '../components/home/Purifier';

const Home=(props)=> {
const [products , setProducts] = useState([])
const [loading , setLoading] = useState(false)

useEffect(()=>{
loadAllProducts()
},[])

const loadAllProducts = () =>{
setLoading(true)
getProductbyCount(4).then((res)=>{
setProducts(res.data)
setLoading(false)
})
}

return (
<div className="Hometext">
<NAVB>
<Seo
title="AquaKart | Shop your Home Appliances , Softeners and many more"
description ="Aquakart is all about your basic home need with the best prices and with all flexible options in payments and many more, avail of our services and rest yourself "
keywords="
AquaKart , 
AquaKart Store , 
Shop your Home Appliances
kent Softener products , 
IonExchane Softeners ,  
Online Store ofr softeners and many more, 
Automatic Water Softeners ,
RO Purifiers "
image={Default}
url="https://aquakart.store"
/>
<br className="mb-5"/>
<div className="container-fluid">
<div className="row">

<div className="col-md-6">
<h1 className="HomeDecor">AquaKart</h1>
<h2 className="HomeDecor2">Best Fit to Your Budget</h2> 
</div>

<div className="col-md-6">

</div>
</div>

<br className="mb-4"/>

<hr/>

<div className="container">
<h1 className="HomeDecor2">Latest Products</h1>
<hr/>
{loading ? <LoadingCard count={3}/> : (
<div className="row">
{products.map((product)=>{
return(
<>
<div className="col-md-3">
<ProductCard
product={product}
/>
</div>
</>
)    
})}
</div>
)}

<br/>
<Purifiers/>
<br/>

</div>



<br/>
</div>




<br/>
</NAVB>
</div>
);
}

export default Home;