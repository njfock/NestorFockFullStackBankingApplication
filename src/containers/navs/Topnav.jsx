import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import {NotificationContainer } from 'react-notifications';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText, Tooltip
} from 'reactstrap';

import { getCurrentUser, setCurrentUser } from "../../helper/auth";
import logo from '../../assets/logo/logo-no-background.png';
import Tab from './Tab';
const Topnav = ({ path }) => {
   const [tooltipOpen, setTooltipOpen] = useState(false);
   let navigate = useNavigate();
   let user = getCurrentUser();
   return (
   <>
      <Navbar style={{width: '100%',backgroundColor: 'rgba(192,192,192,0.8)'}} >
         <NavbarBrand href="/">
            <img
               alt="logo"
               src={logo}
               style={{
               height: 40,
               }}
            />
         </NavbarBrand>
         <Nav pills >
            <Tab path={path} title={'Home'} link={"/"} description={'Inicio'} index={0}/>
         {!user?
            <>
               <Tab path={path} title={'Login'} link={"/login"} description={'Iniciar sesión'} index={1}/>
               <Tab path={path} title={'Create Account'} link={"/create"} description={'Crear cuenta'} index={2}/>
            </>
            :
            <>
               <Tab path={path} title={'Deposit'} link={"/deposit"} description={'Deposito'} index={3}/>
               <Tab path={path} title={'Withdraw'} link={"/withdraw"} description={'Retiro'} index={4}/>
               <Tab path={path} title={'All Data'} link={"/data"} description={'Datos'} index={5}/>
               
            </>
         }
         </Nav>
         
         <Nav>
            <NavbarText style={{color: '#FF5733'}}><b>{user? user.name:''}</b> <b style={{color: '#000000'}}>{user?' | ' + user.email:''}</b></NavbarText>
            {user?
            <>
            <NavItem id={`tooltip_logout`}>
                  <NavLink href="/login" onClick={()=>{setCurrentUser();navigate("/")}} style={{color: '#000000'}}>
                     Logout
                  </NavLink>
               </NavItem>
               <Tooltip
               placement='bottom'
               autohide={false}
               isOpen={tooltipOpen}
               target={`tooltip_logout`}
               toggle={() => setTooltipOpen(!tooltipOpen)}
               >
               <b>Salir</b>
               </Tooltip></>:<></>}
         </Nav>
            
      </Navbar>                    
      <NotificationContainer/>
      <br/><br/>
   </>
  );
}

export default Topnav;