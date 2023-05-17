import React, {useState} from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import checkToken from "../utils/checkToken";
import { Form, Button, Alert, Col, Row, Container } from "react-bootstrap";

import {updateUser} from "../store/slices/userSlicer"
import Swal from 'sweetalert2'

const UpdateUserFormPage = () => {


    const dispatch = useDispatch();
    const userId = localStorage.getItem("user_id");

    const status = useSelector((state) => state.user.status);
    
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
        repeatPassword: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {

      console.log("submit")
        e.preventDefault();
        if (checkPassoword()) {
        const userData = {
            username: formData.username,
            email: formData.email,
            password: formData.password,
            user_id: userId,
        };

        dispatch(updateUser(userData));
      } else {
        Swal.fire({
          title: "Error!",
          text: "Passwords do not match.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    };

    const checkPassoword = ()=>{
      if(formData.password !== formData.repeatPassword){
        return false
      }
      return true
    }


    console.log(formData)
    console.log(status)

    if (!checkToken()) {
      // window.location.href = "/sign-up";
      return <div>
          <Alert key="warning" variant="warning">
              You need to be logged in to view this page.
          </Alert>
      </div>
  }

  if (status === "succeeded") {
    Swal.fire({
      title: "Success!",
      text: "Your profile has been updated.",
      icon: "success",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = `/profile-dp/${userId}`;
      }
    });
  }

  if (status === "failed") {
    Swal.fire({
      title: "Error!",
      text: "Something went wrong.",
      icon: "error",
      confirmButtonText: "OK",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/profile";
      }
    });
  }




  return (
    <div>
       <Container>
       
      <Row className="mt-5">
      
        <Col></Col>
        <Col xs={6}>
        <h1>Update profile</h1>
        <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Username</Form.Label>
        <Form.Control onChange={handleChange} name="username" type="text" placeholder="Jul" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Email address</Form.Label>
        <Form.Control  onChange={handleChange} name="email" type="email" placeholder="name@example.com" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Password</Form.Label>
        <Form.Control  onChange={handleChange} name="password" type="password" placeholder="1234" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
        <Form.Label>Repeat password</Form.Label>
        <Form.Control  onChange={handleChange} name="repeatPassword" type="password" placeholder="1234" />
      </Form.Group>
      <Button variant="primary" type="submit">
        Update
      </Button>
    </Form>
        </Col>
        <Col></Col>
      </Row>

    </Container>
       
    </div>
  )
}

export default UpdateUserFormPage