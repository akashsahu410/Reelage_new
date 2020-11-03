import React, { Suspense } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import queryString from 'query-string'
import HeaderInn from "./header_in";
import config from "./config.js";
import Footer from "./footer";
import Timeline from "./timeline";
import About from "./about";
import Video from "./video";
import Photos from "./photos";
import Events from "./events";
import ChangeUserPassword from "./change_user_password";
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
    id:"",
    name:"",
    posts:"",
    followers:"",
    following:"",
    banner_img:"",
    user_img:""
  }

  componentDidMount() {
    const decoded_id = jwt.verify(
      localStorage.getItem("param"),
      config.login_secret.key
    );
    // console.log("this.props",this.props.location.state)
    // let fetch_url = window.location.href;
    // let result = fetch_url.split("=");
    // console.log("result",result)

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ id: result[1] }),
      body: JSON.stringify({ id: decoded_id.param }),
    };
    fetch("http://localhost:8080/fetchUserInfo", options)
      .then((res) => {
        console.log("response", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data.data);
        this.setState({ id: decoded_id.param,name:data.data.name,followers:data.data.no_followers,following:data.data.no_following,user_img:data.data.user_img,
        posts:data.data.no_post,banner_img:data.data.user_banner_img});
      })
      .catch((err) => {
        console.log("error in fetch call", err);
      });

    // this.setState({ id: decoded_id.param });
    
  }
  check = (e) => {
    // document.documentElement.scrollTop = 0;
    console.log("feth id",this.state)
    // this.props.history.push(`/profile/${e.target.name}?id=${this.state.id}`);
    this.props.history.push(`/profile/${e.target.name}`);

    // let new_obj = {}

    // let tabs_arr = ['timeline','about','photos','video','events']
    // for (var [key, value] of Object.entries(this.state)) {
    //   if(key === e.target.name){
    //     new_obj[key] = "active"
    //   }
    //   else if(tabs_arr.includes(key)){
    //     new_obj[key] = ""
    //   }
    //   else{
    //     new_obj[key] = this.state[key]
    //   }
    // }
    // console.log(new_obj)
    // this.setState(new_obj);
  };

  render() {
    return (
      <div>
        <HeaderInn />
        <section class="profile-sec wrapper">
          <div class="container">
            <div class="profle-banner">
              <div class="row">
                <div class="col-md-12">
                  <div class="prfl-bnnr-img">
                    <div class="profl-bnnr-img">
                      <a
                        class="fancybox"
                        rel="ligthbox"
                        href={this.state.banner_img === "" ? "/images/pro-cover.jpg" : `http://localhost:8080/${this.state.banner_img}`}
                      >
                        <img
                          class="img-responsive"
                          alt=""
                          src={this.state.banner_img === "" ? "/images/pro-cover.jpg" : `http://localhost:8080/${this.state.banner_img}`}
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
                            href={this.state.user_img === "" ? "/images/nora.jpg" : (this.state.user_img.search("googleusercontent") ? this.state.user_img : `http://localhost:8080/${this.state.user_img}`)}
                          >
                            <img
                              class="img-responsive"
                              alt=""
                              src={this.state.user_img === "" ? "/images/nora.jpg" : (this.state.user_img.search("googleusercontent") ? this.state.user_img : `http://localhost:8080/${this.state.user_img}`)}
                            />
                          </a>
                        </div>
                        <div class="prole-nam">
                          <h4>{this.state.name}</h4>
                          <div class="prf-fllw-dtl main">
                            <ul>
                              <li>
                                <a href="#">
                                  <span class="post-hd">{this.state.posts}</span> Posts
                                </a>
                              </li>
                              <li>
                                <span class="com-cicrcle"></span>
                              </li>
                              <li>
                                <a href="#">
                                  <span class="post-hd">{this.state.followers}</span> Followers
                                </a>
                              </li>
                              <li>
                                <span class="com-cicrcle"></span>
                              </li>
                              <li>
                                <a href="#">
                                  <span class="post-hd">{this.state.following}</span> Following
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
            <PrivateRoute
              path={`${this.props.match.url}/change_password`}
              component={ChangeUserPassword}
            />
          </Switch>
        </Suspense>
        <Footer />
      </div>
    );
  }
}

export default Profile;
