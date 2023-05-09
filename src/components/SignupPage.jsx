import React, { useState } from "react";
import {
  MDBContainer,
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Nav } from "react-bootstrap";
import Swal from 'sweetalert2'

import { useDispatch } from "react-redux";
import { registerUser, loginUser } from "../store/slices/userSlicer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import ModalResponseComp from "./ModalResponseComp";

const SignupPage = () => {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { userData ,error, status } = useSelector((state) => state.user);
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  //----------------------------------------------

const [loginForm, setLoginForm] = useState({
  username: "",
  password: "",
});


 //----------------------------------------------

  const handleFormInputChange = (e) => {
    setLoginForm({
      ...loginForm,
      [e.target.name]: e.target.value,
    });
    console.log(loginForm);
  };


  //----------------------------------------------
  const handleInputChange = (e) => {
    setUserFormData({
      ...userFormData,
      [e.target.name]: e.target.value,
    });
    console.log(userFormData);
  };
  //----------------------------------------------

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    let body = {
      username: loginForm.username,
      password: loginForm.password,
    };

    dispatch(loginUser(body))
      .then((response) => {
        // handle success response
        console.log(response);
        if (response.payload.success === true) {
        setModalShow(true);
        setModalTitle("Success");
        setModalBody("Login successful!");
        setModalBtn("Great!");
        Swal.fire({
          title: 'Success',
          text: "Login successful!",
          icon: 'success',
          confirmButtonText: 'Ok'
      }).then(() => {
          nav('/')
      })

        } else {
          setModalShow(true);
          setModalTitle("Error");
          setModalBody("Login unsuccessful!");
          setModalBtn("Try again");
        }
    
      })
      .catch((err) => {
        console.log(err); // handle error response
        const { error } = err.payload || {}; // check if error property exists before destructuring
        setModalShow(true);
        setModalTitle("Error");
        setModalBody(error || "An error occurred."); // fallback to a default message if error is undefined
        setModalBtn("Try again");
      });
  };
  
    //----------------------------------------------

  const [justifyActive, setJustifyActive] = useState("tab1");

  const handleJustifyClick = (value) => {
    if (value === justifyActive) {
      return;
    }

    setJustifyActive(value);
  };

  //----------------------------------------------

  const [modalShow, setModalShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("Modal heading");
  const [modalBody, setModalBody] = useState("");
  const [modalBtn, setModalBtn] = useState("");



  const handleModalClose = () => {
    setModalShow(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    let body = {
      username: userFormData.username,
      email: userFormData.email,
      password: userFormData.password,
    };



    dispatch(registerUser(body))
    .then((response) => {
      // handle success response
      const { msg } = response.payload;
      console.log(response);
        setModalShow(true);
        setModalTitle("Success");
        setModalBody(msg);
        setModalBtn("Great! Go to login page");
      
    })
    .catch((err) => {
      console.log(err); // handle error response
      const { error } = err.payload || {}; // check if error property exists before destructuring
      setModalShow(true);
      setModalTitle("Error");
      setModalBody(error || "An error occurred."); // fallback to a default message if error is undefined
      setModalBtn("Try again");
    });
  };

  //----------------------------------------------

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>{error}</div>;
  }



  return (
    <MDBContainer className="p-3 my-5 d-flex flex-column w-50">
      <MDBTabs
        pills
        justify
        className="mb-3 d-flex flex-row justify-content-between"
      >
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab1")}
            active={justifyActive === "tab1"}
          >
            Login
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink
            onClick={() => handleJustifyClick("tab2")}
            active={justifyActive === "tab2"}
          >
            Register
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>

      <MDBTabsContent>
        <MDBTabsPane show={justifyActive === "tab1"}>
          <div className="text-center mb-3">
            <p>Sign in with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>

          <form onSubmit={handleLoginSubmit}>

          <MDBInput
            wrapperClass="mb-4"
            label="username"
            id="form1"
            type="text"
            name="username"
            onChange={handleFormInputChange}
          />
          <MDBInput
            wrapperClass="mb-4"
            label="Password"
            id="form2"
            type="password"
            name="password"
            onChange={handleFormInputChange}
          />


          <div className="d-flex justify-content-between mx-4 mb-4">
            <MDBCheckbox
              name="flexCheck"
              value=""
              id="flexCheckDefault"
              label="Remember me"
            />
            <a href="!#">Forgot password?</a>
          </div>

          <MDBBtn className="mb-4 w-100">Sign in</MDBBtn>
          <p className="text-center">
            Not a member? <Nav.Link href="/sign-up">Register</Nav.Link>
          </p>
          </form>
        </MDBTabsPane>

        <MDBTabsPane show={justifyActive === "tab2"}>
          <div className="text-center mb-3">
            <p>Sign un with:</p>

            <div
              className="d-flex justify-content-between mx-auto"
              style={{ width: "40%" }}
            >
              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="facebook-f" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="twitter" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="google" size="sm" />
              </MDBBtn>

              <MDBBtn
                tag="a"
                color="none"
                className="m-1"
                style={{ color: "#1266f1" }}
              >
                <MDBIcon fab icon="github" size="sm" />
              </MDBBtn>
            </div>

            <p className="text-center mt-3">or:</p>
          </div>
          <form onSubmit={handleSubmit}>
            <MDBInput
              name="username"
              onChange={handleInputChange}
              wrapperClass="mb-4"
              label="Username"
              id="form1"
              type="text"
            />
            <MDBInput
              name="email"
              onChange={handleInputChange}
              wrapperClass="mb-4"
              label="Email"
              id="form1"
              type="email"
            />
            <MDBInput
              name="password"
              onChange={handleInputChange}
              wrapperClass="mb-4"
              label="Password"
              id="form1"
              type="password"
            />

            <div className="d-flex justify-content-center mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="I have read and agree to the terms"
              />
            </div>

            <MDBBtn className="mb-4 w-100">Sign up</MDBBtn>
          </form>
          <div>
            {modalShow && (
              <ModalResponseComp
                handleModalClose={handleModalClose}
                show={true}
                modalTitle={modalTitle}
                modalBody={modalBody}
                modalBtn={modalBtn}

              />
            )}
          </div>
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>
  );
};
export default SignupPage;
