import React from 'react'
import {logoutUser} from '../store/slices/userSlicer'
import {useDispatch} from 'react-redux'
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'

import Nav from 'react-bootstrap/Nav';

const LogoutComp = () => {

    const nav = useNavigate()
    const dispatch = useDispatch()

    function handleLogout(){
        dispatch(logoutUser()).then((res) => {
            console.log(res)
            const {success, msg} = res.payload
            if(success){
                Swal.fire({
                    title: 'Success',
                    text: msg,
                    icon: 'success',
                    confirmButtonText: 'Ok'
                }).then(() => {
                    nav('/sign-up')
                })
                
                
            }else{
                Swal.fire({
                    title: 'Error',
                    text: "Something went wrong",
                    icon: 'error',
                    confirmButtonText: 'Ok'
                })
            }
            
        })
    }


  return (
    <Nav.Link  onClick={handleLogout}>Logout</Nav.Link>
  )
}

export default LogoutComp