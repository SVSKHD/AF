import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { getSubs } from "../../components/functions/SubCategory";

const SubList = () => {
const [subs, setSubs] = useState([]);
const [loading, setLoading] = useState(false);

useEffect(() => {
setLoading(true);
getSubs().then((res) => {
setSubs(res.data);
setLoading(false);
});
}, []);

const showSubs = () =>
subs.map((s) => (
<div 
className="col-md-2 badge"
key={s._id}>
<Link  to={`/subcategory/${s.slug}`}>
<p className="SUB">
{s.name}
</p>
<br/>       
</Link>
</div>
));

return (
<div className="container">
<h4 className="Hometext" >related Products</h4>
<hr/>
<div className="row">
{loading ? <h4 className="Category">Loading...</h4> : showSubs()}
</div>
</div>
);
};

export default SubList;
