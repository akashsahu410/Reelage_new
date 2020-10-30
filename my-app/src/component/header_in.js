import React from "react";
import config from "./config.js";
import { Redirect, Link } from "react-router-dom";
import jwt from "jsonwebtoken";

class HeaderInn extends React.Component {
  state = {
    logout_flag: false,
    email: "",
    name: "",
    image: "",
  };

  componentDidMount() {
    // decode the email from localStorage
    const decoded_email = jwt.verify(
      localStorage.getItem("email"),
      config.login_secret.key
    );

    // decode the name from localStorage
    const decoded_name = jwt.verify(
      localStorage.getItem("name"),
      config.login_secret.key
    );

    // decode the image from localStorage

    let image = "images/prfle-img.jpg";
    try {
      const decoded_image = jwt.verify(
        localStorage.getItem("image"),
        config.login_secret.key
      );
      image = decoded_image.image;
    } catch (err) {
      image = "images/prfle-img.jpg";
    }
    this.setState({
      email: decoded_email.email,
      name: decoded_name.name,
      image: image,
    });
  }

  // logout the profile
  logout = () => {
    localStorage.clear();
    this.setState({ logout_flag: true });
  };

  render() {
    return (
      <div>
        {this.state.logout_flag ? (
          <Redirect to="/login" />
        ) : (
          <header class="wrapper header-inner blk">
            <div class="header-main">
              <div class="container">
                <div class="row">
                  <div class="col-md-7">
                    <div class="headr-logo">
                      <a href="index.php">
                        <img src="/images/head-logo.png" />
                      </a>
                    </div>
                  </div>
                  <div class="col-md-5">
                    <div class="headr-inr">
                      <ul>
                        <li>
                          <a href="#">
                            <i
                              class="fa fa-video-camera"
                              aria-hidden="true"
                            ></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa fa-th" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i class="fa fa-bell" aria-hidden="true"></i>
                          </a>
                        </li>
                        <li>
                          <div class="hdr-user">
                            <div class="dropdown user-drop accuser-drop">
                              <a
                                href="javascript:;"
                                class="dropdown-toggle"
                                data-toggle="dropdown"
                                aria-expanded="false"
                              >
                                <span class="name-icon">
                                  {this.state.name[0]}
                                </span>
                                {/* <img src="images/default-user.png" id="imgProfiles"/> */}
                              </a>
                              <div class="dropdown-menu user-dropdown-menu cart-drop-menu accuser-drop-menu">
                                <div class="accuser-menu">
                                  <ul>
                                    <li class="prfl-top-dtl">
                                      <div class="prfl-img-drp">
                                        <span class="drp-img-icn">
                                          <img src={this.state.image} />
                                        </span>
                                        <h4>{this.state.name}</h4>
                                        <p>{this.state.email}</p>
                                        <a href="#">Manage Your Account</a>
                                      </div>
                                    </li>
                                    <li>
                                      <a href="my-profile.html">
                                        {/* <img src="images/user-icon.png"/> */}
                                        <i
                                          class="fa fa-user-o"
                                          aria-hidden="true"
                                        ></i>
                                        Profile
                                      </a>
                                    </li>
                                    <li>
                                      <a href="user-my-wallet.html">
                                        {/* <img src="images/wallet-icon.png"/> */}
                                        <i
                                          class="fa fa-id-badge"
                                          aria-hidden="true"
                                        ></i>
                                        Followers
                                      </a>
                                    </li>
                                    <li>
                                      <a href="user-statements.html">
                                        {/* <img src="images/wallet-icon.png"/> */}
                                        <i
                                          class="fa fa-calendar"
                                          aria-hidden="true"
                                        ></i>
                                        Events
                                      </a>
                                    </li>
                                    <li>
                                      <a href="change-password.html">
                                        {/* <img src="images/wallet-icon.png"/> */}
                                        <i
                                          class="fa fa-key"
                                          aria-hidden="true"
                                        ></i>
                                        Change Password
                                      </a>
                                    </li>
                                    <li>
                                      <a href="close-account.html">
                                        {/* <img src="images/wallet-icon.png"/> */}
                                        <i
                                          class="fa fa-times-circle-o"
                                          aria-hidden="true"
                                        ></i>
                                        Close account
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        href="javascript:void(0);"
                                        onClick={this.logout}
                                      >
                                        {/* <img src="images/wallet-icon.png"/> */}
                                        <i
                                          class="fa fa-sign-out"
                                          aria-hidden="true"
                                        ></i>
                                        Logout
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </header>
        )}
      </div>
    );
  }
}

export default HeaderInn;
