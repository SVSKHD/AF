import Helmet from "react-helmet"

const BlogSchema = (
    title , 
    subtitle , 
    image , 
    author , 
    topic , 
    description , 
    url,
    datepublished,
    name,
    pros
    ) =>{
return(
<>
<Helmet>
<script type="application/ld+json">

{JSON.stringify({ "@context": "https://schema.org", 
 "@type": "BlogPosting",
 "headline": {title},
 "alternativeHeadline": {subtitle},
 "image": {image},
 "award": "Best article ever written",
 "editor": {author}, 
 "genre": {topic}, 
 "keywords": "seo sales b2b", 
 "wordcount": {description},
 "publisher": "Book Publisher Inc",
 "url": {url},
 "datePublished": {datepublished},
 "dateCreated": "2015-09-20",
 "dateModified": "2015-09-20",
 "description": {description},
 "articleBody": {pros},
   "author": {
    "@type": "Organizarion",
    "name": {name}
  }
 })}
</script>
</Helmet>
</>
)
}
export default BlogSchema