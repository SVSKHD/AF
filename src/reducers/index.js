import {combineReducers} from "redux"
import  {UserReducer}  from "./userReducer"
import {SearchReducer} from "./SearchReducer"
import { CartReducer } from "./CartReducer"
import {CODReducer} from "./CODReducer"
import {CouponReducer} from "./CouponReducer"
import {DrawerReducer} from "./DrawerReducer"

const rootReducer = combineReducers({
    user:UserReducer,
    search:SearchReducer,
    cart:CartReducer,
    COD:CODReducer,
    coupon:CouponReducer,
    drawer:DrawerReducer,
})

export default rootReducer