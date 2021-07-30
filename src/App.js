import React , {useEffect , lazy , Suspense} from "react"
import  {BrowserRouter as Router , Route , Switch} from "react-router-dom"
import  './App.css';
// firebase
import  {auth} from "./config/firebase"
import  {useDispatch} from 'react-redux'
import  {ToastContainer} from  "react-toastify"
import  {currentUser} from  "./components/functions/auth"
import { LoadingOutlined } from "@ant-design/icons";





// // pages
// const  Home = lazy(()=>import("./pages/Home"
// const  Register = lazy(()=>import('./pages/auth/Register';
// const  Login = lazy(()=>import('./pages/auth/Login';
// const  History = lazy(()=>import("./pages/user/History";
// // private route
// const  UserRoute = lazy(()=>import("./components/Routes/UserRoute"
// const  AdminRoute = lazy(()=>import("./components/Routes/UserRoute";
// // userelements
// const  Password = lazy(()=>import("./pages/user/Password";
// const  WishList = lazy(()=>import("./pages/user/WishList";

// // AdminElements
// const  AdminDashboard = lazy(()=>import("./pages/admin/AdminDashboard";
// const  Category = lazy(()=>import("./pages/admin/category/CategoryCreate";
// const  CategoryUpdate = lazy(()=>import("./pages/admin/category/CategoryUpdate";
// const  SubCreate = lazy(()=>import("./pages/admin/SubCategory/SubCreate";
// const  SubUpdate = lazy(()=>import("./pages/admin/SubCategory/SubUpdate";
// const  ProductCreate = lazy(()=>import("./pages/admin/product/ProductCreate";
// const  AllProduct = lazy(()=>import("./pages/admin/product/AllProduct";
// const  ProdcutUpdate = lazy(()=>import("./pages/admin/product/ProductUpdate";
// const  Product = lazy(()=>import("./pages/Product";
// const  CategoryHome = lazy(()=>import("./pages/category";
// const  SubHome = lazy(()=>import("./pages/Sub";
// const  Shop = lazy(()=>import("./pages/Shop";
// const  Cart = lazy(()=>import("./pages/cart";
// const  ChecKout = lazy(()=>import("./pages/Checkout";
// const  CreateCoupon = lazy(()=>import("./pages/admin/Coupon/CreateCoupon";
// const  Payment = lazy(()=>import("./pages/Payment";

// // cartNav
// const  SideDrawer = lazy(()=>import("./components/Drawer/SideDrawer"

// const  {ToastContainer} = lazy(()=>import("react-toastify"
// const  RegisterComplete = lazy(()=>import('./pages/auth/RegisterComplete';


// pages
const  Home = lazy(()=>import("./pages/Home"))
const  Contact = lazy(()=>import  ("./pages/Contact"))
const  NotFound = lazy(()=>import ("./pages/NotFound"))
const  Register = lazy(()=>import('./pages/auth/Register'))
const  RegisterComplete = lazy(()=>import('./pages/auth/RegisterComplete'));
const  Login = lazy(()=>import('./pages/auth/Login'));
const  ForgotPassword =lazy(()=>import("./pages/auth/ForgotPassword"));
const  History = lazy(()=>import("./pages/user/History"));
const FAQ = lazy(()=>import("./pages/faq"))
// private route
const  UserRoute = lazy(()=>import("./components/Routes/UserRoute"))
const  AdminRoute = lazy(()=>import("./components/Routes/UserRoute"));
// userelements
const  Password = lazy(()=>import("./pages/user/Password"));
const  WishList = lazy(()=>import("./pages/user/WishList"));

