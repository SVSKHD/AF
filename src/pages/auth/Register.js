import React, { useState , useEffect } from 'react';
import NAVB from '../../components/Layout/NAVB';
import {auth} from "../../config/firebase"
import {toast} from "react-toastify"
import {useSelector} from "react-redux"
import {Card} from "antd"

function Register({history}) {
     
    const [email , setEmail] = useState("")

    const {user} = useSelector((state)=>({...state}))

    useEffect(()=>{
    if(user && user.token)history.push("/")
    },[user , history])


    const handleSubmit = async (e) =>{
    e.preventDefault()
    const config={
        url:process.env.REACT_APP_REGISTER_REDIRECT_URL,
        handleCodeInApp:true,
    };
    await auth.sendSignInLinkToEmail(email , config)
    toast.success(`Email is sent to ${email}.Click link to complete registration`,{
        position:"bottom-center"
    })
    window.localStorage.setItem("emailForRegistration" , email)
    setEmail("")
    }


    const RegisterForm = () =>{
        return(
            <form onSubmit={handleSubmit}>
               <input 
               type="email" 
               className="form-control"
               placeholder="Email"
               value={email}
               onChange={(e)=>setEmail(e.target.value)}
               />
               <br className="mb-3"/>
               <button type="submit" className="btn btn-raised">
                   Register with Email
               </button>
            </form>
        )
    }

    return (
        <div>
            <NAVB/>
            <div className="container p-5">
            <div className="row">
            <div className="col-md-6 offset-md-3">
            <br className="Margin"/>
            <Card>
            <h1 className="Common">Aquakart | Shop Your Products</h1>
            <br className="mb-3"/>
            <h4 className="CommonLoad">Register Here</h4>
            {RegisterForm()}
            </Card>
            </div>
            </div>
            </div>
        </div>
    );
}

export default Register;