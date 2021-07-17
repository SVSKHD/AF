import React from "react"
import { useSelector } from "react-redux"
import Resizer from "react-image-file-resizer";
import axios from "axios"
import {Avatar , Badge} from "antd"

const FileUploader = ({values , setValues , setLoading}) =>{
const {user} = useSelector((state)=>({...state}))

const fileUploadAndResize = (e) =>{
let files = e.target.files
let allUploadFiles = values.images
if(files){
for (let i = 0 ; i<files.length;i++){
Resizer.imageFileResizer(
files[i],
720,
720,
"JPEG",
100,
0,
(uri)=>{
console.log(uri)
axios.post(`${process.env.REACT_APP_API}/uploadimages`,
{image : uri},
{
headers:{
authtoken: user ? user.token :""
}
}
)
.then(res=>{
console.log("Image upload res data", res)
setLoading(false)
allUploadFiles.push(res.data)
setValues({...values , images:allUploadFiles})
})
.catch(err=>{
setLoading(false)
console.log("Cloudinary upload err",err)
})
},
"base64"
)
}
}
}

const handleImageRemove = (public_id) =>{
setLoading(true)
console.log("remove image" , {public_id})
axios.post(`${process.env.REACT_APP_API}/removeimage`,{public_id},{
    headers:{
        authtoken : user ? user.token : "",
    }
}
).then((res)=>{
setLoading(false)
const {images} = values
let filteredImages = images.filter((item)=>{
    return item.public_id !==public_id
})
setValues({...values , images:filteredImages})
})
.catch((err)=>{
console.log(err)
setLoading(false)
})
}



return(
<div>
<div>
{values.images && values.images.map((image)=>(
<Badge 
count="X" 
key={image.public_id} 
onClick = {()=>handleImageRemove(image.public_id)} 
style={{cursor:"pointer"}}
>
<Avatar  
src={image.url} 
shape="square"
className="ml-3"
size={100}
/>
</Badge>
))}
</div>
<label className="btn btn-raised">
Choose File
<input 
type="file" 
multiple 
hidden
accept="images/*" 
onChange = {fileUploadAndResize}
/>
</label>

</div>
)
}
export default FileUploader