// AdminElements
const  AdminDashboard = lazy(()=>import("./pages/admin/AdminDashboard"));
const  Category = lazy(()=>import("./pages/admin/category/CategoryCreate"));
const  CategoryUpdate = lazy(()=>import("./pages/admin/category/CategoryUpdate"));
const  SubCreate = lazy(()=>import("./pages/admin/SubCategory/SubCreate"));
const  SubUpdate = lazy(()=>import("./pages/admin/SubCategory/SubUpdate"));
const  ProductCreate = lazy(()=>import("./pages/admin/product/ProductCreate"));
const  AllProduct = lazy(()=>import("./pages/admin/product/AllProduct"));
const  ProdcutUpdate = lazy(()=>import("./pages/admin/product/ProductUpdate"));
const  Product = lazy(()=>import("./pages/Product"));
const  CategoryHome = lazy(()=>import("./pages/category"));
const  SubHome = lazy(()=>import("./pages/Sub"));
const  Shop = lazy(()=>import("./pages/Shop"));
const  Cart = lazy(()=>import("./pages/cart"));
const  ChecKout = lazy(()=>import("./pages/Checkout"));
const  CreateCoupon = lazy(()=>import("./pages/admin/Coupon/CreateCoupon"));
const  Payment = lazy(()=>import("./pages/Payment"));
const Blogs = lazy(()=>(import("./pages/Blogs")))
// cartNav
const  SideDrawer = lazy(()=>import("./components/Drawer/SideDrawer"))








const Routing =()=> {
  
  const dispatch = useDispatch()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const idTokenResult = await user.getIdTokenResult();
        console.log("user", user);
        // save in DB
        currentUser(idTokenResult.token)
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
      }
    });
    // cleanup
    return () => unsubscribe();
  }, [dispatch]);
  
  return (
    <div className="App">
       <Suspense
       fallback={
         <div className="col text-center p-5 Loader">
           <h1 className="Loaderfont">Aquakart</h1>
           <LoadingOutlined className="text-white " style={{fontSize:"5rem"}}/>
         </div>
       }
       >
       <Router>
         <SideDrawer/>
         <ToastContainer/>
         <Switch>
          {/* Routes */}
         <Route exact path="/" component={Home}/>
         <Route exact path="/register" component={Register}/>
         <Route exact path="/login" component={Login}/>
         <Route exact path="/register/complete" component={RegisterComplete}/>
         <Route exact path="/forgot/password" component={ForgotPassword}/>
         <Route exact path="/shop" component={Shop}/>
         <Route exact path="/cart" component={Cart}/>
         <Route exact path="/checkout" component={ChecKout}/>
         <Route exact path="/payment" component={Payment}/>
         <Route exact path="/contact" component={Contact}/>
         <Route exact path="/Blogs" component={Blogs}/>
         <Route exact path="/faq" component={FAQ}/>
         {/* productroutes */}
         <Route exact path="/product/:slug" component={Product}/>
         {/* Categoryroutes */}
         <Route exact path="/category/:slug" component={CategoryHome}/>
         {/* subcategory */}
         <Route exact path="/subcategory/:slug" component={SubHome}/>

         {/* UserRoutes */}
         <UserRoute exact path="/user/history" component={History}/>
         <UserRoute exact path="/user/password" component={Password}/>
         <UserRoute exact path="/user/wishlist" component={WishList}/>
         {/* Adminroutes */}
         <AdminRoute exact path="/admin/dashboard" component={AdminDashboard}/>
         <AdminRoute exact path="/admin/category" component={Category}/>
         <AdminRoute exact path="/admin/category/:slug" component={CategoryUpdate}/>
         <AdminRoute exact path="/admin/subcategory" component={SubCreate}/>
         <AdminRoute exact path="/admin/subcategory/:slug" component={SubUpdate}/>
         <AdminRoute exact path="/admin/product" component={ProductCreate}/>
         <AdminRoute exact path="/admin/allproducts" component={AllProduct}/>
         <AdminRoute exact path="/admin/product/:slug" component={ProdcutUpdate}/>
         <AdminRoute exact path="/admin/coupon" component={CreateCoupon}/>
         </Switch>

       </Router>
       </Suspense>
    </div>
  );
}

export default Routing;
