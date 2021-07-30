import { useEffect, useState } from "react"
import {Card} from "antd"
import NAVB from "../../../components/Layout/NAVB"
import AdminNav from "../../../components/Layout/AdminNAV";
import { useSelector } from "react-redux";
import { getProduct , updateProduct } from "../../../components/functions/product";
import { getCategories, getCategorySubs } from "../../../components/functions/category";
import ProductUpdateForm from "../../../components/forms/ProductUpdateForm";
import FileUploader from "../../../components/forms/FileUpload";
import { toast } from "react-toastify";
import {LoadingOutlined} from "@ant-design/icons"



const initialState = {
    title: "",
    description: "",
    price: "",
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



const ProdcutUpdate = ({match , history}) =>{
  const [values, setValues] = useState(initialState);
  const [categories, setCategories] = useState([]);
  const [subOptions, setSubOptions] = useState([]);
  const [arrayOfSubs, setArrayOfSubs] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [loading, setLoading] = useState(false);
    // redux
    const { user } = useSelector((state) => ({ ...state }));

    const {slug} = match.params

    useEffect(()=>{
      loadProduct()
      loadCategories()
      },[])

      const loadProduct = () => {
        getProduct(slug).then((p) => {
          // console.log("single product", p);
          // 1 load single proudct
          setValues({ ...values, ...p.data });
          // 2 load single product category subs
          getCategorySubs(p.data.category._id).then((res) => {
            setSubOptions(res.data); // on first load, show default subs
          });
          // 3 prepare array of sub ids to show as default sub values in antd Select
          let arr = [];
          p.data.subs.map((s) => {
            arr.push(s._id);
          });
          console.log("ARR", arr);
          setArrayOfSubs((prev) => arr); // required for ant design select to work
        });
      };

      const loadCategories = () =>
      getCategories().then((c) => {
        console.log("GET CATEGORIES IN UPDATE PRODUCT", c.data);
        setCategories(c.data);
      });


  

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
  
      values.subs = arrayOfSubs;
      values.category = selectedCategory ? selectedCategory : values.category;
  
      updateProduct(slug, values, user.token)
        .then((res) => {
          setLoading(false);
          toast.success(`"${res.data.title}" is updated`);
          history.push("/admin/allproducts");
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.response.data.err);
        });
    };
    const handleChange = (e) => {
      setValues({ ...values, [e.target.name]: e.target.value });
      // console.log(e.target.name, " ----- ", e.target.value);
    };

    const handleCategoryChange = (e) => {
      e.preventDefault();
      console.log("CLICKED CATEGORY", e.target.value);
      setValues({ ...values, subs: [] });
  
      setSelectedCategory(e.target.value);
  
      getCategorySubs(e.target.value).then((res) => {
        console.log("SUB OPTIONS ON CATGORY CLICK", res);
        setSubOptions(res.data);
      });
  
      console.log("EXISTING CATEGORY values.category", values.category);
  
      // if user clicks back to the original category
      // show its sub categories in default
      if (values.category._id === e.target.value) {
        loadProduct();
      }
      // clear old sub category ids
      setArrayOfSubs([]);
    };
  
return(
<div className="HometextDark">
    <NAVB>
    <br className="mb-4"/>
    <div className="container">
    <Card>
    <h1 className="HometextDark">Update Product</h1>
    <hr/>
    <div className="row">
        <div className="col-md-3">
        <AdminNav/>
        </div>
        <div className="col-md-9">
        
        {loading ? (
            <LoadingOutlined className="text-danger h1" />
          ) : (
            <h4>Product update</h4>
        )}

        <br/>


        <FileUploader 
          values={values}
          setValues={setValues}
          setLoading={setLoading}
          />

      
        <ProductUpdateForm
             handleSubmit={handleSubmit}
             handleChange={handleChange}
             setValues={setValues}
             values={values}
             handleCategoryChange={handleCategoryChange}
             categories={categories}
             subOptions={subOptions}
             arrayOfSubs={arrayOfSubs}
             setArrayOfSubs={setArrayOfSubs}
             selectedCategory={selectedCategory}
        />
        </div>
    </div>
    </Card>
    </div>
    </NAVB>
</div>
)
}
export default ProdcutUpdate