/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable array-callback-return */
import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import { Card, CardBody, CardTitle, CardSubtitle, Row, Col, Input, Button, CardFooter } from 'reactstrap';
import { NotificationManager } from 'react-notifications';
import { getAccount, updateAccount, getAccounts } from "../helper/account";
import TopNav from "../containers/navs/Topnav";
import Particles from '../containers/Particles';
import logo from '../assets/logo/logo-no-background.png';

const Withdraw = () => {
  const [amount, setAmount] = useState(0);
  const [number, setNumber] = useState('');
  const [transfer, setTransfer] = useState();
  const [number_confirm, setNumberConfirm] = useState('');
  const [amount_confirm, setAmountConfirm] = React.useState('');
  const [account, setAccount] = useState({balance: 0, loading: true});
  let location = useLocation();

  const Account = async () => {
    setAccount({...account, loading:true})
    let response = await getAccount();
    setAccount({...response, loading:false})
  }
  const Search = async (data) => {
    let accounts = await getAccounts();
    setNumberConfirm('')
    setTransfer(); 
    accounts.map(
      (item)=>{ 
        if(item.number.toString().replace(' ','') === data.replace(' ','')) { 
          setTransfer(item); 
          setNumberConfirm(item.name+' | '+item.email)
        }
      }
    )
    if(number_confirm === ''){
      if(number.length>10)
        setNumberConfirm('Account does not exist')
    }
  }

  useEffect(() => {
    Search(number)
  },[number]) 

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
    if (!validate(amount, setAmountConfirm)) flag = flag - 1;
    if (flag === 0){
      if(Number(amount)<=Number(account.balance)){
        setAccount({...account, loading:true})
        let response = await updateAccount({...account, balance: Number(account.balance) - Number(amount)})
        setAccount({...response, loading:false})
        await updateAccount({...transfer, balance: Number(transfer.balance) + Number(amount)})
        setAmount(0);
        setNumber('')
        NotificationManager.success('Alert', 'Success transfer');
        setTimeout(() => { setAmount(0) }, "1000");
      }
      else {
        setAmountConfirm('Error: Insufficient balance')
      }
    }
  }

  return (
    <>
      <div className="fixed-background"></div>
      <TopNav path={location.pathname}/>
      <div className="container mt-4">
        <center className="mt-4">
          <Card color="secondary" inverse>
            <img alt="Logo" src={logo} width='50%' className="m-4"/>
            <CardBody>
              <CardTitle tag="h2" style={{color: '#FF5733'}}>
                Transfer
              </CardTitle>
              <hr/>
              { account.loading? 
                <Particles/>
              :
                <CardSubtitle className="mb-4" tag="h5" style={{color: '#ffffff'}}>
                  <Row className="mb-4 mt-2">
                    <Col className="text-start">Account #</Col>
                    <Col className="text-end">{account? account.number? account.number.toString().substring(0, 5)+ ' '+ account.number.toString().substring(5, 10) :'':''}</Col>
                  </Row>
                  <Row className="mb-4 mt-2">
                    <Col className="text-start">Type</Col>
                    <Col className="text-end">{account? account.type? account.type :'':''}</Col>
                  </Row>
                  <Row className="mb-4 mt-2">
                    <Col className="text-start">Balance</Col>
                    <Col className="text-end">{account? new Intl.NumberFormat('en-US', { minimumFractionDigits: 2 }).format(account.balance): ''}</Col>
                  </Row>
                  <Row className="mb-4">
                    <Col className="text-start mt-1">Account number to transfer</Col>
                    <Col className="text-end">
                      <Input name="to" type="text" value={number} className="form-control text-end" onChange={ e => setNumber(e.currentTarget.value)} min="0"/>
                      <p style={{color: '#FF5733'}}>{number_confirm}</p>
                    </Col>
                  </Row>
                  <Row className="mb-4">
                    <Col className="text-start mt-1">Transfer amount</Col>
                    <Col className="text-end">
                      <Input name="amount" type="text" placeholder='amount' value={amount} className="form-control text-end" onChange={ e => setAmount(e.currentTarget.value)} min="0"/>
                      <p style={{color: '#FF5733'}}>{amount_confirm}</p>
                    </Col>
                  </Row>
                  
                </CardSubtitle>
              }
            </CardBody>
            <CardFooter style={{background: '#FF5733'}}>
              { account.loading? 
                <></>
              : amount!==0? transfer?
                <Button type="submit" onClick={handleSubmit}>Transfer</Button>
              : <></>: <></>
              }
            </CardFooter>
          </Card>
        </center>
      </div>
    </>
  )
}

export default Withdraw;