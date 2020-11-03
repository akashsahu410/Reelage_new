import React from "react";
import { ToastContainer, toast } from "react-toastify";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { Link, Redirect } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login";
import "react-toastify/dist/ReactToastify.css";

class Login extends React.Component {
  //for register
  state = {
    LOGINEMAIL: "",
    LOGINPASSWORD: "",
    LOGINNAME:"",
    loginemailValid: "",
    loginpassValid: "",
    loginflag: false,
  };
  initialstate = {
    LOGINEMAIL: "",
    LOGINPASSWORD: "",
    LOGINNAME:"",
    loginemailValid: "",
    loginpassValid: "",
    loginflag: true,
  };

  changedata = (e) => {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  };

  //for login
  loginSubmit = (e) => {
    e.preventDefault();
    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.LOGINEMAIL === "") {
      this.setState({ loginemailValid: "Email is required*" });
    } else {
      if (reg.test(this.state.LOGINEMAIL) === false) {
        this.setState({ loginemailValid: "Invalid Email" });
      } else {
        this.setState({ loginemailValid: "" });
      }
    }

    if (this.state.LOGINPASSWORD === "") {
      this.setState({ loginpassValid: "Password is required*" });
    } else {
      this.setState({ loginpassValid: "" });
    }
    /*console.log(JSON.stringify(this.state));*/
    if (
      this.state.LOGINEMAIL === "" ||
      this.state.LOGINPASSWORD === "" ||
      reg.test(this.state.LOGINEMAIL) === false
    ) {
    } else {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      };
      fetch(`http://localhost:8080/loginform`, options)
        .then((res) => {
          return res.json();
        })
        .then((data) => {
          console.log("data fetched",data)
          if (data.status == true) {

            // set the email
            const token_email = jwt.sign(
              { expiresInMinutes: 60, email: this.state.LOGINEMAIL },
              config.login_secret.key
            );
            localStorage.setItem("email", token_email);
            
            // set the name
            const token_name = jwt.sign(
              { expiresInMinutes: 60, name: data.name },
              config.login_secret.key
            );
            localStorage.setItem("name", token_name);

            // set the document id
            const token_id = jwt.sign(
              { expiresInMinutes: 60, param: data.id },
              config.login_secret.key
            );
            localStorage.setItem("param", token_id);

            console.log("localstorage email", localStorage.getItem("email"));

            // jwt.verify(
            //   localStorage.getItem("email"),
            //   config.login_secret.key,
            //   (err, decoded) => {
            //     console.log(decoded);
            //   }
            // );

            // //verify
            // jwt.verify(token_email, config.login_secret.key, (err, decoded) => {
            //   console.log("verify", decoded); // bar
            // });

            // get the decoded payload and header
            var decoded = jwt.decode(token_email, { complete: true });
            console.log("decoded",decoded)
            let decode_email = jwt.decode(localStorage.getItem("email"));
            console.log("decode_email", decode_email);
            console.log("header", decoded.header);
            console.log("payload", decoded.payload);
            this.setState(this.initialstate);
            toast(data.message);
            // this.props.history.push(`/profile?id=${data.id}`);
            this.props.history.push(`/profile`);
          } else {
            toast(data.message);
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
  };

  // facebook login callback
  responseFacebook = (response) => {
    console.log("facebook response", response);
  };

  //on successfully login with google
  googleResponse = (response) => {
    const tokenBlob = new Blob(
      [JSON.stringify({ access_token: response.accessToken }, null, 2)],
      { type: "application/json" }
    );
    console.log(tokenBlob);
    // this.setState({LOGINEMAIL:response.nt.Wt,LOGINNAME:response.nt.Ad})
    console.log(response);
    console.log("state",this.state)
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({EMAIL:response.profileObj.email,NAME:response.profileObj.name,PASSWORD:"",IMAGE:response.profileObj.imageUrl}),
    }
      fetch(`http://localhost:8080/registerwithlogin`, options)
        .then((res) => {
          //console.log("response",res)
          return res.json();
        })
        .then((data) => {
          console.log("data caught",data)
          const token_email = jwt.sign(
            { expiresInMinutes: 60, email: response.profileObj.email },
            config.login_secret.key
          );
          localStorage.setItem("email", token_email);


          const token_name = jwt.sign(
            { expiresInMinutes: 60, name: response.profileObj.name },
            config.login_secret.key
          );
          localStorage.setItem("name", token_name);

          const token_image = jwt.sign(
            { expiresInMinutes: 60, image: response.profileObj.imageUrl },
            config.login_secret.key
          );
          localStorage.setItem("image", token_image);

          // set the document id
          const token_id = jwt.sign(
            { expiresInMinutes: 60, param: data.id },
            config.login_secret.key
          );
          localStorage.setItem("param", token_id);
          
          toast("Login with Google Successful");
          this.setState(this.initialstate);
          this.props.history.push(`/profile`);
          // this.props.history.push(`/profile`);
        })
        .catch((err) => {
          console.log("error", err);
        });
    
  
    // fetch('http://localhost:8081/login_google', options)
    // .then(res=>{
    //     console.log("response",res)
    //     return res.text();
    // })
    // .then(data=>{
    //     console.log("data",data)
    // })
    // .catch(err=>{
    //     console.log("error",err)
    // })
    // .then(r => {
    // const token = r.headers.get('x-auth-token');
    // r.json().then(user => {
    //     if (token) {
    //         this.setState({isAuthenticated: true, user, token})
    //     }
    // });
  };

  // login with google failure
  onFailure = (error) => {
    console.log(error);
    toast("Invalid Credentials");
  };

  render() {
    return (
      <div>
        {this.state.loginflag ? <Redirect to="/profile" /> : ""}
        <ToastContainer />
        <section class="login-page wrapper pd-50">
          <div id="particles-js"></div>
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="lgn-sec-form">
                  <div class="lgn-fom-logo">
                    <img src={require("../images/head-logo.png")} />
                  </div>
                  <div class="lgn-inr-form">
                    <div class="panel with-nav-tabs panel-default">
                      <div class="panel-heading">
                        <ul class="nav nav-tabs">
                          <li class="lgn-tab active">
                            <a href="javascript:void(0);">Login</a>
                          </li>
                          <li>
                            <Link to="/signup">
                              <a href="javascript:void(0);">Signup</a>
                            </Link>
                          </li>
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
                                    <form id="" onSubmit={this.loginSubmit}>
                                      <div class="form-group">
                                        <label>Email</label>
                                        <input
                                          class="form-control"
                                          required=""
                                          name="LOGINEMAIL"
                                          type="text"
                                          onChange={this.changedata}
                                          value={this.state.LOGINEMAIL}
                                          placeholder="Email address"
                                        />
                                        <label>
                                          {this.state.loginemailValid}
                                        </label>
                                      </div>
                                      <div class="form-group">
                                        <label>Password</label>
                                        <input
                                          class="form-control"
                                          required=""
                                          name="LOGINPASSWORD"
                                          type="password"
                                          onChange={this.changedata}
                                          value={this.state.LOGINPASSWORD}
                                          placeholder="Password"
                                        />
                                        <label>
                                          {this.state.loginpassValid}
                                        </label>
                                      </div>
                                      <div class="Lgm-fom-btn">
                                        <button class="cmmn-bt" type="submit">
                                          Login
                                        </button>
                                        <div class="frgt-txt">
                                          <ul class="nav nav-tabs">
                                            <Link to="/forgot">
                                              <a
                                                class="frgt-tab"
                                                href="javascript:void(0);"
                                              >
                                                Forgot Password?
                                              </a>
                                            </Link>
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
                                    <li>
                                      <FacebookLogin
                                        appId={config.fbauth.appId}
                                        fields="name,email,picture"
                                        callback={this.responseFacebook}
                                        icon="fa-facebook"
                                      />
                                      ,
                                      {/* <a class="fb" href="#">
                                        <i
                                          class="fa fa-facebook"
                                          aria-hidden="true"
                                        ></i>
                                      </a> */}
                                    </li>

                                    <li>
                                      <GoogleLogin
                                        clientId={config.googleAuth.clientID}
                                        onSuccess={this.googleResponse}
                                        onFailure={this.onFailure}
                                      />
                                      {/* <a class="ggl" href="#">
                                        <i
                                          class="fa fa-google-plus"
                                          aria-hidden="true"
                                        ></i>
                                      </a> */}
                                    </li>
                                  </ul>
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
              <div class="col-md-6"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Login;
