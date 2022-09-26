import React, {useEffect, useRef} from 'react';
import './Module.InputToken.scss'
import {observer} from "mobx-react";
import Search from '../../State'
import {useState} from "react";
import Login from "../autorize/Login";
import Pass from "../autorize/Pass";

const InputToken = () => {
    const value = useRef()
    const [hide, show] = useState(false)
    useEffect(() => {
        let tokenVK = localStorage.getItem('token')
        if (tokenVK) {
            Search.token = tokenVK
            show(true)
        }
    })

   if(hide===false){
       return (
           <div>
               <Login/>
               <Pass/>
           </div>

       )
   }
};

export default observer(InputToken);