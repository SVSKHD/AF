import { useEffect, useState } from "react";
import NAVB from "../../../components/Layout/NAVB"
import {Card} from "antd"
import AdminNav from "../../../components/Layout/AdminNAV"
import { useSelector } from "react-redux";
import {createBlogCategory , getBlogCategories , removeBlogCategory} from "../../../components/functions/blogcategory"
import {toast} from "react-toastify"
import {EditOutlined , CloseOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"
import SearchForm from "../../../components/forms/SearchForm";




const Blogcategorycreate = () =>{
const [name , setName] = useState("")
const [loading , setLoading] = useState(false)
const [categories , setCategories] = useState([])
const [keyword , setKeyword] = useState("")

const {user} = useSelector(state=>({...state}))

useEffect(()=>{
LoadBlogCategories()
},[])

const LoadBlogCategories = () =>
getBlogCategories().then((c)=>setCategories(c.data))



const search = (keyword) => (c) => c.name.toLowerCase().includes(keyword)


const handleRemove = async(slug) =>{
if(window.confirm("Delete ? ")){
setLoading(true)
removeBlogCategory(slug , user.token)
.then(res=>{
setLoading(false)
toast.error(` ${res.data.name} deleted`)
LoadBlogCategories()
})
.catch(err=>{
if(err.response.status === 400) toast.error(err.response.data)
})
}
}

const handleSubmit = (e) =>{
e.preventDefault()
setLoading(true)
createBlogCategory({name},user.token)
.then(res=>{
setLoading(false)
setName("")
toast.success(`${res.data.name} Succefully created Blog Category Category`)
})
.catch(err=>{
console.log(err)
if(err.response.status === 400) toast.error(err.response.data)
})
}





return(
<>
<div className="HomeDecor2">
<NAVB>
<br/>
<div>
<div className="container">
<div >
<Card>
<h1>Blog Category Create</h1>
<hr/>
<div className="row">
<div className="col-md-3">
<AdminNav/>
</div>
<div className="col-md-9">
<Card>
<form onSubmit={handleSubmit}>
<label>Create Blog Category</label>

<input
type="text"
className="form-control"
placeholder="Blog Category"
onChange={(e)=>setName(e.target.value)}
autoFocus
required
/>

<br/>

<button
type="submit"
className="btn btn-raised"
>
Create Blog Category
</button>

</form>
</Card>
<hr/>
<br/>

<h3>Blog-Category List</h3>
<hr/>
<SearchForm
Keyword={keyword}
setKeyword={setKeyword}
/>
<hr/>
<br/>
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
<Link  to={`/admin/blogcategory/${category.slug}`} className="icon">    
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
</Card>
</div>
</div>
</div>
</NAVB>
</div>
</>
)
}
export default Blogcategorycreate