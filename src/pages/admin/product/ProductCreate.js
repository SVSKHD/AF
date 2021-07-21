import React, { useState, useEffect } from "react";
import {Card} from "antd"
import AdminNav from "../../../components/Layout/AdminNAV";
import NAVB from "../../../components/Layout/NAVB"
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
import {getCategories , getCategorySubs} from "../../../components/functions/category"
import { CreateProduct } from "../../../components/functions/product";
import ProductForm from "../../../components/forms/ProductForm";
import FileUploader from "../../../components/forms/FileUpload";
import { LoadingOutlined } from "@ant-design/icons";

const initialState = {
  title: "",
  subtitle:"",
  description: "",
  price: "",
  categories: [],
  category: "",
  subs: [],
  shipping: "",
  quantity: "",
  images: [],
  colors: ["Black", "Brown", "Silver", "White", "Blue"],
  brands: ["Kent", "3M", "Grundfos", "IonExchange"],
  color: "",
  brand: "",
};

const ProductCreate = () => {
  const [values, setValues] = useState(initialState);
  const [subOptions, setSubOptions] = useState([]);
  const [showSub, setShowSub] = useState(false);
  const [loading , setLoading] = useState(false)
  // redux
  const { user } = useSelector((state) => ({ ...state }));

  useEffect(()=>{
    LoadCategories()
  },[])

  const LoadCategories = () =>{
    getCategories().then((c)=>setValues({...values , categories:c.data}))
  }
 

  const handleSubmit = (e) => {
    e.preventDefault();
    CreateProduct(values, user.token)
      .then((res) => {
        console.log(res);
        toast.success(`${res.data.title} Product name Created`)
      })
      .catch((err) => {
        console.log(err);
        // if (err.response.status === 400) toast.error(err.response.data);
        toast.error(err.response.data.error)
      });
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
    // console.log(e.target.name, " ----- ", e.target.value);
  };

  const handleCatagoryChange = (e) => {
    e.preventDefault();
    console.log("CLICKED CATEGORY", e.target.value);
    setValues({ ...values, subs: [], category: e.target.value });
    getCategorySubs(e.target.value).then((res) => {
      console.log("SUB OPTIONS ON CATGORY CLICK", res);
      setSubOptions(res.data);
    });
    setShowSub(true);
  };

  return (
    <div>
    <NAVB/>
    <br/>
    <div className="Category">
    <div className="container">
      <Card>
      <h1 className="HometextDark">Admin Dashboard</h1>
      <hr/>
      <div className="row">
        <div className="col-md-3">
          <AdminNav />
        </div>

        <div className="col-md-9">
          <Card>
         
          
         
          {loading ? (
           <LoadingOutlined className="text-danger h1"/>
          ):(
            <h4>Product create</h4>
          )}
           
           <br/>

          <FileUploader 
          values={values}
          setValues={setValues}
          setLoading={setLoading}
          />

          <br/>
          <ProductForm
          values={values}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          setValues={setValues}
          handleCategoryChange={handleCatagoryChange}
          subOptions={subOptions}
          showSub={showSub}

          />
        
          </Card>
        </div>
       
      </div>
    </Card>
    </div>
    </div>
    </div>
  );
};

export default ProductCreate;
