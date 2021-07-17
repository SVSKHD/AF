import NAVB from "../../../components/Layout/NAVB"
import React, { useEffect, useState } from 'react';
import AdminNav from "../../../components/Layout/AdminNAV";
import {DeleteProduct, getProductbyCount , } from "../../../components/functions/product"
import AdminProductCard from "../../../components/Card/AdminProductCard";
import {Card} from "antd"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";



const AllProduct = () =>{

const { user } = useSelector((state) => ({ ...state }));

const [products , setProducts] = useState([])
const [loading , setLoading] = useState(false)

useEffect(()=>{
getProductbyCount(100)
.then((res)=>{
    setProducts(res.data)
    setLoading(false)
})
.catch(err=>{
    setLoading(false)
    console.log(err)
})
},[])

const loadAllProducts = () => {
    setLoading(true);
    getProductbyCount(100)
      .then((res) => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  };

const handleDelete = (slug) =>{
let answer = window.confirm("Delete ? ")
if(answer){
    DeleteProduct(slug , user.token)
    .then((res)=>{
        loadAllProducts()
        toast.error(`${res.data.title}. is deleted`)
    })
    .catch((err)=>{
     if(err.response.status === 400) toast.error(err.response.data)
     console.log(err)
    })
}
}


return(
<div className="ADMINDASH">
    <NAVB/>
    <br/>
    <div className="container">
    <Card>
    <h1 className="HometextDark">All Products</h1>
    <hr/>
     <div className="row">
         <div className="col-md-4">
          <AdminNav/>
         </div>
         <div className="col-md-8">
         {loading ? <h4 className="text-info">loading ...</h4> : <h4>All Products</h4>}
         <div className="row">

        {products.map((product) => (
        <div className="col-md-4 pb-3" key={product._id}>
        <AdminProductCard
        product={product}
        handleRemove={handleDelete}
        />
        </div>
        ))}
        </div>
         </div>
     </div>
    </Card>
    </div>
</div>
)
}
export default AllProduct
