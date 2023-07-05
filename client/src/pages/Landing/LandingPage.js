import React, { useEffect } from 'react'
import { useNavigate } from "react-router-dom";
import TokenService from '../../utils/tokenService';
import { useDispatch, useSelector } from "react-redux";
import "./Landing.css"
// TODO : build landing

function LandingPage() {
    const history = useNavigate();
     const userLogin = useSelector((state) => state.userLogin);
     const { userInfo } = userLogin;
   useEffect(()=>{
    if(TokenService.getuserInfo()){
        history("/home")
    }
   },[userInfo])

  return (
    <div className='Hero'>
          <h3 className='Heading'>Get better in English with EZLISH<i class="fa fa-code" aria-hidden="true"></i></h3>
          
        
    </div> 
  );
}

export default LandingPage