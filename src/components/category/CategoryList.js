import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getCategories } from "../functions/category";

const CategoryList = () => {
const [categories, setCategories] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
setLoading(true);
getCategories().then((c) => {
setCategories(c.data);
setLoading(false);
});
}, []);

const showCategories = () =>
categories.map((c) => (
<div
key={c._id}
className="col-md-2 badge"
>
<Link to={`/category/${c.slug}`}>
<p className="SUB">
{c.name}
</p>
</Link>
<hr/>
</div>
));

return (
<div className="container">
<h3 className="Hometext" >Recently Added Products</h3>
<hr/>
<div className="row">
{loading ? (
<h4 className="text-center">Loading...</h4>
) : (
showCategories()
)}
</div>
</div>
);
};

export default CategoryList;
