

import React, { useState } from 'react';
import { useLocation } from "react-router-dom";
import moment from 'moment';
import TopNav from "../containers/navs/Topnav";
import { Card, CardBody, CardTitle, Col, CardText, Row, Nav,NavItem, NavLink, TabContent, TabPane } from 'reactstrap';
import { getUsers, getLogs } from "../helper/auth";
import logo from '../assets/logo/logo-no-background.png';
const AllData = () => {
  const [show, setShow] = useState("1");
  let location = useLocation();
  let users = getUsers();
  let logs = getLogs();
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
            style={{
              width: '50rem'
            }}
          >
            <img
              alt="Sample"
              src={logo}
              className="m-4"
              style={{
                width: '10rem'
              }}
            />
            <CardBody>
              <CardTitle tag="h2" style={{color: '#FF5733'}} className="mt-3">
                All Data
              </CardTitle>
              <CardText style={{color: '#000000'}}>
                
                <Nav tabs>
                    <NavItem>
                    <NavLink
                        className={show==="1"?'active':''}
                        onClick={()=>{setShow("1")}}
                    >
                        Users
                    </NavLink>
                    </NavItem>
                    <NavItem>
                    <NavLink
                        className={show==="2"?'active':''}
                        onClick={()=>{setShow("2")}}
                    >
                        Logs
                    </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={show}>
                    <TabPane tabId="1">
                        <Row style={{color: '#FF5733'}} className="mt-4">
                            <Col className="text-center">Email</Col>
                            <Col className="text-center">Name</Col>
                            <Col className="text-center">Password</Col>
                            <Col className="text-center">Balance</Col>
                        </Row>
                        {users? users.length > 0?
                            users.map((item, index)=>{
                                return(
                                <Row style={{color: '#000000'}} key={index}>
                                    <Col className="text-center">{item.email}</Col>
                                    <Col className="text-center">{item.name}</Col>
                                    <Col className="text-center">{item.x}</Col>
                                    <Col className="text-center">{item.balance}</Col>
                                </Row>
                                )
                            })
                            :'':''
                        }
                    </TabPane>
                    <TabPane tabId="2">
                        <Row style={{color: '#FF5733'}} className="mt-4">
                            <Col className="text-center">Email</Col>
                            <Col className="text-center">Action</Col>
                            <Col className="text-center">Date</Col>
                        </Row>
                        {logs? logs.length > 0?
                            logs.map((item, index)=>{
                                return(
                                <Row style={{color: '#000000'}} key={index}>
                                    <Col className="text-center">{item.email}</Col>
                                    <Col className="text-center">{item.action}</Col>
                                    <Col className="text-center">{item.date? moment(new Date(item.date)).utc().format("LLL"): ''}</Col>
                                </Row>
                                )
                            })
                            :'':''
                        }
                    </TabPane>
                </TabContent>
              </CardText>
            </CardBody>
          </Card>
        </center>
      </div>
    </>
  )
}

export default AllData;