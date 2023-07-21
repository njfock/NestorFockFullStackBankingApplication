import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import TopNav from "../containers/navs/Topnav";
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Input, Button, CardFooter } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import { getAccount, updateAccount } from "../helper/account";
import logo from '../assets/logo/logo-no-background.png';
const Deposit = () => {
  const [amount, setAmount] = useState(0);
  const [account, setAccount] = useState({balance: 0});
  const [amount_confirm, setAmountConfirm] = React.useState('');
  let location = useLocation();
  const Account = async () => {
    let response = await getAccount();
    setAccount(response)
  }
  useEffect(() => {
    Account()
  },[])

  function validate(field, setStatus) {
    if(!field) {
      setStatus('Error: Amount is empty')
      return false;
    }
    if (!Number(field)){
      setStatus('Error: Amount is Not A Number')
      return false;
    }
    if (Number(field)<1){
      setStatus('Error: Amount is negative')
      return false;
    }
    setStatus('')
    return true;
  }


  async function handleSubmit(event) {
    event.preventDefault();
    let flag = 0;
    if (!validate(amount, setAmountConfirm)) flag = flag + 1;
    if (flag === 0){
      let response = await updateAccount({...account, balance: Number(account.balance) + Number(amount)})
      setAccount(response)
      setAmount(0);
      NotificationManager.success('Thank you '+account.name, 'Deposit received');
      setTimeout(() => {
        setAmount(0);
      }, "1000");
    }
  }
  return (
    < >
    <div className="fixed-background" >
    </div>
    <TopNav path={location.pathname}/>
      <div className="container mt-4" >
        <center className="mt-4">
          <Card
            color="secondary"
            inverse
            style={{
              width: '22rem'
            }}
          >
            <img
              alt="Sample"
              src={logo}
              width='50%'
              className="m-4"
            />
            <CardBody>
              <CardTitle tag="h2" style={{color: '#FF5733'}} >
                Deposit
              </CardTitle>
              <hr/>
              <CardSubtitle
                className="mb-4"
                tag="h5" style={{color: '#ffffff'}}
              >
                <Row className="mb-4 mt-2">
                  <Col className="text-start">Balance</Col>
                  <Col className="text-end">{account? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(account.balance):''}</Col>
                </Row>
                <Row className="mb-4">
                  <Col className="text-start mt-1">Deposit amount</Col>
                  <Col className="text-end"><Input name="amount" type="text" placeholder='amount' value={amount} className="form-control text-end" onChange={ e => setAmount(e.currentTarget.value)} min="0"/></Col>
                </Row>
                <p style={{color: '#FF5733'}}>{amount_confirm}</p>
                    
              </CardSubtitle>
            </CardBody>
            <CardFooter style={{background: '#FF5733'}}>
              {amount!==0?
              <Button type="submit" onClick={handleSubmit}>Deposit</Button>
              : <></>}
            </CardFooter>
          </Card>
        </center>
      </div>
    </>
  )
}

export default Deposit;