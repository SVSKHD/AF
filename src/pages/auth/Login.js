import React, { useEffect, useState } from 'react';
import NAVB from '../../components/Layout/NAVB';
import {auth , googleAuthProvider} from "../../config/firebase"
import {Card} from "antd"
import {toast} from "react-toastify"
import {Button} from "antd"
import {LoginOutlined , GoogleOutlined} from "@ant-design/icons"
import {useDispatch , useSelector} from "react-redux"
import {Link} from "react-router-dom"
import {createOrUpdateUser} from "../../components/functions/auth"










function Login({history}) {

    const [email , setEmail] = useState()
    const [password , setPassword] = useState()
    const [loading , setLoading] = useState(false)


    const { user } = useSelector((state) => ({ ...state }));

  useEffect(() => {
    let intended = history.location.state;
    if (intended) {
      return;
    } else {
      if (user && user.token) history.push("/");
    }
  }, [user, history]);

  let dispatch = useDispatch();

  const roleBasedRedirect = (res) => {
    // check if intended
    let intended = history.location.state;
    if (intended) {
      history.push(intended.from);
    } else {
      if (res.data.role === "admin") {
        history.push("/admin/dashboard");
      } else {
        history.push("/user/history");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // console.table(email, password);
    try {
      const result = await auth.signInWithEmailAndPassword(email, password);
      // console.log(result);
      const { user } = result;
      const idTokenResult = await user.getIdTokenResult();

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
          roleBasedRedirect(res);
        })
        .catch((err) => console.log(err));

      // history.push("/");
    } catch (error) {
      console.log(error);
      toast.error(error.message,{position:"bottom-center"});
      setLoading(false);
    }
  };

  const googleLogin = async () => {
    auth
      .signInWithPopup(googleAuthProvider)
      .then(async (result) => {
        const { user } = result;
        const idTokenResult = await user.getIdTokenResult();
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
            roleBasedRedirect(res);
          })
          .catch((err) => console.log(err));
        // history.push("/");
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.message,{
          position:"bottom-center"
        });
      });
  };

    const LoginForm = () =>{
        return(
            <div>
            <form onSubmit={handleSubmit}>
               
            <input 
            type="email" 
            className="form-control"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            autoFocus
            />

           <br className="mb-3"/>

            <input 
            type="password" 
            className="form-control"
            placeholder="Your Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            autoFocus
            />


         <br className="mb-3"/>
            
            <Button
            onClick={handleSubmit}
            icon={<LoginOutlined/>}
            shape="round"
            size="large"
            block
            type="primary"
            disabled={!email || password.length < 6}
            >
            Login
            </Button>


         </form>
        </div>  
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
            <h1 className="Common">Aquakart | Shop The best Products</h1>
            <hr/>
            {loading ?  (<h4 className="CommonLoad">Loading....</h4>) : (<h4 className="CommonR">Login</h4>)}
           
            {LoginForm()}

            <Button
            onClick={googleLogin}
            icon={<GoogleOutlined/>}
            shape="round"
            size="large"
            block
            type="danger"
            >
            Login with Google
            </Button>

            <br className="mb-3"/>
            <hr/>
            <Button
            
            shape="round"
            size="large"
            className="float-right"
            type="danger"
            >
            <Link to="/forgot/password">
             <p className="link" >Forgot Password</p>
            </Link>
            </Button>

            </Card>
            </div>
            </div>
            </div>
        </div>
    );
}

export default Login;