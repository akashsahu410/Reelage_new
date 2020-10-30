<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <!-- The above 3 meta tags *must* come first in the head; any other head content must come *after* these tags -->
    <title>Reelage</title>
    <!--FAVICON-->
    <!--<link rel="shortcut icon" type="image/x-icon" href="images/favo.ico">-->
	<!--menu-maker-->
    <link rel="stylesheet" type="text/css" href="css/menumaker.css">
	<!--font-awesome-->
	<link href="css/font-awesome.css" rel="stylesheet">
	<!--select2-->
	<link href="css/select2.css" rel="stylesheet">
	<!--fonts-->
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,200;1,300;1,400;1,500;1,600;1,700;1,800&display=swap" rel="stylesheet"> 
    <!-- Bootstrap -->
    <link href="css/bootstrap.min.css" rel="stylesheet">	
	<!---Util Crousel-->
	<link rel="stylesheet" href="utilcarousel-files/utilcarousel/util.carousel.css" />
    <link rel="stylesheet" href="utilcarousel-files/utilcarousel/util.carousel.skins.css" />
    <link rel="stylesheet" href="utilcarousel-files/magnific-popup/magnific-popup.css" />
	<!--style-->
	<link href="css/style.css" rel="stylesheet">
  </head>
  <body>
	<section class="login-page wrapper pd-50">
		<div id="particles-js"></div>
		<div class="container">
			<div class="row">
				<div class="col-md-6">
					<div class="lgn-sec-form">
						<div class="lgn-fom-logo">	
							<img src="images/head-logo.png">
							
						</div>
						<div class="lgn-inr-form">
							<div class="panel with-nav-tabs panel-default">
								<div class="panel-heading">
										<ul class="nav nav-tabs">
											<li class="lgn-tab active"><a href="#tab1default" data-toggle="tab">Login</a></li>
											<li><a href="#tab2default" data-toggle="tab">Signup</a></li>
											<!--<li><a class="frgt-tab" href="#tab3default" data-toggle="tab">Forgot Password</a></li>-->
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
																	<input class="form-control" required="" name="EMAIL" type="text" placeholder="Email address">
																</div>
																<div class="form-group">
																	<label>Password</label>
																	<input class="form-control" required="" name="PASSWORD" type="pass" placeholder="Password">
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
																	<input class="form-control" required="" name="EMAIL" type="text" placeholder="Name">
																</div>
																<div class="form-group">
																	<label>Email</label>
																	<input class="form-control" required="" name="EMAIL" type="text" placeholder="Email address">
																</div>
																<div class="form-group">
																	<label>Password</label>
																	<input class="form-control" required="" name="PASSWORD" type="pass" placeholder="Password">
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
																	<input class="form-control" required="" name="EMAIL" type="text" placeholder="Email address">
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
    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>
    <!-- Include all compiled plugins (below), or include individual files as needed -->
    <script src="js/bootstrap.min.js"></script>
	<script src="js/menumaker.js"></script>
	<script type="text/javascript">
	$("#cssmenu").menumaker({
		title: "Menu",
		format: "multitoggle"
	});
	</script>
	<script src="js/particles.js"></script>
    <script src="js/particles-3.js"></script>
  </body>
</html>