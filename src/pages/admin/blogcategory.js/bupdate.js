import NAVB from "../../../components/Layout/NAVB"
import {Card} from "antd"
import AdminNav from "../../../components/Layout/AdminNAV"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { updateBlogCategory , getBlogCategory} from "../../../components/functions/blogcategory"
import {toast} from "react-toastify"
import {useParams} from "react-router-dom"

const BlogUpdate = ({history , match}) =>{
const {user} = useSelector((state)=>({...state}))

let slug = useParams()

const [name , setName] = useState("")
const [loading , setLoading] = useState(false)

const LoadBlogCategories = () =>
getBlogCategory(match.params.slug).then((category)=>setName(category.data.name))




useEffect(()=>{
LoadBlogCategories()
},[])


const handleSubmit = (e) =>{
e.preventDefault()
setLoading(true)
updateBlogCategory(match.params.slug, {name},user.token)
.then(res=>{
setLoading(false)
setName("")
toast.success(`${res.data.name} Succefully Updated Blog-Category`)
history.push("/admin/blogcategory")
})
.catch(err=>{
console.log(err)
if(err.response.status === 400) toast.error(err.response.data)
})
}

const UpdateCategoryForm = () =>{
return(
<div>
<Card>
<form onSubmit={handleSubmit}>
<label>
Update the Category
</label>
<input
type="text"
className="form-control"
onChange={(e)=>setName(e.target.value)}
autoFocus
value={name}
required
/>
<br/>
<button className="btn btn-outline-success">Update Blog Category</button>
</form>
</Card>
</div>
)
}





return(
<>
<div className="HometextDark">
<NAVB>
<br/>
<div>
<div className="container">
<div >
<Card>
<h1>Blog Category Update</h1>
<hr/>
<div className="row">
<div className="col-md-3">
<AdminNav/>
</div>
<div className="col-md-9">
{UpdateCategoryForm()}
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
export default BlogUpdate