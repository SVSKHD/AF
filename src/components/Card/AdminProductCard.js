import React from "react"
import {Card} from "antd"
import Default from "../../images/Default.png"
import {EditOutlined , DeleteOutlined} from "@ant-design/icons"
import {Link} from "react-router-dom"


const AdminProductCard = ({product , handleRemove}) =>{

    const {Meta} = Card
    const {title , description , images , slug} = product

return(
    <div>
    <Card
    hoverable
    cover={
        <img
          src={images && images.length ? images[0].url : Default}
          style={{ height: "250px", objectFit: "cover" }}
          className="p-1"
        />
    }
    actions={[
    <Link to={`/admin/product/${slug}`}>
    <EditOutlined className="text-info"/> 
    </Link>,
    <DeleteOutlined onClick={()=>{handleRemove(slug)}} 
    className="text-danger"/>]}
    >
        <Meta title={title} description={`${description.substring(0,10)}...`}/>
    </Card>        
    </div>
)
}
export default AdminProductCard

