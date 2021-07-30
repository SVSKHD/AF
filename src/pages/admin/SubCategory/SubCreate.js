import React ,{ useEffect, useState } from 'react';
import {Card} from "antd"
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import {getCategories} from "../../../components/functions/category"
import {getSubs , createSub , removeSub} from "../../../components/functions/SubCategory"
import NAVB from "../../../components/Layout/NAVB";
import AdminNav from '../../../components/Layout/AdminNAV';
import SearchForm from "../../../components/forms/SearchForm";
import {CloseOutlined , EditOutlined } from "@ant-design/icons"

const SubCreate = (props) => {
    const {user} = useSelector(state=>({...state}))


    const [name , setName] = useState("")
    const [loading , setLoading] = useState(false)
    const [categories , setCategories] = useState("")
    const [category , setCategory] = useState("")
    const [keyword , setkeyword] = useState("")
    const [subs , setSubs] = useState([])


    useEffect(()=>{
       LoadCategories()
       LoadSubCategories()
    },[])

    const LoadCategories = () =>
    getCategories().then((c) => setCategories(c.data));

    const LoadSubCategories = () => getSubs().then((s) => setSubs(s.data));

    const handleSubmit=(e)=>{
        e.preventDefault()
        console.log(name)
        setLoading(true)
        createSub({name, parent:category }, user.token)
        .then(res=>{
        setLoading(false)
        setName("")
        toast.success(`${res.data.name} Succefully created Sub-Category`)
        LoadSubCategories()  
    })
        .catch(err=>{
            console.log(err)
            setLoading(false)
            if(err.response.status === 400) toast.error(err.response.data)
        })
    }

    const handleRemove = async(slug) =>{
        if(window.confirm("Delete ? ")){
            setLoading(true)
            removeSub(slug , user.token)
            .then(res=>{
                setLoading(false)
                toast.error(` ${res.data.name} deleted`)
                LoadSubCategories()
            })
            .catch(err=>{
             if(err.response.status === 400){ 
                setLoading(false)
                toast.error(err.response.data) 
             }
          })
        }
    }

const searched = (keyword) =>(c)=>c.name.toLowerCase().includes(keyword)

    const SubCategoryForm = () =>{
        return(
            <div>
                <form onSubmit={handleSubmit}>
                <label>
                Desired Sub-Category Name
                </label>
                <input
                type="text"
                className="form-control"
                onChange={(e)=>setName(e.target.value)}
                autoFocus
                required
                />
                <br/>
                <button className="btn btn-outline-success">Create Sub-Category</button>
                </form>
            </div>
        )
    }

    return ( 
        <div className="Category">
        <NAVB>
        <br/>
        <div className="container">
        <Card>
        <h1 className="HometextDark">Admin Dashboard</h1>
        <hr/>
            <div className="row">
                <div className="col-md-3">
                  <AdminNav/>
                </div>
                <div className="col-md-9">
                {loading ? (
                <h4 className="text-info">Loading...</h4>
                ):(
                <h2>Create SubCategory</h2>
                )}
                <hr/>
                 
                <div className="row">
                    <div className="col">
                    <div className="form-group">
                            <label>Parent category</label>
                            <select
                            name="category"
                            className="form-control"
                            onChange={(e) => setCategory(e.target.value)}
                            >
                            <option>Please select Category</option>
                            {categories.length > 0 &&
                            categories.map((c) => (
                            <option key={c._id} value={c._id}>
                                {c.name}
                            </option>
                            ))}
                        </select>
                        </div>
                    </div>
                    <div className="col">
                    {SubCategoryForm()}
                    </div>
                </div>
              

               
                <hr/>
                <br className="mb-3"/>
                <SearchForm
                Keyword={keyword}
                setKeyword={setkeyword}
                />
                <hr/>
                <div className="row">
                {subs.filter(searched(keyword)).map((subcategory) => (
                    <div className="col-md-4 mb-1">
                    <div className="card">
                    <div className="card-body">
                    <div class="Cardtitle">
                        {subcategory.name}
                    </div>
                    <hr/>
                    <div class="btn-group btn-group-sm" role="group" aria-label="...">
                       <button onClick={()=>handleRemove(subcategory.slug)} type="button" class="btn btn-raised"><CloseOutlined className="text-danger"/></button>
                       <button type="button" class="btn btn-raised">
                           <Link  to={`/admin/subcategory/${subcategory.slug}`} className="icon">    
                           <EditOutlined className="text-warning"/>
                           </Link>
                       </button>
                    </div>
                    </div>
                    </div>
                    </div>
                ))}
                </div>
                </div>
            </div>
        </Card>
        </div>
        <div>
        
        </div>
        </NAVB>
        </div>  
    );
}

export default SubCreate