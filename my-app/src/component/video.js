import React, { Suspense } from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import jwt from "jsonwebtoken";
import queryString from 'query-string'
import config from "./config.js";
import Loading from "./loading";

class Timeline extends React.Component {
  state = {
    fetchVideos: [],
  };
  componentDidMount=()=> {
    // const decoded_id = jwt.verify(
    //   localStorage.getItem("param"),
    //   config.login_secret.key
    // );
    console.log("query string",this.props.location.search)
    const value=queryString.parse(this.props.location.search);
    const id=value.id;
    console.log('token id',id)//123

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ id: decoded_id.param }),
      body: JSON.stringify({ id: id }),
    };
    fetch("http://localhost:8080/showVideos", options)
      .then((res) => {
        console.log("response", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        this.setState({ fetchVideos: data.result });
        console.log(this.state);
      })
      .catch((err) => {
        console.log("error in fetch call", err);
      });
  }
  render() {
	const opts = {
		height: '300',
		width: '400',
		playerVars: {
		  // https://developers.google.com/youtube/player_parameters
		  autoplay: 0,
		},
	  }
    return (
      <div>
        <Suspense fallback={Loading}>
        <section class="profile-sec wrapper pd-50">
          <div class="container">
            <div class="profile-abttbs">
              <div class="row">
                <div class="col-md-12">
                  <div class="prfl-disc-tabs">
                    <div class="tab-content">
                      <div class="tab-pane active text-style" id="tab2">
                        <div class="pro-video">
                          <div class="pro-abthd">
                            <h4>Videos</h4>
                          </div>
                          <div class="row">
                            {this.state.fetchVideos.map((x) => {
                              return (
                                <iframe
                                  src={x.video}
                                  frameborder="0"
                                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                  allowfullscreen
                                ></iframe>
                              );
                            })}

                            {/* <div class="col-md-4">
                              <div class="pro-vd">
                                <div class="video-media pro-mda">
                                  <img src="/images/video-new.jpg" />
                                  <a
                                    href="javascript:void(0);"
                                    onclick="openVideoModal();"
                                    class="video-btn"
                                  >
                                    <i class="fa fa-play"></i>
                                  </a>
                                </div>
                                <div class="provdo-hover">
                                  <ul>
                                    <li>
                                      <a href="#">
                                        60
                                        <i
                                          class="fa fa-thumbs-o-up"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        20
                                        <i
                                          class="fa fa-comment-o"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        10
                                        <i
                                          class="fa fa-share"
                                          aria-hidden="true"
                                        ></i>
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                              </div>
                            </div> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        </Suspense>
      </div>
    );
  }
}

export default Timeline;
