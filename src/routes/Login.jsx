
import React, { useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col, Input, Button } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';

import TopNav from "../containers/navs/Topnav";
import logo from '../assets/logo/logo-color.png';

import { getCurrentUser, setCurrentUser, getUsers, setLog } from "../helper/auth";
const Login = () => {
  let navigate = useNavigate();  
  let location = useLocation();
  let auth = getCurrentUser();
  let users = getUsers();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [alert_email, setAlertEmail] = React.useState('');
  const [alert_password, setAlertPassword] = React.useState('');
  async function handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit')
    let register = await validateEmail(email);
    if(register.x){
      console.log('register.password', register.x)
      if (register.x === password){
        setLog({email: email, action:'Successful login', date: Date.now()})
        setCurrentUser({...register})
        navigate("/");
      }
      else {
        setLog({email: email, action:'Password error', date: Date.now()})
        setAlertPassword('Password error')
      }
    }
    else {
      setLog({email: email, action:'Email error', date: Date.now()})
      setAlertEmail('Email error')
    }
  }
    async function validateEmail (field) {
      let flag = {};
      if(field) {
        if(users.length> 0 ){
          await users.map(async (item) => {
            if(field === item.email) {
              flag = item;
            }
          })
        }
      }
      return flag;
    }
    console.log('getUsers', users)
  return (
    <>
      <div className="fixed-background" >
      </div>
      <TopNav path={location.pathname}/>

      <div className="container mt-4 " >
        <center className="mt-4">

          <Row>
            <Col className="bg-light border">
            </Col>
            <Col className="bg-light border">
            <Card
                color="dark"
                inverse
                style={{
                  width: '18rem'
                }}
              >
                <img
                  alt="Sample"
                  src={logo}
                />
              </Card>
            </Col>
            <Col className="bg-light border">
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
                  </CardTitle>
                  <form onSubmit={handleSubmit} className="mt-4">
                    <Input name="email" type="text" placeholder='Email' value={email} className="form-control" onChange={ e => setEmail(e.currentTarget.value)}/>
                    <p style={{color: '#FF5733'}}>{alert_email}</p>
                    <Input name="password" type="password" placeholder='Password' value={password} className="form-control" onChange={ e => setPassword(e.currentTarget.value)}/>
                    <p style={{color: '#FF5733'}}>{alert_password}</p>
                    <Button type="submit" onClick={handleSubmit}>Login</Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
            <Col className="bg-light border">
            </Col>
          </Row>
        </center>
      </div>
    </>
  )
}

export default Login;