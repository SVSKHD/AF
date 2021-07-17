import React, { useEffect, useState } from 'react';
import NAVB from '../../components/Layout/NAVB';
import {Card} from "antd"
import AdminNav from '../../components/Layout/AdminNAV';
import {getOrders , changeStatus} from "../../components/functions/admin"
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Order from '../../components/orders/Order';
import { orderBy } from 'lodash';



function AdminDashboard(props) {
const [orders, setOrders] = useState([])
const {user} = useSelector((state)=>({...state}))

useEffect(()=>{
loadOrders()
},[])

const loadOrders = () =>getOrders(user.token).then(res=>{
    console.log(res.data)
    setOrders(res.data)
})

const handleChnage = (orderId , orderStatus) =>{
    changeStatus(orderId , orderStatus , user.token).then(res=>{
        toast.success("Status Updated" ,{
            position:"bottom-center"
        })
        loadOrders()
    })
}


    return (
        <div className="ADMINDASH">
            <NAVB/>
            <br className="mb-3"/>
            <div className="container">
                <Card>
                    <h1 className="HometextDark">Admin Dashboard</h1>
                    <hr/>
                    <div className="card-body">
                    <div className="row">
                    <div className="col-md-3">
                    <AdminNav/>
                    </div>
                    <div className="col-md-9">
                    <Order orders={orders} handleStatusChange={handleChnage}/>
                    </div>
                
                   
                    </div>
                    </div>
                </Card>
            </div>
        </div>

)
}
export default AdminDashboard;