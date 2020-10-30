import React from "react";
import { Switch, Route, Redirect, Link } from "react-router-dom";
import axios from "axios";
import jwt from "jsonwebtoken";
import config from "./config.js";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

class Timeline extends React.Component {
  state = {
    id: "",
    message: "",
    image: "",
    preview: "",
    video: "",
  };
  initialstate = {
    id: "",
    message: "",
    image: "",
    preview: "",
    video: "",
  };

  get_youtube_id=(url)=>{
    let video_id = url.split('v=')[1];
    let ampersandPosition = video_id.indexOf('&');
    if(ampersandPosition != -1) {
      video_id = video_id.substring(0, ampersandPosition);
    }
    return video_id 
  }
  changedata = (e) => {
    if (e.target.name === "video"){
      let video_id = this.get_youtube_id(e.target.value)
      this.setState({ [e.target.name]:  'https://www.youtube.com/embed/'+video_id});
    }
    else{
      this.setState({ [e.target.name]: e.target.value.toLowerCase() });
    }
  };

  componentDidMount() {
    const decoded_id = jwt.verify(
      localStorage.getItem("param"),
      config.login_secret.key
    );
    this.setState({ id: decoded_id.param });
  }

  onChangeHandler = (event) => {
    this.setState({
      image: event.target.files[0],
      preview: URL.createObjectURL(event.target.files[0]),
    });
  };
  onFileUpload = () => {
    // Create an object of formData
    console.log(this.state);
    let formData = new FormData();

    // Update the formData object
    formData.append("image", this.state.image);
    formData.append("id", this.state.id);
    formData.append("message", this.state.message);
    formData.append("video", this.state.video);

    // Request made to the backend api
    // Send formData object

    let options = {
      method: "POST",
      body: formData,
    };
    console.log("options", options);
    fetch("http://localhost:8080/upload_photo", options)
      .then((res) => {
        console.log("response", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data.status);
        toast(data.msg);
        this.setState(this.initialstate);
      })
      .catch((err) => {
        console.log("error in fetch call", err);
      });
  };

  
  //   to upload the post
  upload_post = (e) => {
    e.preventDefault();
    if (this.state.video !== "" || this.state.message !== ""){
    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(this.state),
    };
    fetch(`http://localhost:8080/upload_post`, options)
      .then((res) => {
        //console.log("response",res)
        return res.json();
      })
      .then((data) => {
        if (data.status) {
          toast(data.msg);
          console.log(data.msg);
          this.setState(this.initialstate);
        } else {
          toast("Upload Post failure");
        }
      })
      .catch((err) => {
        console.log("error", err);
      });
    }
    else{
      toast("Empty Data");
    }
  };
  render() {
    return (
      <div>
        {/* <!-- Upload Photo modal --> */}
        <div
          className="modal fade"
          id="uploadpicModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
        >
          <div className="modal-dialog shareMdl-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close closemodal"
                  data-dismiss="modal"
                >
                  &times;
                </button>
                <h4 className="modal-title">Upload Image</h4>
              </div>
              <div className="modal-body uploadMdl-body">
                <div className="upload-section">
                  <label className="upload-image" for="upload-image-one">
                    <input
                      type="file"
                      name="image"
                      onChange={this.onChangeHandler}
                      id="upload-image-one"
                    />
                  </label>

                  <a className="add-more" href="#">
                    <span className="uplod-icn">
                      <i className="fa fa-cloud-upload" aria-hidden="true"></i>
                    </span>
                    <span className="upload-img-hdg">Upload Image</span>
                  </a>

                  <div className="upload-img-icn">
                    <a
                      className="cmmn-btn fllw"
                      href="#"
                      onClick={this.onFileUpload}
                    >
                      Upload
                    </a>
                    <a className="cmmn-btn msg" href="#">
                      Cancel
                    </a>
                  </div>
                </div>
                {this.state.preview === "" ? (
                  ""
                ) : (
                  <div>
                    <img src={this.state.preview} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>



        <div
          className="modal fade"
          id="uploadvideoModal"
          tabindex="-1"
          role="dialog"
          aria-labelledby="exampleModalLabel"
        >
          <div className="modal-dialog shareMdl-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <button
                  type="button"
                  className="close closemodal"
                  data-dismiss="modal"
                >
                  &times;
                </button>
                <h4 className="modal-title">Upload Video</h4>
              </div>
              <div className="modal-body uploadMdl-body">
                    <input type="text" name="video" onChange = {this.changedata}/>
                  
                  <div className="upload-img-icn">
                    <a
                      className="cmmn-btn fllw"
                      href="#"
                      onClick={this.upload_post}
                    >
                      Upload
                    </a>
                    <a className="cmmn-btn msg" href="#">
                      Cancel
                    </a>
                  </div>
               
              </div>
            </div>
          </div>
        </div>


        <section class="profile-sec wrapper">
          <div class="container">
            <div class="profile-abttbs active">
              <div class="row">
                <div class="col-md-12">
                  <div class="prfl-disc-tabs">
                    <div class="tab-content">
                      <div class="active text-style">
                        <div class="tab-tmlne">
                          <div class="create-post">
                            <div class="tmln-usr-top">
                              <a href="#" class="prfl-tool">
                                <span class="tmln-pro">
                                  <img src="/images/prfle-img.jpg" />
                                </span>
                                <h4>Danish Sharma</h4>
                                <div class="prof-tooltip">
                                  <div class="comp-profle"></div>
                                </div>
                              </a>
                              <p>3 hours ago</p>
                            </div>
                            <div class="create-pst-form">
                              <form>
                                <div class="form-group">
                                  <textarea
                                    class="form-control"
                                    rows="3"
                                    name="message"
                                    onChange={this.changedata}
                                    placeholder="Write something here"
                                    required=""
                                  ></textarea>
                                </div>
                              </form>
                            </div>
                            <div class="post-btns">
                              <ul>
                                <li>
                                  <a
                                    href="#uploadpicModal"
                                    onClick={this.upload}
                                    data-toggle="modal"
                                  >
                                    <i
                                      class="fa fa-file-image-o"
                                      aria-hidden="true"
                                    ></i>
                                    Add photos
                                  </a>
                                </li>
                                <li>
                                  <a href="#uploadvideoModal" data-toggle="modal">
                                    <i
                                      class="fa fa-video-camera"
                                      aria-hidden="true"
                                    ></i>
                                    Add videos
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div class="post-btn-sc">
                              <a
                                class="post-btn"
                                href="javascript:void(0);"
                                onClick={this.upload_post}
                              >
                                Post
                              </a>
                            </div>
                          </div>
                          <div class="tmln-post">
                            <div class="tmln-usr-top">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>3 hours ago</p>
                            </div>
                            <div class="tml-main-img">
                              <img src="/images/Profile-nw.jpg" />
                            </div>
                            <div class="tml-brn">
                              <ul>
                                <li>
                                  <a href="">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-thumbs-o-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    15 likes
                                  </a>
                                </li>
                                <li>
                                  <span class="circle">
                                    <i
                                      class="fa fa-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-comment-o"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    15 Comments
                                  </a>
                                </li>
                                <li>
                                  <span class="circle">
                                    <i
                                      class="fa fa-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="#shareModal" data-toggle="modal">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-share-alt"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    Share
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader will
                                be distracted.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <div class="cmmnt-txt-sec">
                                <form>
                                  <div class="form-group">
                                    <input
                                      class="form-control"
                                      type="text"
                                      name="Name"
                                      placeholder="Write something here"
                                      required=""
                                    />
                                    `{" "}
                                  </div>
                                </form>
                              </div>
                            </div>
                          </div>
                          <div class="tmln-post">
                            <div class="tmln-usr-top">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>3 hours ago</p>
                            </div>
                            <div class="tml-main-img">
                              <img src="/images/profile-nw2.jpg" />
                            </div>
                            <div class="tml-brn">
                              <ul>
                                <li>
                                  <a href="">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-thumbs-o-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    15 likes
                                  </a>
                                </li>
                                <li>
                                  <span class="circle">
                                    <i
                                      class="fa fa-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-comment-o"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    15 Comments
                                  </a>
                                </li>
                                <li>
                                  <span class="circle">
                                    <i
                                      class="fa fa-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="#shareModal" data-toggle="modal">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-share-alt"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    Share
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
                                  </li>
                                </ul>
                              </div>
                            </div>{" "}
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader will
                                be distracted.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                          </div>
                          <div class="tmln-post">
                            <div class="tmln-usr-top">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>3 hours ago</p>
                            </div>
                            <div class="tml-main-img">
                              <img src="/images/profile-nw3.jpg" />
                            </div>
                            <div class="tml-brn">
                              <ul>
                                <li>
                                  <a href="">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-thumbs-o-up"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    15 likes
                                  </a>
                                </li>
                                <li>
                                  <span class="circle">
                                    <i
                                      class="fa fa-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-comment-o"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    15 Comments
                                  </a>
                                </li>
                                <li>
                                  <span class="circle">
                                    <i
                                      class="fa fa-circle"
                                      aria-hidden="true"
                                    ></i>
                                  </span>
                                </li>
                                <li>
                                  <a href="#shareModal1" data-toggle="modal">
                                    <span class="lke-icn">
                                      <i
                                        class="fa fa-share-alt"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                    Share
                                  </a>
                                </li>
                              </ul>
                            </div>
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader will
                                be distracted by the readable content of a page
                                when looking at its layout.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
                                  </li>
                                </ul>
                              </div>
                            </div>
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="/images/prfle-img.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
                                  </li>
                                </ul>
                              </div>
                            </div>{" "}
                            <div class="tmln-cmmnt-sc">
                              <span class="tmln-pro">
                                <img src="images/tmln-pic2.jpg" />
                              </span>
                              <h4>Danish Sharma</h4>
                              <p>
                                It is a long established fact that a reader will
                                be distracted.
                              </p>
                              <div class="tml-brn innr">
                                <ul>
                                  <li>
                                    <a href="">likes</a>
                                  </li>
                                  <li>
                                    <span class="circle">
                                      <i
                                        class="fa fa-circle"
                                        aria-hidden="true"
                                      ></i>
                                    </span>
                                  </li>
                                  <li>
                                    <a href="">Reply</a>
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
          </div>
        </section>
      </div>
    );
  }
}

export default Timeline;
