import {Helmet} from "react-helmet"

const Seo = ({title , description , keywords , image , url}) =>{
return(

<Helmet>
{/* analytics */}
{/* <!-- Global site tag (gtag.js) - Google Analytics --> */}
<script async src="https://www.googletagmanager.com/gtag/js?id=G-N1KFHJYV8P"></script>



<title>{title}</title>
<meta name="title" content={title} />
<meta name="description" content={description} />
<meta name="keywords" content={keywords} />
<meta name="robots" content ="index , follow"/>
<meta name="image" content={image}/>
{/* bot */}
<meta name="googlebot" content = "index , follow"/>
<meta name="yandex-verification" content="" />
{/* link */}
<link rel="canonical" href={url}/>
{/* twitter */}
<meta name="twitter:site" content = "AquaKart"/>
<meta name="twitter:card" content="summary_large_image"/>
<meta name="twitter : title" content={title}/>
<meta name="twitter:description" content={description}/>
<meta name="twitter:image" content={image}/>
{/* verification */}
<meta name="google-site-verification" content="" />
<meta name="yandex-verification" content="57e95579c1776142" />
</Helmet>
)
}
export default Seo