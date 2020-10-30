import React from "react";
import { Redirect } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Changepassword extends React.Component {
  //for changepassword
  state = {
    NEWPASSWORD: "",
    CONFIRMPASSWORD: "",
    newValid: "",
    confirmValid: "",
    uId: "",
    flag: false,
  };
  componentDidMount = () => {
    let fetch_url = window.location.href;
    var res = fetch_url.split("=");
    this.setState({ uId: res[1] });
  };

  changedata = (e) => {
    this.setState({ [e.target.name]: e.target.value.toLowerCase() });
  };

  initialstate = {
    flag: true,
  };
  changepasswordSubmit = (e) => {
    e.preventDefault();

    if (this.state.NEWPASSWORD === "") {
      this.setState({ newValid: "New Password is required*" });
    } else {
      this.setState({ newValid: "" });
    }
    if (this.state.CONFIRMPASSWORD === "") {
      this.setState({ confirmValid: "Confirm Password  is required*" });
    } else {
      this.setState({ confirmValid: "" });
    }

    /*console.log(JSON.stringify(this.state));*/
    if (this.state.NEWPASSWORD === "" || this.state.CONFIRMPASSWORD === "") {
    } else if (this.state.NEWPASSWORD != this.state.CONFIRMPASSWORD) {
      toast("New password or confirm password not matched!");
    } else {
      let options = {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(this.state),
      };
      fetch(`http://localhost:8080/changePassword_request`, options)
        .then((res) => {
          //console.log("response",res)
          return res.json();
        })
        .then((data) => {
          if (data.status == true) {
            toast("Successfully changed password");

            this.setState(this.initialstate);
          } else {
            toast("Something went worng!");
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
        {this.state.flag ? <Redirect to="/" /> : ""}
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
                      <div class="panel-heading"></div>
                      <div class="panel-body">
                        <div class="tab-content">
                          <div class="tab-pane fade in active" id="tab1default">
                            <div class="lgn-fom-sec">
                              <div class="login">
                                <div class="Lgn-heaad-sec">
                                  <h3>Change Password</h3>
                                </div>
                                <div class="login-frm-blk">
                                  <div class="login-frm">
                                    <form
                                      id=""
                                      onSubmit={this.changepasswordSubmit}
                                    >
                                      <input
                                        name="uId"
                                        type="hidden"
                                        value={this.state.uId}
                                      />
                                      <div class="form-group">
                                        <label>New Password</label>
                                        <input
                                          class="form-control"
                                          required=""
                                          name="NEWPASSWORD"
                                          value={this.state.NEWPASSWORD}
                                          type="password"
                                          onChange={this.changedata}
                                          placeholder="New Password"
                                        />
                                        <label>{this.state.newValid}</label>
                                      </div>
                                      <div class="form-group">
                                        <label>Confirm Password</label>
                                        <input
                                          class="form-control"
                                          required=""
                                          name="CONFIRMPASSWORD"
                                          value={this.state.CONFIRMPASSWORD}
                                          type="password"
                                          onChange={this.changedata}
                                          placeholder="Confirm Password"
                                        />
                                        <label>{this.state.confirmValid}</label>
                                      </div>
                                      <div class="Lgm-fom-btn">
                                        <button class="cmmn-bt" type="submit">
                                          Submit
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
              </div>
              <div class="col-md-6"></div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Changepassword;
