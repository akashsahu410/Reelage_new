import React from 'react'
import {Switch,Route,Redirect,Link} from 'react-router-dom';
class Header extends React.Component{

  

  render(){
    return(
      <div>
      <header class="wrapper header-inner">
  <div class="header-main">
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <div class="headr-logo">
              
          </div>
        </div>
        <div class="col-md-5">
          
          <div class="head-scl">
            <ul>
              <li>FOLLOW</li>
              <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
              <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</header>
        </div>
        
      )
  }
}

export default Header