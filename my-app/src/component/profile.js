import React, { Suspense } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import HeaderInn from "./header_in";
import config from "./config.js";
import Footer from "./footer";
import Timeline from "./timeline";
import About from "./about";
import Video from "./video";
import Photos from "./photos";
import Events from "./events";
import Loading from "./loading";


const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.length > 0 ? (
        jwt.verify(
          localStorage.getItem("email"),
          config.login_secret.key,
          (err, decoded) => {
            if (err) {
              localStorage.clear();
              console.log("props", props);
              props.history.push("/login");
            } else {
              return decoded;
            }
          }
        ).email !== null ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        )
      ) : (
        <Redirect to="/login" />
      )
    }
  />
);
class Profile extends React.Component {
  state={
    timeline:"active",
    about:"",
    photos:"",
    video:"",
    events:"",
    id:""
  }

  componentDidMount() {
    const decoded_id = jwt.verify(
      localStorage.getItem("param"),
      config.login_secret.key
    );
    this.setState({ id: decoded_id.param });
  }
  check = (e) => {
    document.documentElement.scrollTop = 0;
    this.props.history.push(`/profile/${e.target.name}`);

    let new_obj = {}

    for (var [key, value] of Object.entries(this.state)) {
      if(key === e.target.name){
        new_obj[key] = "active"
      }
      else{
        new_obj[key] = ""
      }
    }
    console.log(new_obj)
    this.setState(new_obj);
  };

  render() {
    return (
      <div>
        <HeaderInn />
        <section class="profile-sec wrapper pd-50">
          <div class="container">
            <div class="profle-banner">
              <div class="row">
                <div class="col-md-12">
                  <div class="prfl-bnnr-img">
                    <div class="profl-bnnr-img">
                      <a
                        class="fancybox"
                        rel="ligthbox"
                        href="/images/pro-cover.jpg"
                      >
                        <img
                          class="img-responsive"
                          alt=""
                          src="/images/pro-cover.jpg"
                        />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
              <div class="profle-scl-stl">
                <div class="row">
                  <div class="profle-scl">
                    <div class="col-md-6">
                      <div class="prfl-img-icn">
                        <div class="prfl-ig-icn">
                          <a
                            class="fancybox"
                            rel="ligthbox"
                            href="/images/nora.jpg"
                          >
                            <img
                              class="img-responsive"
                              alt=""
                              src="/images/nora.jpg"
                            />
                          </a>
                        </div>
                        <div class="prole-nam">
                          <h4>Akash Sahu</h4>
                          <div class="prf-fllw-dtl main">
                            <ul>
                              <li>
                                <a href="#">
                                  <span class="post-hd">886</span> Posts
                                </a>
                              </li>
                              <li>
                                <span class="com-cicrcle"></span>
                              </li>
                              <li>
                                <a href="#">
                                  <span class="post-hd">20.1m</span> Followers
                                </a>
                              </li>
                              <li>
                                <span class="com-cicrcle"></span>
                              </li>
                              <li>
                                <a href="#">
                                  <span class="post-hd">20</span> Following
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="profl-lkes">
                    <div class="col-md-6">
                      <div class="pro-fllws">
                        <a class="cmmn-btn fllw" href="login.php">
                          Subscribe
                        </a>
                        <a class="cmmn-btn msg" href="login.php">
                          Message Me
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="profile-abttbs">
              <div class="row">
                <div class="col-md-12">
                  <div class="prfl-tabdtl">
                    <nav class="nav-sidebar">
                      <ul class="nav tabs">
                        <li class={this.state.timeline}>
                          <a
                            href="javascript:;"
                            name="timeline"
                            onClick={this.check}
                          >
                            <i class="fa fa-film" aria-hidden="true"></i>
                            Timeline
                          </a>
                          {/* <a href="javascript:;" name="timeline" onClick={this.check}>TImeline</a> */}
                        </li>
                        <li class={this.state.about}>
                          <a
                            href="javascript:;"
                            name="about"
                            onClick={this.check}
                          >
                            <i class="fa fa-film" aria-hidden="true"></i>
                            About Me
                          </a>
                        </li>
                        <li class={this.state.video}>
                          <a
                            href="javascript:;"
                            name="video"
                            onClick={this.check}
                          >
                            <i class="fa fa-film" aria-hidden="true"></i>
                            Video
                          </a>
                        </li>
                        <li class={this.state.photos}>
                          <a
                            href="javascript:;"
                            name="photos"
                            onClick={this.check}
                          >
                            <i class="fa fa-film" aria-hidden="true"></i>
                            Photos
                          </a>
                        </li>
                        <li class={this.state.events}>
                          <a
                            href="javascript:;"
                            name="events"
                            onClick={this.check}
                          >
                            <i class="fa fa-film" aria-hidden="true"></i>
                            Upcoming Events
                          </a>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        <Suspense fallback={Loading}>
          <Switch>
            
            <PrivateRoute
              exact
              path={`${this.props.match.url}`}
              component={Timeline}
            />
            <PrivateRoute
              path={`${this.props.match.url}/timeline`}
              component={Timeline}
            />
            <PrivateRoute
              path={`${this.props.match.url}/about`}
              component={About}
            />
            <PrivateRoute
              path={`${this.props.match.url}/video`}
              component={Video}
            />
            <PrivateRoute
              path={`${this.props.match.url}/photos`}
              component={Photos}
            />
            <PrivateRoute
              path={`${this.props.match.url}/events`}
              component={Events}
            />
          </Switch>
        </Suspense>
        <Footer />
      </div>
    );
  }
}

export default Profile;
