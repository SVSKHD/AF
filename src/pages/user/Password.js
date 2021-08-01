import React, { useState } from 'react';
import {Card} from "antd"
import UserNav from '../../components/Layout/UserNav';
import NAVB from '../../components/Layout/NAVB';
import {auth} from "../../config/firebase"
import {toast} from "react-toastify"
import { useSelector } from 'react-redux';

const Password=(props)=> {
    const [password , setPassword] = useState("")
    const [loading , setLoading] = useState(false)
     
    const {user} = useSelector((state)=>({...state}))


    const handleSubmit = async(e) =>{
    e.preventDefault()
    await auth.currentUser.updatePassword(password)
    .then(()=>{
    toast.success("Password Updated")
    setLoading(true)
    })
    .catch(err=>{
     setLoading(false)
     toast.error(err.message)
    })
    }

    const passwordUpdateForm = () =>(
        <form onSubmit={handleSubmit}>
            <Card>
            <label>Password Update</label>
            <br className="mb-3"/>
            <input type="password" 
            onChange={e=>setPassword(e.target.value)}
            placeholder="Enter your New password"
            className="form-control"
            disabled={loading}
            />
            <br className="mb-3"/>
            <button disabled={!password || password.length<6 || loading} className="btn btn-raised">
                Submit
            </button>
            </Card>
        </form>
    )


    return (
        <div className="CommonD">
        <NAVB>
        <br/>
        <div className="container">
        <Card className="rounded">
        <h2>"{user.name}" Dashboard</h2>
        <hr/>
        <div className="row">
        <div className="col-md-4 col-sm-6">
        
        <UserNav/>
        
        </div>
        <div className="col-md-8 col-sm-6">
           
            <div className="container">
            
            {passwordUpdateForm()}
            </div>
        </div>
        </div>
        </Card>
        </div>
        </NAVB>
        </div>
    );
}

export default Password;