import {Card} from "antd"
import { useEffect, useState } from "react";
import AdminNav from '../../../components/Layout/AdminNAV';
import NAVB from "../../../components/Layout/NAVB";
import {createCategory , getCategories , getCategory, removeCategory} from "../../../components/functions/category"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import {CloseOutlined , EditOutlined} from "@ant-design/icons"
import { Link } from "react-router-dom";
import SearchForm from "../../../components/forms/SearchForm";



const Category = () =>{
const [name , setName] = useState("")
const [loading , setLoading] = useState(false)
const [categories , setCategories] = useState([])
const [keyword , setKeyword] = useState("")


useEffect(()=>{
LoadCategories()
},[])

const LoadCategories = () =>
    getCategories().then((c)=>setCategories(c.data))



const {user} = useSelector(state=>({...state}))

const handleRemove = async(slug) =>{
    if(window.confirm("Delete ? ")){
        setLoading(true)
        removeCategory(slug , user.token)
        .then(res=>{
            setLoading(false)
            toast.error(` ${res.data.name} deleted`)
            LoadCategories()
        })
        .catch(err=>{
         if(err.response.status === 400) toast.error(err.response.data)
        })
    }
}

const handleSubmit = (e) =>{
e.preventDefault()
setLoading(true)
createCategory({name},user.token)
.then(res=>{
setLoading(false)
setName("")
toast.success(`${res.data.name} Succefully created Category`)
})
.catch(err=>{
    console.log(err)
    if(err.response.status === 400) toast.error(err.response.data)
})
}



const search = (keyword) => (c) => c.name.toLowerCase().includes(keyword)


const CategoryForm = () =>{
    return(
        <div>
            <form onSubmit={handleSubmit}>
            <label>
                Desired Category Name
            </label>
            <input
            type="text"
            className="form-control"
            onChange={(e)=>setName(e.target.value)}
            autoFocus
            required
            />
            <br/>
            <button className="btn btn-outline-success">Create Category</button>
            </form>
        </div>
    )
}


return(
<div className="Category">
<NAVB/>
<div className="container">
<br className="mb-3"/>
<div>
<Card>
<h1 className="HometextDark">Admin Dashboard</h1>
<hr/>
<div className="card-body">
<div className="row">
<div className="col-md-3">
<AdminNav/>
</div>
<div className="col-md-9">

<br className="mb-3"/>
{loading ? (
<h4 className="text-info">Loading...</h4>
):(
<h2>Create Category</h2>
)}
{CategoryForm()}
<hr/>
<h3>Search Categories</h3>

<SearchForm
Keyword={keyword}
setKeyword={setKeyword}
/>

<hr/>

<h3>Categories List</h3>
<div className="row">
{categories.filter(search(keyword)).map((category)=>(
   <div className="col-md-4 mb-1">
   <div className="card">
   <div className="card-body">
   <div class="Cardtitle">
       {category.name}
   </div>
   <hr/>
   <div class="btn-group btn-group-sm" role="group" aria-label="...">
      <button onClick={()=>handleRemove(category.slug)} type="button" class="btn btn-raised"><CloseOutlined className="text-danger"/></button>
      <button type="button" class="btn btn-raised">
          <Link  to={`/admin/category/${category.slug}`} className="icon">    
          <EditOutlined className="text-warning"/>
          </Link>
      </button>
   </div>
   </div>
   </div>
   </div>
))}
</div>
</div>
</div>
</div>

</Card>
</div>
</div>
</div>
)
}
export default Category