import React from 'react'
import {Link} from 'react-router-dom';
class Footer extends React.Component{

  render(){
    return(
      <div>
      
        <footer>
    <div class="footer-main wrapper pd-tp50">
      <div class="container">
        <div class="footr-top">
          <div class="row">
            <div class="col-md-4">
              <div class="ftr-abt-sec add-ft">
                <div class="ftr-icn">
                  <img src="/images/map-maker.png"/>  
                </div>
                <h3>Address</h3>
                <p>Madison Square Garden - 4 Penn<br/>sylvania Plaza, NY, US</p>
              </div>
            </div>
            <div class="col-md-4">
              <div class="ftr-abt-sec scl-ft">
                <div class="ftr-icn">
                  <img src="/images/scl-img.png"/>  
                </div>
                <h3>Social</h3>
                <div class="ftr-social">
                  <ul>
                    <li><a href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                    <li><a href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                  </ul>
                </div>
              </div>
            </div>
            <div class="col-md-4">
              <div class="ftr-abt-sec cnt-ft">
                <div class="ftr-icn">
                  <img src="/images/cnt-us.png"/> 
                </div>
                <h3>Contact</h3>
                <p class="ftr-call"><span>Phone: </span> <a href="tel:+91 8556055809">+91 8556055809</a></p>
                <p class="ftr-email"><span>Email: </span> <a href="mailto:info@reelage.com">info@reelage.com</a></p>
              </div>
            </div>
          </div>
        </div>
        <div class="ftr-btm">
          <div class="row">
            <div class="col-md-6">
              <div class="cpy-rt">
                <p>© 2020 - Made with by <a href="#">Reelage</a></p>
              </div>
            </div>
            <div class="col-md-6">
              <div class="ftr-trm">
                <ul>
                <Link to="/terms_conditions"><li><a href="javascript:;">Terms of Use</a></li></Link>
                  <Link to="/privacy_policy"><li><a href="javascript:;">Privacy Policy</a></li></Link>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </footer>
  
  </div>
      )
  }
}

export default Footer