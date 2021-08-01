import React, { useEffect, useState } from 'react';
import {Card} from "antd"
import UserNav from '../../components/Layout/UserNav';
import NAVB from '../../components/Layout/NAVB';
import {useSelector } from 'react-redux';
import { getWishlist, removeWishlist } from '../../components/functions/user';
import { Link } from 'react-router-dom';
import {FaTimesCircle} from "react-icons/fa"




const WishList = (props)=> {
    const [wishlist, setWishlist] = useState([]);
    const { user } = useSelector((state) => ({ ...state }));
  
    useEffect(() => {
      loadWishlist();
    }, []);
  
    const loadWishlist = () =>
      getWishlist(user.token).then((res) => {
        // console.log(res);
        setWishlist(res.data.wishlist);
      });
  
    const handleRemove = (productId) =>
      removeWishlist(productId, user.token).then((res) => {
        loadWishlist();
      });


    
    return (
        <div className="CommonD">
        <div>
        <NAVB>
        <br/>
        <div className="container">
        <Card className="rounded">
        <h2 className="HometextDark">"{user.name}" Dashboard</h2>
        <hr/>
        <div className="row">
        <div className="col-md-4 col-sm-6">
        
        <UserNav/>
        <hr/>
        </div>
        <div className="col-md-8 col-sm-6">
        <h3>See your Wish List</h3>
        <hr/>

        {wishlist.map((p) => (
            <div key={p._id} className="alert alert-secondary">
              <Link to={`/product/${p.slug}`}>{p.title}</Link>
              <span
                onClick={() => handleRemove(p._id)}
                className="btn btn-sm float-right"
              >
                <FaTimesCircle className="text-danger" />
              </span>
            </div>
          ))}

        </div>
        </div>
        </Card>
        </div>
        </NAVB>
        </div>
        </div>
    );
}

export default WishList;