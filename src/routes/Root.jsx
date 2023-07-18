
import { useLocation } from "react-router-dom";
import TopNav from "../containers/navs/Topnav";
import { Card, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';
import { getCurrentUser } from "../helper/auth";
import logo from '../assets/logo/logo-white.png';
const Root = () => {
  let location = useLocation();
  let user = getCurrentUser();
  return (
    < >
    <div className="fixed-background" >
    </div>
    <TopNav path={location.pathname}/>
      <div className="container mt-4 " >
        <center className="mt-4">
          <Card
            color="dark"
            inverse
            style={{
              width: '22rem'
            }}
          >
            <img
              alt="Sample"
              src={logo}
            />
            <CardBody>
              <CardTitle tag="h2" style={{color: '#FF5733'}} className="mt-3">
                Welcome to the bank
              </CardTitle>
              <CardSubtitle
                className="mb-2"
                tag="h5" style={{color: '#ffffff'}}
              >
                For all your banking needs
              </CardSubtitle>
              <CardText style={{color: '#BDC3C7'}}>
                Less Security, More fun! {user? "Welcome"+(user.name? ' '+user.name : '')+", it's time to start depositing and withdrawing":'Enter and deposit and withdraw what you want, when you want.'}
              </CardText>
            </CardBody>
          </Card>
        </center>
      </div>
    </>
  )
}

export default Root;