import { useEffect, useState } from "react"
import { useHistory } from "react-router-dom"
import {Spin} from "antd"
import NAVB from "../Layout/NAVB"
import {SmileOutlined} from "@ant-design/icons"

const LoadingToRedirect = () => {
    const [count, setCount] = useState(5);
    let history = useHistory();
  
    useEffect(() => {
      const interval = setInterval(() => {
        setCount((currentCount) => --currentCount);
      }, 1000);
      // redirect once count is equal to 0
      count === 0 && history.push("/");
      // cleanup
      return () => clearInterval(interval);
    }, [count , history]);
  
    return (
      <div>
      <NAVB/>
      <br/>
      <div className="container p-5 text-center">
        <h6 className="Hometext"> <Spin indicator={<SmileOutlined/>}></Spin>
            Loading up in {count}
        </h6>
      </div>
      </div>
    );
  };
  
  export default LoadingToRedirect;