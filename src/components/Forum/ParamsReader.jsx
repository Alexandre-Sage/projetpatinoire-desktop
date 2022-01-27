import React from "react";
import {useParams} from "react-router-dom"

export default function ParamsReader(Component){
    function WrappedComponent(props){
        const params=useParams();
        return <Component params={params} {...props}/>
    }
    return WrappedComponent;
}
