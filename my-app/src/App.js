import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

// This site has 3 pages, all of which are rendered
// dynamically in the browser (not server rendered).
//
// Although the page does not ever refresh, notice how
// React Router keeps the URL up to date as you navigate
// through the site. This preserves the browser history,
// making sure things like the back button and bookmarks
// work properly.

export default function BasicExample() {
  return (
    <Router>
      <div>
        

        

        {/*
          A <Switch> looks through all its children <Route>
          elements and renders the first one whose path
          matches the current URL. Use a <Switch> any time
          you have multiple routes, but you want only one
          of them to render at a time
        */}
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/Login">
            <Login />
          </Route>
          <Route path="/dashboard">
            <Dashboard />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.

function Home() {
  return (
    <div className = "App" >
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
                        <a class="cmmn-btn lve" href="javascript:void(0)">Live for entertainment</a>
                      </div>
                    </div>
                  </div>
                  <div class="col-md-5">
                      <div class="banner-rt-img">
                         
                         	<img src={require('./images/dance-grl.png')} />
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
              <h4><span class="mbr-count">50+</span>members have registered as a part of our <b>bentbiz family</b><span class="music"><img src={require('./images/music.png')} /> </span> </h4>
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
            <img src={require('./images/band-img.png')} />
              
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
    <span class="ylow-ball"><img src={require('./images/balls.png')} /></span>
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
              <span class="pn-icn"><img src={require('./images/pen.png')} /></span>
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
  );
}

function Login() {
  return (
    <section class="login-page wrapper pd-50">
		<div id="particles-js"></div>
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<div class="lgn-sec-form">
						<div class="lgn-fom-logo">	
						<img src={require('./images/head-logo.png')} />
							
							
						</div>
						<div class="lgn-inr-form">
							<div class="panel with-nav-tabs panel-default">
								<div class="panel-heading">
										<ul class="nav nav-tabs">
											<li class="lgn-tab active"><a href="#tab1default" data-toggle="tab">Login</a></li>
											<li><a href="#tab2default" data-toggle="tab">Signup</a></li>
											
										</ul>
								</div>
								<div class="panel-body">
									<div class="tab-content">
										<div class="tab-pane fade in active" id="tab1default">
											<div class="lgn-fom-sec">
												<div class="login">
													<div class="Lgn-heaad-sec">
															<h3>Login into your account</h3>
													</div>
													<div class="login-frm-blk">
														<div class="login-frm">
															<form id="">
																<div class="form-group">
																	<label>Email</label>
																	<input class="form-control" required="" name="EMAIL" type="text" placeholder="Email address" />
																</div>
																<div class="form-group">
																	<label>Password</label>
																	<input class="form-control" required="" name="PASSWORD" type="pass" placeholder="Password" />
																</div>
																<div class="Lgm-fom-btn">
																	<button class="cmmn-bt" href="#">Login</button>
																	 <div class="frgt-txt">
																	     <ul class="nav nav-tabs">
										                                      <a class="frgt-tab" href="#tab3default" data-toggle="tab">Forgot Password?</a>
									                                	</ul>
																	   </div>
																</div>
															</form>
														</div>
													</div>
												   
													<div class="or-sec">
														<p>Or Login With</p>
													</div>
													<div class="lgn-scl-icn">
														<ul>
															<li><a class="fb" href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
															<li><a class="twt" href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
															<li><a class="ggl" href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
															<li><a class="lnk" href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
															<li><a class="pint" href="#"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a></li>
														</ul>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane fade" id="tab2default">
											<div class="lgn-fom-sec">
												<div class="login sgnp">
													<div class="Lgn-heaad-sec">
														<h3>Create an account</h3>
													</div>
													<div class="login-frm-blk">
														<div class="login-frm">
															<form id="">
																<div class="form-group">
																	<label>Name</label>
																	<input class="form-control" required="" name="EMAIL" type="text" placeholder="Name" />
																</div>
																<div class="form-group">
																	<label>Email</label>
																	<input class="form-control" required="" name="EMAIL" type="text" placeholder="Email address" />
																</div>
																<div class="form-group">
																	<label>Password</label>
																	<input class="form-control" required="" name="PASSWORD" type="pass" placeholder="Password" />
																</div>
																<div class="Lgm-fom-btn">
																	<button class="cmmn-bt" href="#">Register</button>
																</div>
															</form>
														</div>
													</div>
													<div class="or-sec">
														<p>OR</p>
													</div>
													<div class="lgn-scl-icn">
														<ul>
															<li><a class="fb" href="#"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
															<li><a class="twt" href="#"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
															<li><a class="ggl" href="#"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
															<li><a class="lnk" href="#"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
															<li><a class="pint" href="#"><i class="fa fa-pinterest-p" aria-hidden="true"></i></a></li>
														</ul>
													</div>
												</div>
											</div>
										</div>
										<div class="tab-pane fade" id="tab3default">
											<div class="lgn-fom-sec">
												<div class="login pass">
													<div class="Lgn-heaad-sec">
														<h3>For recover your password</h3>
													</div>
													<div class="login-frm-blk">
														
														<div class="login-frm">
															<form id="">
																<div class="form-group">
																	<label>Email</label>
																	<input class="form-control" required="" name="EMAIL" type="text" placeholder="Email address" />
																</div>
																<div class="Lgm-fom-btn">
																	<button class="cmmn-bt" href="#">Send Me Email</button>
																</div>
															</form>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							 </div>
						</div>
					</div>
				</div>
				<div class="col-md-6">
				</div>
			</div>
		</div>
	</section>	
  );
}

function Dashboard() {
  return (
    <div>
      <h2>Dashboard</h2>
    </div>
  );
}
