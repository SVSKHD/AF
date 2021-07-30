import React, { useState } from 'react';
import NAVB from '../../components/Layout/NAVB';
import {auth} from "../../config/firebase"
import {toast} from "react-toastify"
import {useDispatch , useSelector} from "react-redux"
import {createOrUpdateUser} from "../../components/functions/auth"
import {Card} from "antd"







function RegisterComplete({history}) {
     
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
     
    let dispatch = useDispatch()
    let {user} = useSelector((state)=>({...state}))

    useState(()=>{
     setEmail(window.localStorage.getItem("emailForRegistration"))
     console.log(window.location.href)
     console.log(window.localStorage.getItem("emailForRegistration"))
    },[user,history])
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        // validation
        if (!email || !password) {
          toast.error("Email and password is required",{
            position:"bottom-center"
          });
          return;
        }
    
        if (password.length < 6) {
          toast.error("Password must be at least 6 characters long",{
            position:"bottom-center"
          });
          return;
        }
    
        try {
          const result = await auth.signInWithEmailLink(
            email,
            window.location.href
          );
          //   console.log("RESULT", result);
          if (result.user.emailVerified) {
            // remove user email fom local storage
            window.localStorage.removeItem("emailForRegistration");
            // get user id token
            let user = auth.currentUser;
            await user.updatePassword(password);
            const idTokenResult = await user.getIdTokenResult();
            // redux store
            console.log("user", user, "idTokenResult", idTokenResult);
    
            createOrUpdateUser(idTokenResult.token)
              .then((res) => {
                dispatch({
                  type: "LOGGED_IN_USER",
                  payload: {
                    name: res.data.name,
                    email: res.data.email,
                    token: idTokenResult.token,
                    role: res.data.role,
                    _id: res.data._id,
                  },
                });
              })
              .catch((err) => console.log(err));
    
            // redirect
            history.push("/");
          }
        } catch (error) {
          console.log(error);
          toast.error(error.message,{position:"bottom-center"});
        }
      };
    
    


    const CompleteRegister = () =>{
        return(
            <form onSubmit={handleSubmit}>
               <input 
               type="email" 
               className="form-control"
               placeholder="Email"
               value={email}               
               disabled
               />
             
               <br className="mb-2"/>

               <input 
               type="password" 
               className="form-control"
               placeholder="password"
               value={password}
               onChange={(e)=>setPassword(e.target.value)}
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
            <NAVB>
            <div className="container p-5">
            <div className="row">
            <div className="col-md-6 offset-md-3">
            <br className="Margin"/>
            <Card>
            <h1 className="Common">Aquakart | Shop The best Products</h1>
            <hr/>
            <h4 className="CommonLoad">Complete your Registeration</h4>
            
            {CompleteRegister()}
            </Card>
            </div>
            </div>
            </div>
            </NAVB>
        </div>
    );
}

export default RegisterComplete;