import React from 'react'
import Header from './header'
import Footer from './footer'
import {Switch,Route,Redirect,Link} from 'react-router-dom';
class Home extends React.Component{

  state={
    username:""
  }

  changedata=(e)=>{
    this.setState({[e.target.name]:e.target.value.toLowerCase()})
    console.log(this.state.username)
  }

  render(){
    return(
      <div>
      <Header/>
        <div>
        <section class="banner wrapper">
    <div id="carousel-example-generic" class="carousel slide" data-ride="carousel">
        
        <ol class="carousel-indicators">
        <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
        <li data-target="#carousel-example-generic" data-slide-to="1"></li>
        <li data-target="#carousel-example-generic" data-slide-to="2"></li>
        </ol>
       
        <div class="carousel-inner" role="listbox">
        <div class="item active">
          <div class="bannr-innr">
          <div class="container">
              <div class="row">
                  <div class="col-md-7">
                        <div class="banner-dis">
                      <h1>Dance with you heart <span>We Can Dance</span></h1>
                      <p><b>Established in 1940,</b> Dancerio Dance Studio has become a center for dance students with professional aspirations</p>
                      <div class="bnnr-btn">
                     
                        <Link class="cmmn-btn app" to="/login"><i class="fa fa-plus" aria-hidden="true"></i> Apply Now</Link>
                        <a class="cmmn-btn lve" href="javascript:void(0);">Live for entertainment</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                      <div class="banner-rt-img">
                         
                          <img src={require('../images/dance-grl.png')} />
                      </div>
                  </div>
              </div>
          
          </div>
          </div>
        </div>
        </div>

      
      <a class="left carousel-control" href="#carousel-example-generic" role="button" data-slide="prev">
      <span class="glyphicon glyphicon-chevron-left" aria-hidden="true"></span>
      <span class="sr-only">Previous</span>
      </a>
      <a class="right carousel-control" href="#carousel-example-generic" role="button" data-slide="next">
      <span class="glyphicon glyphicon-chevron-right" aria-hidden="true"></span>
      <span class="sr-only">Next</span>
      </a>
    </div>
  </section>
  <section class="prize-sec wrapper pd-80">
    <div class="container">
      <div class="row">
        <div class="col-md-10">
          <div class="prze-lft-dis">
            <div class="priz-head">
              <h4>Your Talent,
              <span>Our Light</span></h4>
              <p>We pave the way for entertainment</p>
            </div>
            <div class="prze-membr">
              <h4><span class="mbr-count">50+</span>members have registered as a part of our <b>bentbiz family</b><span class="music"><img src={require('../images/music.png')} /> </span> </h4>
            </div>
          </div>
        </div>
        <div class="col-md-2">
          <div class="price-mny">
            <div class="prize-head-sec">
              <h3>10000/-</h3>
              <p>First Prize</p>
            </div>
            <div class="prize-head-sec">
              <h3>8000/-</h3>
              <p>Second Prize</p>
            </div>
            <div class="prize-head-sec">
              <h3>5000/-</h3>
              <p>Third Prize</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  <section class="join-us wrapper pd-50">
    <span class="joinus-hd">Join Us</span>
    <div class="container">
      
      <div class="row">
        <div class="col-md-6">
          <div class="join-lft">
            <div class="join-lft-img">
            <img src={require('../images/band-img.png')} />
              
            </div>
          </div>
          <div class="time-sec">
            <ul>
              <li>08<span class="dys-sec">DAYS</span></li>
              <li>09<span class="dys-sec">HOURS</span></li>
              <li>20<span class="dys-sec">MINUTES</span></li>
              <li>55<span class="dys-sec">SECONDS</span></li>
            </ul>
          </div>
        </div>
        <div class="col-md-6">
          <div class="join-rt">
            <div class="top-calndr">
              <p><span class="top-clndr-icn"><i class="fa fa-calendar" aria-hidden="true"></i></span>13 September, 2020</p>
            </div>
            <div class="upcm-hd">
              <h4>upcoming competition</h4>
            </div>
            <div class="join-rt-hd">
              <h3>Dance with you heart
                We Can Dance</h3>
              <p>Enter the entertainment sphere</p>   
            </div>
            <div class="apply-nw-btn">
              <a class="cmmn-btn app" href="login.php"><i class="fa fa-plus" aria-hidden="true"></i> Apply Now</a>
            </div>
            
          </div>
        </div>
        <div class="trms">
              <a href="#">Terms & Condition</a>
            </div>
      </div>
    </div>
    <span class="ylow-ball"><img src={require('./../images/balls.png')} /></span>
  </section>
  <section class="snd-masg wrapper">
    <div class="container">
      <div class="snd-msg-frm pd-50">
        <div class="row">
          <div class="col-md-5">
            <div class="snd-msg-hd">
              <span class="orng"></span>
              <h4>Get in Touch</h4>
              <h3>Send us
              <span>a message</span></h3>
              <span class="pn-icn"><img src={require('./../images/pen.png')} /></span>
            </div>
          </div>
          <div class="col-md-7">
            <div class="snd-msg-form">
            <form>
              <div class="row">
                <div class="col-md-6">
                   <div class="form-group">
                    <input class="form-control" type="text" name="Name" placeholder="Name" required="" />
                   </div>
                </div>   
                <div class="col-md-6">
                   <div class="form-group">
                    <input class="form-control" type="text" name="Subject" placeholder="Email" required="" />
                   </div>
                </div>
                   
                <div class="col-md-6">
                   <div class="form-group">
                    <textarea class="form-control" rows="3" name="message" placeholder="Message" required="" ></textarea>
                   </div>
                </div>
                <div class="col-md-6">
                   <div class="form-group">
                    <input class="form-control" type="email" name="email" placeholder="Phone Number" required="" />
                   </div>
                   <div class="cntct-frm-btn">
                    <button type="submit" name="submit" class="frm-btn">Submit<i class="fa fa-long-arrow-right" aria-hidden="true"></i></button>
                  </div>
                </div>  
              </div>
             </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="snd-mg-btm">
      <div class="container">
        <p>*If you have any comments, suggestions or questions, please do not hesitate to contact us. Our team will help you and answer all your questions.
        </p>
      </div>  
    </div>
  </section>
        </div>
        <Footer/>
    
  </div>
      )
  }
}

export default Home