import React from "react";
import jwt from "jsonwebtoken";
import queryString from 'query-string'
import config from "./config.js";

class Photos extends React.Component {
  state = {
    fetchPhotos: [],
  };
  componentDidMount=()=> {
    const decoded_id = jwt.verify(
      localStorage.getItem("param"),
      config.login_secret.key
    );

    // console.log("query string",this.props.location.search)
    // const value=queryString.parse(this.props.location.search);
    // const id=value.id;
    // console.log('token id',id)//123

    // this.setState({ id: decoded_id.param });
    // this.setState({ id: id});

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      // body: JSON.stringify({ id: id }),
      body: JSON.stringify({ id: decoded_id.param }),
    };
    fetch("http://localhost:8080/showPhotos", options)
      .then((res) => {
        console.log("response", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        this.setState({ fetchPhotos: data.result });
        console.log(this.state);
      })
      .catch((err) => {
        console.log("error in fetch call", err);
      });
  }
  render() {
    return (
      <div>
        <section class="profile-sec wrapper">
          <div class="container">
            <div class="profile-abttbs active">
              <div class="row">
                <div class="col-md-12">
                  <div class="prfl-disc-tabs">
                    <div class="tab-content">
                      <div class="active text-style">
                        <div class="profl-phots">
                          <div class="pro-abthd">
                            <h4>Photos</h4>
                          </div>
                          <div class="row">
                            {this.state.fetchPhotos.map((x) => {

                              return(
                              <div class="col-md-4">
                                <div class="prfl-innr-img">
                                  <img src={`http://localhost:8080/${x.image}`} />
                                </div>
                              </div>)
                            })}
                            
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

export default Photos;
