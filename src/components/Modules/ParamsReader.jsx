import React from "react";
import {useParams, useNavigate} from "react-router-dom";

export default function ParamsReader(Component){
    function WrappedComponent(props){
        const params=useParams();
        const history= useNavigate();
        return <Component params={params} history={history} {...props}/>
    }
    return WrappedComponent;
}
