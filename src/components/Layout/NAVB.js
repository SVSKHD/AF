import React, { useState } from "react";
import { Menu , Badge } from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  SearchOutlined ,
  ShoppingCartOutlined,
  CarTwoTone,
} from "@ant-design/icons";
import {Link} from "react-router-dom"
import firebase from "firebase"
import {useDispatch , useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import Search from "../forms/Search";

const { SubMenu, Item } = Menu;

const NAVB = () => {
  const [current, setCurrent] = useState("home");
  let dispatch = useDispatch()
  let { user , cart } = useSelector((state) => ({ ...state }));
  let history = useHistory()

  const handleClick = (e) => {
    setCurrent(e.key);
  };
  const Logout = () =>{
    firebase.auth().signOut()
    dispatch({
      type:"LOGOUT",
      payload:null
    })
    history.push("/login")
  }



  return (
    <>
    <Menu 
    theme="dark" 
    onClick={handleClick} 
    selectedKeys={[current]} 
    mode="horizontal"
    >
      
      <Item key="home" icon={<HomeOutlined/>}>
        Home
      <Link to="/"/>
      </Item>
      
      <Item key="shop" icon={<ShoppingOutlined/>}>
        Shop
      <Link to="/shop"/>
      </Item>

      <Item key="Cart" icon={<ShoppingCartOutlined/>}>
        Cart
        <Badge count={cart.length}/>
      <Link to="/cart"/>
      </Item>


      {!user && (
      <Item key="register" icon={<UserAddOutlined />} className="float-right">
        Register
        <Link to="/register"/>
      </Item>
      )} 
       
      {!user &&(
      <Item  align="right" key="login" icon={<UserOutlined />} className="float-right">
        Login
        <Link to="/login"/>
      </Item>
      )} 
      
      {user && (
        <SubMenu
          icon={<SettingOutlined />}
          title={user.email && user.email.split("@")[0]}
          className="float-right"
        >
          {user && user.role === "subscriber" && (
            <Item key="setting:1">
            <Link to="/user/history" > DashBoard </Link>
            </Item>
          )}
          {user && user.role === "admin" && (
            <Item key="setting:1">
            <Link to="/admin/dashboard" > DashBoard </Link>
            </Item>
          )}
          
          <Item icon={<LogoutOutlined />} onClick={Logout}>
            Logout
          </Item>
        </SubMenu>
      )}
      
      <SubMenu
      icon={<SearchOutlined/>}
      title="Search Here"
      >
           <Search/>
      </SubMenu>      
      
    </Menu>
    <br/>
    <div className="container text-center">
    
    </div>
  </>   
  );
};

export default NAVB;
