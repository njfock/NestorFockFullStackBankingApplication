import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from "firebase/auth";
import {NotificationContainer } from 'react-notifications';
import {
  Navbar,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  NavbarText, Tooltip
} from 'reactstrap';

import { auth } from '../../helper/firebase';
import { setLogout } from "../../helper/auth";
import logo from '../../assets/logo/logo-no-background.png';
import Tab from './Tab';
import Particles from '../Particles';
const Topnav = ({ path }) => {
   const [tooltipOpen, setTooltipOpen] = useState(false);
   const [user, setUser] = useState({loading:true });
   useEffect(() => {
      Auth()
    },[])

   const Auth = () => {
      onAuthStateChanged(auth, (current) => {
        if (current) {
          setUser({ uid: current.uid, name: current.displayName, email: current.email, loading:false })
        } else {
         setUser({loading:false })
        }
      });
    }
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
         {user.loading? <Particles/>
            :
            <>
               <Nav pills >
                  <Tab path={path} title={'Home'} link={"/"} description={'Inicio'} index={0}/>
                  {!user.uid?
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
                  <NavbarText style={{color: '#FF5733'}}><b>{auth? auth.currentUser? auth.currentUser.displayName? auth.currentUser.displayName :'':'':''}</b> <b style={{color: '#000000'}}>{auth? auth.currentUser? auth.currentUser.email? ' | '+ auth.currentUser.email :'':'':''}</b></NavbarText>
                  {user.uid?
                  <>
                  <NavItem id={`tooltip_logout`}>
                        <NavLink href="/login" onClick={()=>{setLogout()}} style={{color: '#000000'}}>
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
            </>
         }
      </Navbar>                    
      <NotificationContainer/>
      <br/><br/>
   </>
  );
}

export default Topnav;