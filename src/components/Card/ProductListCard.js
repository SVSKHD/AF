import React from "react";
import { Link } from "react-router-dom";
import priceformatter from 'priceformatter';


const ProductListItems = ({ product }) => {
  const {
    price,
    category,
    subs,
    shipping,
    color,
    brand,
    quantity,
    sold,
  } = product;

  return (
    <div className="card mb-3">
    <ul className="list-group">
      <li className="list-group-item">
        <h5>Price{" "}</h5>
        <span className="label label-default label-pill pull-xs-right">
        <h5 className="text-success">{priceformatter(price)} INR</h5> 
        </span>
      </li>

      {category && (
        <li className="list-group-item">
          <h5>Category{" "} : </h5>
          <Link
            to={`/category/${category.slug}`}
            className="label label-default label-pill pull-xs-right"
          >
         <h5>{category.name}</h5>
          </Link>
        </li>
      )}

      {subs && (
        <li className="list-group-item">
         <h5> Sub Categories : </h5>
          {subs.map((s) => (
            <Link
              key={s._id}
              to={`/subcategory/${s.slug}`}
              className="label label-default label-pill pull-xs-right"
            >
              <h5>{s.name}</h5>
            </Link>
          ))}
        </li>
      )}

      <li className="list-group-item">
        <h5>Shipping{" "}:</h5>
        <span className="label label-default label-pill pull-xs-right">
         <h5>{shipping}</h5>
        </span>
      </li>

      <li className="list-group-item">
        <h5>Color{" "} :</h5>
        <span className="label label-default label-pill pull-xs-right">
          <h5>{color}</h5>
        </span>
      </li>

      <li className="list-group-item">
         <h5> Brand{" "} : </h5>
        <span className="label label-default label-pill pull-xs-right">
          <h5 className="text-info">{brand}</h5>
        </span>
      </li>

      <li className="list-group-item">
        <h5>Available{" "} : </h5>
        <span className="label label-default label-pill pull-xs-right">
          <h5>{quantity && quantity<50 ? ( <h5 className="text-danger">({quantity}) hurry up</h5> ) : (<h5 className="text-info">({quantity}) in Stock </h5>)}</h5>
        </span>
      </li>

    </ul>
    </div>
  );
};

export default ProductListItems;
