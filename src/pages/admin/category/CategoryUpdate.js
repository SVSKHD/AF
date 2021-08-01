import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import NAVB from "../../../components/Layout/NAVB"
import {Card} from "antd"
import AdminNav from "../../../components/Layout/AdminNAV"
import { getCategory, updateCategory } from "../../../components/functions/category"
import { toast } from "react-toastify"
import { useParams } from "react-router-dom"



const CategoryUpdate = ({history , match}) =>{
const {user} = useSelector((state)=>({...state}))

const [name , setName] = useState("")
const [loading , setLoading] = useState(false)

let slug = useParams()

useEffect(()=>{
LoadCategories()
},[])

const LoadCategories = () =>
getCategory(match.params.slug).then((category)=>setName(category.data.name))




const handleSubmit = (e) =>{
e.preventDefault()
setLoading(true)
updateCategory(match.params.slug, {name},user.token)
.then(res=>{
setLoading(false)
setName("")
toast.success(`${res.data.name} Succefully Updated Category`)
history.push("/admin/category")
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
        <button className="btn btn-outline-success">Update Category</button>
        </form>
    </div>
)
}



return(
<div>
<NAVB>
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
</div>
</div>

</Card>
</div>
</NAVB>
</div>
)
}
export default CategoryUpdate