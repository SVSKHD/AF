
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

const Home=(props)=> {
    const [products , setProducts] = useState([])
    const [loading , setLoading] = useState(false)
   
    useEffect(()=>{
    loadAllProducts()
    },[])
    
    const loadAllProducts = () =>{
        setLoading(true)
        getProductbyCount(3).then((res)=>{
            setProducts(res.data)
            setLoading(false)
        })
    }
    
    return (
        <div className="Hometext">
            <NAVB/>
            <Seo
            title="AquaKart | Shop your Home Appliances , Softeners and many more"
            description ="Aquakart is all about you basic needs at best prices and at best services."
            keywords="AquaKart , kent Softener products , IonExchane Softeners , 3M Softeners , Automatic Water Softeners , Water purifiers"
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
                <Typed
                className="Typed"
                strings={["Here you can shop Best products", "Here you can get Best Service", "Here you can get Best offers"]}
                typeSpeed={50}
                backSpeed={50}
                backDelay={1}
                loop
                smartBackspace
                />
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
                 <div className="col-md-4">
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
           <CategoryList/>
           <br/>
           <SubList/>
            </div>


            <br/>
            </div>

            
        </div>
    );
}

export default Home;