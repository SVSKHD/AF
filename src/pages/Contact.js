import NAVB from "../components/Layout/NAVB"
import {FaWhatsapp} from "react-icons/fa"
import {Carousel} from "react-responsive-carousel"
// images
import AS from "../images/AS.jpg"
import BS from "../images/BS.jpg"
import ROE from "../images/ROE.jpg"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Seo from "../components/Seo"




const Contact = () =>{
return(
<>
<div>
<NAVB/>
<Seo
title="Aquakart | Contact Form"
description="AquaKart Product Form and you can contact us from here and keep your queries here to get solved out "
keywords="AquaKart Contact us  , Contact Form"
url="https://aquakart.store/contact"
/>
<br/>
<div className="container">

<div className="row">

<div className="col">

<h1 className="HomeDecor">AquaKart</h1>
<h2 className="HomeDecor2">Best Fit to Your Budget</h2> 

</div>
<div className="col">
{/* contactform */}
<hr/>
<h4 className="HomeDecor2">Our Direct Handle</h4>
<hr/>

<a
className="btn btn-raised"
target="_blank"
href="https://api.whatsapp.com/send/?phone=9182119842&text&app_absent=0"
> 
<FaWhatsapp size={30}/>
</a>

</div>

</div>
<hr/>
<h2 className="HomeDecor2">Image Carousel</h2>
<Carousel
showArrows={true}
dynamicHeight={true}
>
<div>
<img src={AS} />
<p className="legend">Auto-Softener</p>
</div>
<div>
<img src={BS} />
<p className="legend">Bathroom Softener</p>
</div>
<div>
<img src={ROE} />
<p className="legend">Kent RO</p>
</div> 
</Carousel>
</div>
</div>
</>
)
}
export default Contact