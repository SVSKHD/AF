import NAVB from "../../../components/Layout/NAVB"
import {Card} from "antd"
import { useEffect, useState } from "react"


const BlogCreate = () =>{


    

const BlogForm = () =>{
return(
<>
<div>
<Card>
<form>

<div>
<label>Title</label>
<input
className="form-control"
autoFocus
required
/>
</div>
<br/>

<div>
<label>Sub-Title</label>
<input
className="form-control"
autoFocus
required
/>
</div>
<br/>

<div>
<label>Keywords</label>
<input
className="form-control"
autoFocus
required
/>
</div>
<br/>

<div>
<label>Description</label>
<input
className="form-control"
autoFocus
required
/>
</div>
<br/>

<div>
<label>Specs</label>
<input
className="form-control"
autoFocus
required
/>
</div>
<br/>

<div>
<label>Price</label>
<input
className="form-control"
type="number"
autoFocus
required
/>
</div>
<br/>

<div>
<label>Suggestions</label>
<input
className="form-control"
autoFocus
required
/>
</div>
<br/>


</form>
</Card>
</div>
</>
)
}





return(
<>
<div className="HomeDecor2">
<NAVB>
<br/>
<div className="container-fluid">
<Card>
<h1>Blog Management</h1>
<hr/>

<div className="row">
<div className="col-md-8">
<h3>Blog Form</h3>
<hr/>
{BlogForm()}
</div>    

<div className="col-md-4">

</div>
</div>

</Card>
</div>
</NAVB>
</div>
</>
)
}
export default BlogCreate