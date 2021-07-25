import {Collapse} from "antd"
import NAVB from "../components/Layout/NAVB"


const {Panel} = Collapse


const Faq = () =>{
return(
<>
<div className="Hometext">
<NAVB/>
<br/>
<div className="container">
<div className="card">
<div className="card-body">
<h1>FAQ (frequently asked questions)</h1>
<hr/>
<div className="row">
<div className="col">
<h3>Installation Details</h3>
<hr/>
<Collapse>
<Panel header="Installation Time">
<p>Might take 2 days from Delivery date , if emergency installation needed then please 
   contact us <a href="/contact">Contact here</a> 
</p>
</Panel>
<Panel header="Does Installation cost you extra other than price">
<p>No default installation process will not cost you any thing unless you go for extra plumbing works</p>
</Panel>
<Panel header="Auto-Softener Installation..?">
<p>Auto-Softener plumbing material and plumbing charges will be charged and installation and commissioning will be free by company Technician</p>
</Panel>
<Panel header="Why plumbing charges and plumbing material..?">
<p>Auto-Softener is attached to whole home any wrong connections might effect in supply of water , 
so expericned plumbers are required to finish the connections , they are charged for that. 
</p>
</Panel>
<Panel header="Auto Softener Plumbing Charges and Plumbing Material charges..?">
<p>Plumbing Charges for the Auto Softener is 1500/- and for any filters additional will be 800/- ,
Plumbing material is variable in nature and changes from place to place.    
</p>
</Panel>
<Panel header="If you are confused or want to see real time Installations">
<a href="/" className="btn btn-raised">real time installations</a>
</Panel>
</Collapse>
</div>
<div className="col">
<h3>Installation Details</h3>
<hr/>
</div>

</div>
</div>
</div>
</div>
</div>
</>
)
}
export default Faq