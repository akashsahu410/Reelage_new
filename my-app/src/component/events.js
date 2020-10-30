import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import jwt from "jsonwebtoken";

class Events extends React.Component {
  render() {
    return (
      <div>
        <section class="profile-sec wrapper pd-50">
          <div class="container">
            <div class="profile-abttbs active">
              <div class="row">
                <div class="col-md-12">
                  <div class="prfl-disc-tabs">
                    <div class="tab-content">
                      
                      <div class="active text-style">
                        <div class="upcm-evnt-sec">
                          <div class="pro-abthd">
                            <h4>Upcoming Events</h4>
                          </div>
                          <div class="upcm-event-lst">
                            <div
                              id=""
                              class="roundFinalistss util-carousel crsl-cntrl"
                            >
                              <div class="item">
                                <div class="rnd-fnlst-item">
                                  <div class="rnd-fnlst-media">
                                    <img src="/images/video-thumb.jpg" />
                                    <a href="javascript:void(0);"></a>
                                  </div>
                                  <div class="rnd-fnlst-des">
                                    <small>Participant 1</small>
                                    <h3>Dance with you heart We Can Dance</h3>
                                    <p>
                                      <span>02-sep-2020 10:00 a.m.</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="item">
                                <div class="rnd-fnlst-item">
                                  <div class="rnd-fnlst-media">
                                    <img src="/images/video-thumb.jpg" />
                                    <a href="javascript:void(0);">
                                      <i class="fa fa-play"></i>
                                    </a>
                                  </div>
                                  <div class="rnd-fnlst-des">
                                    <small>Participant 1</small>
                                    <h3>Dance with you heart We Can Dance</h3>
                                    <p>
                                      <span>02-sep-2020 10:00 a.m.</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="item">
                                <div class="rnd-fnlst-item">
                                  <div class="rnd-fnlst-media">
                                    <img src="/images/video-thumb.jpg" />
                                    <a href="javascript:void(0);">
                                      <i class="fa fa-play"></i>
                                    </a>
                                  </div>
                                  <div class="rnd-fnlst-des">
                                    <small>Participant 1</small>
                                    <h3>Dance with you heart We Can Dance</h3>
                                    <p>
                                      <span>02-sep-2020 10:00 a.m.</span>
                                    </p>
                                  </div>
                                </div>
                              </div>
                              <div class="item">
                                <div class="rnd-fnlst-item">
                                  <div class="rnd-fnlst-media">
                                    <img src="/images/video-thumb.jpg" />
                                    <a href="javascript:void(0);">
                                      <i class="fa fa-play"></i>
                                    </a>
                                  </div>
                                  <div class="rnd-fnlst-des">
                                    <small>Participant 1</small>
                                    <h3>Dance with you heart We Can Dance</h3>
                                    <p>
                                      <span>02-sep-2020 10:00 a.m.</span>
                                    </p>
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
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Events;
