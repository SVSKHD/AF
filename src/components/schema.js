import Helmet from "react-helmet"


const Schema = ({name , brand , category , description , image1 ,rating , location}) =>{
return(
<Helmet>
<script type="application/ld+json">
  {JSON.stringify({
    "@context": "https://schema.org/",
    "@type": "Product",
    "name": {name},
    "brand":{brand},
    "category":{category},
    "image": [
     image1
    ],
    "author": {
      "@type": "Organization",
      "name": `AquaKart | Best Shopping Cart`
    },
    "datePublished": "2020-09-01",
    "description": `${description}`,
    "keywords": `Kent Water Softeners , ${name} , Water Softeners , Bathroom water Softeners`,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": {rating},
      "ratingCount": {}
    }
  })}
  </script>
</Helmet>
)
}
export default Schema