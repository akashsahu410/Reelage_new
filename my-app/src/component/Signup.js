import React from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Redirect, Link } from "react-router-dom";

class Signup extends React.Component {
  //for register
  state = {
    emailValid: "",
    nameValid: "",
    passValid: "",
    NAME: "",
    EMAIL: "",
    PASSWORD: "",
  };
  initialstate = {
    emailValid: "",
    nameValid: "",
    passValid: "",
    NAME: "",
    EMAIL: "",
    PASSWORD: "",
  };

  changedata = (e) => {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  };
  registerSubmit = (e) => {
    e.preventDefault();

    const reg = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (this.state.EMAIL === "") {
      this.setState({ emailValid: "Email is required*" });
    } else {
      if (reg.test(this.state.EMAIL) === false) {
        this.setState({ emailValid: "Invalid Email" });
      } else {
        this.setState({ emailValid: "" });
      }
    }
    if (this.state.NAME === "") {
      this.setState({ nameValid: "Name is required*" });
    } else {
      this.setState({ nameValid: "" });
    }
    if (this.state.PASSWORD === "") {
      this.setState({ passValid: "Password is required*" });
    } else {
      this.setState({ passValid: "" });
    }
    /*console.log(JSON.stringify(this.state));*/
    if (
      this.state.EMAIL === "" ||
      this.state.PASSWORD === "" ||
      this.state.NAME === "" ||
      reg.test(this.state.EMAIL) === false
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
      fetch(`http://localhost:8080/registerform`, options)
        .then((res) => {
          //console.log("response",res)
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            toast("Thank you for register");

            this.setState(this.initialstate);
          } else {
            toast("Email already exits!");
          }
        })
        .catch((err) => {
          console.log("error", err);
        });
    }
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
                          <li>
                            <Link to="/login">
                              <a href="javascript:void(0);">Login</a>
                            </Link>
                          </li>
                          <li class="active">
                            <a href="javascript:void(0);" data-toggle="tab">
                              Signup
                            </a>
                          </li>
                        </ul>
                      </div>
                      <div class="panel-body">
                        <div class="tab-content">
                          <div class="lgn-fom-sec">
                            <div class="login sgnp">
                              <div class="Lgn-heaad-sec">
                                <h3>Create an account</h3>
                              </div>
                              <div class="login-frm-blk">
                                <div class="login-frm">
                                  <form
                                    id="reset"
                                    onSubmit={this.registerSubmit}
                                  >
                                    <div class="form-group">
                                      <label>Name</label>
                                      <input
                                        class="form-control"
                                        required=""
                                        name="NAME"
                                        onChange={this.changedata}
                                        value={this.state.NAME}
                                        type="text"
                                        placeholder="Name"
                                      />
                                      <label>{this.state.nameValid}</label>
                                    </div>

                                    <div class="form-group">
                                      <label>Email</label>
                                      <input
                                        class="form-control"
                                        required=""
                                        name="EMAIL"
                                        onChange={this.changedata}
                                        value={this.state.EMAIL}
                                        type="text"
                                        placeholder="Email address"
                                      />
                                      <label>{this.state.emailValid}</label>
                                    </div>
                                    <div class="form-group">
                                      <label>Password</label>
                                      <input
                                        class="form-control"
                                        required=""
                                        onChange={this.changedata}
                                        value={this.state.PASSWORD}
                                        name="PASSWORD"
                                        type="password"
                                        placeholder="Password"
                                      />
                                      <label>{this.state.passValid}</label>
                                    </div>
                                    <div class="Lgm-fom-btn">
                                      <button class="cmmn-bt" type="submit">
                                        Register
                                      </button>
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
              <div class="col-md-6"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Signup;
