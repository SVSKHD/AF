import CategoryList from "../category/CategoryList"
import SubList from "../sub/SubList"

const year = new Date().getFullYear() 


const Footer = () =>(
<>
<div className="cardB">
<div className="card Footer">
<div className="card-body ">
<div className="row">

<div className="col-md-4">
<h1 className="HomeDecorF">AquaKart</h1>
<h2 className="HomeDecor2F">Best Fit to Your Budget</h2> 
</div>

<div className="col-md-4">
<br/>
<div className="container">
<div className="card cardF">
<div className="card-body">

<div>
<input
className="form-control"
placeholder="Name"
type="name"
/>
<br/>
<input
className="form-control"
placeholder="Email"
type="email"
/>
<br/>
<input
className="form-control"
placeholder="Description"
type="text-area"
/>
<br/>

<button 
className="btn btn-raised"
>Submit Your Required Product
</button>

</div>

</div>
</div>
</div>
</div>

<div className="col-md-4">
<div>
<SubList/>
<CategoryList/>
</div>
</div>
</div>
<hr/>
<p>AquaKart © {year} </p>
</div>

</div>
</div>
</>
)

export default Footer