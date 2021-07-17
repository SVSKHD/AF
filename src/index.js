import React from 'react';
import ReactDOM from 'react-dom';
import "react-toastify/dist/ReactToastify.css"
import 'react-quill/dist/quill.snow.css';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';

import Routing from './App';
import 'antd/dist/antd.css'

import {createStore} from "redux"
import {Provider} from "react-redux"
import {composeWithDevTools} from "redux-devtools-extension"
import  rootReducer  from './reducers';

const store = createStore(rootReducer, composeWithDevTools())



ReactDOM.render(
<Provider store={store}>
<Routing/>
</Provider>
,document.getElementById('root'));


