

import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import TopNav from "../containers/navs/Topnav";
import { Card, CardBody, CardTitle, Col, CardText, Row } from 'reactstrap';
import { getAccounts } from "../helper/account";
import logo from '../assets/logo/logo-no-background.png';
const AllData = () => {
  const [account, setAccount] = useState();
  let location = useLocation();
  const Account = async () => {
    let response = await getAccounts();
    setAccount(response)
  }
  useEffect(() => {
    Account()
  },[])
  return (
    < >
    <div className="fixed-background" >
    </div>
    <TopNav path={location.pathname}/>
      <div className="container mt-4 " >
        <center className="mt-4">
          <Card
            color="light"
            inverse
          >
            <img
              alt="Sample"
              src={logo}
              className="m-4"
            />
            <CardBody>
              <CardTitle tag="h2" style={{color: '#FF5733'}} className="mt-3">
                All Data
              </CardTitle>
              <CardText style={{color: '#000000'}}>
                {account? account.length > 0?
                  <>
                    <Row style={{color: '#FF5733'}} className="mt-4">
                      <Col className="text-center">Email</Col>
                      <Col className="text-center">Name</Col>
                      <Col className="text-center">Password</Col>
                      <Col className="text-center">Balance</Col>
                    </Row>
                    {
                      account.map((item, index)=>{
                          return(
                          <Row style={{color: '#000000'}} key={index}>
                              <Col className="text-center">{item.email}</Col>
                              <Col className="text-center">{item.name}</Col>
                              <Col className="text-center">{item.x}</Col>
                              <Col className="text-center">{item.balance}</Col>
                          </Row>
                          )
                      })
                    }
                  </>
                  :'':''
                }
              </CardText>
            </CardBody>
          </Card>
        </center>
      </div>
    </>
  )
}

export default AllData;