
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import { useLocation, useNavigate } from "react-router-dom";
import { Card, CardBody, CardTitle, Row, Col, Input, Button } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import TopNav from "../containers/navs/Topnav";
import { auth } from "../helper/firebase";
import logo from '../assets/logo/logo-black.png';

import { setNewUser, setLog } from "../helper/auth";
const CreateAccount = () => {
  let navigate = useNavigate();  
  let location = useLocation();
  const [show, setShow] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [alert_name, setAlertName] = useState('');
  const [alert_email, setAlertEmail] = useState('');
  const [alert_password, setAlertPassword] = useState('');
  const [alert_confirm, setAlertConfirm] = useState('');
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
  function handleSubmit(event) {
    event.preventDefault();
    }
    function validate(field, label, setStatus) {
      if(!field) {
        setStatus('Error: '+label +' is empty')
        return false;
      }
      setStatus('')
      return true;
    }

    function validatePassword(field, confirm, setStatus) {
      if(confirm !== field) {
        setStatus('Error: Passwords do not match')
        return false;
      }
      if(confirm.length) {
        if(confirm.length<8) {
          setStatus('Error: Password must have more than 8 characters')
          return false;
        }
      }
      return true;
    }
    function validatePasswordLength(field, setStatus) {
      if(field.length) {
        if(field.length<8) {
          setStatus('Error: Password must have more than 8 characters')
          return false;
        }
      }
      return true;
    }
  


    const handleCreate = async () => {
      let flag = 0;
      if (!validate(name, 'Name', setAlertName)) flag = flag + 1;
      if (!validate(email, 'Email', setAlertEmail)) flag = flag + 1;
      if (!validate(password, 'Password', setAlertPassword)) flag = flag + 1;
      if (!validate(confirm, 'Confirm pasword', setAlertConfirm)) flag = flag + 1;
      if (!validatePassword(password, confirm, setAlertConfirm)) flag = flag + 1;
      if (!validatePasswordLength(password, setAlertPassword)) flag = flag + 1;
      
      if (flag === 0){
        setShow(false)
        setLog({email: email, action:'Create user', date: Date.now()})
        setNewUser({email: email, name: name, password: password, balance: 0})
        NotificationManager.success('Successfully Created Account', 'Logging in...');
      }
    }
  
    const clearForm = () => {
      setName('');
      setEmail('');
      setPassword('');
      setConfirm('');
      setShow(true);
    }
  return (
    <>
      <div className="fixed-background" >
      </div>
      <TopNav path={location.pathname}/>

      <div className="container mt-4 " >
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
              >
                <CardBody>
                  <CardTitle tag="h2" style={{color: '#FF5733'}} className="mt-3">
                    Create Account
                  </CardTitle>
                  <hr/>
                  {show?
                  <form onSubmit={handleSubmit} className="mt-4 text-end">
                    <Input name="name" type="text" placeholder='Name' value={name} className="form-control" onChange={ e => setName(e.currentTarget.value)}/>
                    <p style={{color: '#FF5733'}}>{alert_name}</p>
                    <Input name="email" type="text" placeholder='Email' value={email} className="form-control" onChange={ e => setEmail(e.currentTarget.value)}/>
                    <p style={{color: '#FF5733'}}>{alert_email}</p>
                    <Input name="password" type="password" placeholder='Password' value={password} className="form-control" onChange={ e => setPassword(e.currentTarget.value)}/>
                    <p style={{color: '#FF5733'}}>{alert_password}</p>
                    <Input name="confirm" type="password" placeholder='Confirm password' value={confirm} className="form-control" onChange={ e => setConfirm(e.currentTarget.value)}/>
                    <p style={{color: '#FF5733'}}>{alert_confirm}</p>
                    {name!==''|| email!==''||password!==''|| email!==''?
                    <Button type="submit" onClick={handleCreate}>Create Account</Button>:<></>}
                  </form>
                  :<>
                    <h2>Success</h2>
                    <Button type="submit" onClick={clearForm}>Add Another Account</Button> {' '}
                    <Button type="submit" onClick={()=> {navigate("/login")}}>Login</Button>
                  </>}
                </CardBody>
              </Card>
            </Col>
          </Row>
      </div>
    </>
  )
}

export default CreateAccount;