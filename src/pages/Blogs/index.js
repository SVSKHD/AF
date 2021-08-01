import NAVB from "../../components/Layout/NAVB"
import {Collapse} from "antd"
import {FaFacebookF , FaLinkedin , FaShareAlt} from "react-icons/fa"
import { useEffect, useState } from "react"



const Blogs = (req,res) =>{
const { Panel } = Collapse;
return(
<div>
<NAVB>
<div className="container">

<div className="card">
<div className="card-body">
<h1>Know More</h1>
<hr/>
<div className="row">
<div className="col">
<Collapse>
<Panel header={<FaShareAlt size={25}/>}>
<a className="btn btn-raised"><FaFacebookF size={25}/></a>
<a className="btn btn-raised"><FaLinkedin size={25} /></a>
</Panel>
</Collapse>
</div>
<div className="col">
</div>
</div>
<hr/>
</div>
</div>

</div>
</NAVB>
</div>
)
}
export default Blogs