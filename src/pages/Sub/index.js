import React, { useState, useEffect } from "react";
import { getSub } from "../../components/functions/SubCategory";
import ProductCard from "../../components/Card/ProductCard";
import NAVB from "../../components/Layout/NAVB"


const SubHome = ({ match }) => {
  const [sub, setSub] = useState({});
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { slug } = match.params;

  useEffect(() => {
    setLoading(true);
    getSub(slug).then((res) => {
      console.log(JSON.stringify(res.data, null, 4));
      setSub(res.data.sub);
      setProducts(res.data.products);
      setLoading(false);
    });
  }, []);

  return (
    <div className="Hometext">
    <NAVB>
    <div className="container-fluid">
      <div className="row">
      
      </div>
      <div className="container">
     
      
      <div className="col">
          {loading ? (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              Loading...
            </h4>
          ) : (
            <h4 className="text-center p-3 mt-5 mb-5 display-4 jumbotron">
              {products.length} Products in "{sub.name}" sub category
            </h4>
          )}
        </div>
      <div className="card">
      <div className="card-body">
      <div className="row">
        {products.map((p) => (
          <div className="col-md-4 shadow-lg" key={p._id}>
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      </div>
      </div>
    </div>
    </div>
  </NAVB>
  </div>
  );
};

export default SubHome;
