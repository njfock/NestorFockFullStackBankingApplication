/* eslint-disable react-hooks/exhaustive-deps */
import { onAuthStateChanged } from "firebase/auth";

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col, Input, Button } from 'reactstrap';
import TopNav from "../containers/navs/Topnav";
import logo from '../assets/logo/logo-color.png';
import { auth } from "../helper/firebase";
import { setCurrentUser } from "../helper/auth";
const Login = () => {
  let navigate = useNavigate();  
  let location = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit')
    setCurrentUser({email, password})
  }

  const Auth = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        console.log('uid = ',user.uid);
        navigate('/')
      } else {
        console.log('No hay usuario loggeado')
      }
    });
  }
  
  useEffect(() => {
    Auth()
  },[])
  return (
    <>
      <div className="fixed-background" >
      </div>
      <TopNav path={location.pathname}/>

      <div className="container mt-4 " >
        <center className="mt-4">
          <Row>
            <Col className="bg-light border" xs="12" md="6">
            <Card
                color="dark"
                inverse
              >
                <img
                  alt="Sample"
                  src={logo}
                />
              </Card>
            </Col>
            <Col className="bg-light border" xs="12" md="6">
              <Card
                color="dark"
                inverse
                style={{
                  width: '18rem'
                }}
              >
                <CardBody>
                  <CardTitle tag="h2" style={{color: '#FF5733'}} className="mt-3">
                    Login
                    {auth.currentUser}
                  </CardTitle>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <Input name="email" type="text" placeholder='Email' value={email} className="form-control" onChange={ e => setEmail(e.currentTarget.value)}/><br/>
                    <Input name="password" type="password" placeholder='Password' value={password} className="form-control" onChange={ e => setPassword(e.currentTarget.value)}/><br/>
                    <Button type="submit" onClick={handleSubmit}>Login</Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </center>
      </div>
    </>
  )
}

export default Login;