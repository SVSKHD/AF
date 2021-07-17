import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import NAVB from "../../../components/Layout/NAVB"
import {Card} from "antd"
import AdminNav from "../../../components/Layout/AdminNAV"
import { getCategories } from "../../../components/functions/category"
import { getSub , updateSub } from "../../../components/functions/SubCategory"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"
import CategoryForm from "../../../components/forms/CategoryForm"


const SubUpdate = ({history , match}) =>{
const {user} = useSelector((state)=>({...state}))

const [name , setName] = useState("")
const [loading , setLoading] = useState(false)
const [categories , setCategories] = useState([])
const [parent , setParent] = useState("")


let slug = useParams()
useEffect(()=>{
LoadCategories()
LoadSubCategories()
},[])

const LoadCategories = () =>
getCategories().then((c)=>setCategories(c.data))

const LoadSubCategories = () =>
getSub(match.params.slug).then((category)=>{
    setName(category.data.name)
    setParent(category.data.parent)
})



const handleSubmit = (e) =>{
e.preventDefault()
setLoading(true)
updateSub(match.params.slug, {name},user.token)
.then(res=>{
setLoading(false)
setName("")
toast.success(`${res.data.name} Succefully Updated Category`)
history.push("/admin/subcategory")
LoadSubCategories()
})
.catch(err=>{
    console.log(err)
    if(err.response.status === 400) toast.error(err.response.data)
})
}

const UpdateCategoryForm = () =>{
return(
    <div>
        <form onSubmit={handleSubmit}>
        <label>
            Update the Sub-Category
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
        <button className="btn btn-outline-success">Update Sub-Category</button>
        </form>
    </div>
)
}



return(
<div>
<NAVB/>
<br/>
<div className="container">
<Card>
<h2 className="HometextDark">Category Update</h2>
<hr/>
<div className="row">
<div className="col-md-3">
<AdminNav/>
</div>
<div className="col-md-9">
{UpdateCategoryForm()}
<hr/>


<div className="form-group">
<label>Parent category</label>
<select
name="category"
className="form-control"
onChange={(e) => setParent(e.target.value)}
>
<option>Please select Category</option>
{categories.length > 0 &&
categories.map((c) => (
<option key={c._id} value={c._id} selected={c._id === parent}>
{c.name}
</option>
))}
</select>
</div>
</div>
<div className="col-md-6">



</div>


</div>

</Card>
</div>
</div>
)
}
export default SubUpdate