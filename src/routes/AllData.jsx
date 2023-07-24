/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import TopNav from "../containers/navs/Topnav";
import { Card, Row, CardBody, CardTitle, Col} from 'reactstrap';
import { getAccounts, getAccount } from "../helper/account";
import logo from '../assets/logo/logo-no-background.png';
const AllData = () => {
  const [account, setAccount] = useState();
  const [accounts, setAccounts] = useState();
  let location = useLocation();

  const Account = async () => {
    let response = await getAccount();
    setAccount(response)
    let responses = await getAccounts();
    setAccounts(responses)
  }

  useEffect(() => {
    Account()
  },[])

  return (
    <>
      <div className="fixed-background"></div>
      <TopNav path={location.pathname}/>
      <div className="container mt-4">
        <Card color="light" inverse >
          <img alt="Logo" className="m-4" src={logo} width='40%'/>
          <CardBody className="text-center">
            <CardTitle tag="h2" style={{color: '#FF5733'}} className="mt-3">
              All Data
            </CardTitle>
            { account? accounts? accounts.length > 0?
              <>
                <Row style={{color: '#FF5733'}}>
                  <Col>Account Number</Col>
                  <Col>Type</Col>
                  <Col>Rol</Col>
                  <Col>Email</Col>
                  <Col>Name</Col>
                  {account.rol?account.rol==='Bank employee'?
                    <>
                      <Col>Password</Col>
                      <Col>Balance</Col>
                    </>
                    : <></>
                    : <></>
                  }
                </Row>
                { accounts.map((item, index)=>{
                    return(
                      <Row style={{color: '#000000'}} key={index}>
                        <Col>{item.number?item.number.toString().substring(0, 5)+ ' '+ item.number.toString().substring(5, 10):''}</Col>
                        <Col>{item.type?item.type:''}</Col>
                        <Col>{item.rol?item.rol:''}</Col>
                        <Col>{item.email?item.email:''}</Col>
                        <Col>{item.name?item.name:''}</Col>
                        {account.rol?account.rol==='Bank employee'?
                          <>
                            <Col>{item.password?item.password:''}</Col>
                            <Col>{item.balance?item.balance:''}</Col>
                          </>
                          : <></>
                          : <></>
                        }
                      </Row>
                    )
                  })
                }
              </>
            : <></>
            : <></>
            : <></>
            }
          </CardBody>
        </Card>
      </div>
    </>
  )
}

export default AllData;