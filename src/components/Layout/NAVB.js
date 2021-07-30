import React, { useState } from "react";
import { Menu , Badge  , Layout , Breadcrumb} from "antd";
import {
  HomeOutlined,
  AppstoreOutlined,
  MailOutlined,
  SettingOutlined,
  UserOutlined,
  UserAddOutlined,
  LogoutOutlined,
  ShoppingOutlined,
  SearchOutlined ,
  ShoppingCartOutlined,
  CarTwoTone,
  ReadOutlined,
  BookOutlined
} from "@ant-design/icons";
import {Link} from "react-router-dom"
import firebase from "firebase"
import {useDispatch , useSelector} from "react-redux"
import {useHistory} from "react-router-dom"
import Search from "../forms/Search";
import Default from "../../images/Default.png"
import Footer from "../Layout/Footer"

const { SubMenu, Item } = Menu;
const {Header} = Layout

const NAVB = (props) => {
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
    
    <Header>
    
    
    <Menu 
    style={{textAlign:"center"}}
    theme="dark" 
    onClick={handleClick} 
    selectedKeys={[current]} 
    mode="horizontal"
    >
      <Item className="text-left">
      <a href="/">
      <img
      src={Default}
      alt="Aquakart LOGO"
      className="logo"
      />
      </a>
      </Item>
      
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

      <Item key="Cart" icon={<MailOutlined/>}>
        Contact
      <Link to="/contact"/>
      </Item>  

      <Item key="Cart" icon={<ReadOutlined/>}>
        Know More
      <Link to="/Blogs"/>
      </Item>  

      <Item key="Cart" icon={<BookOutlined/>}>
       FAQ
      <Link to="/faq"/>
      </Item>  
      
    </Menu>
    
    </Header>
    <br/>
    
    
   
   
    {props.children}
    <br className="mb-5"/>
    <Footer/>
    <br/>
  </>   
  );
};

export default NAVB;
