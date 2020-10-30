import React from "react";
import jwt from "jsonwebtoken";
import config from "./config.js";

class About extends React.Component {

  state = {
    about_me: "",
  };

  componentDidMount() {
    const decoded_id = jwt.verify(
      localStorage.getItem("email"),
      config.login_secret.key
    );

    let options = {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: decoded_id.email }),
    };
    fetch("http://localhost:8080/show_about_me", options)
      .then((res) => {
        console.log("response", res);
        return res.json();
      })
      .then((data) => {
        console.log("data", data);
        this.setState({ about_me: data.about_me });
        console.log(this.state);
      })
      .catch((err) => {
        console.log("error in fetch call", err);
      });
  }

  render() {
    return (
      <div>
        <section class="profile-sec wrapper pd-50">
          <div class="container">
            
            <div class="profile-abttbs">
              <div class="row">
                <div class="col-md-12">
                  
                  <div class="prfl-disc-tabs">
                    <div class="tab-content">
                    
                      <div class="text-style active" >
                        <div class="pro-abtsc">
                          <div class="pro-abtdtl">
                            <div class="pro-abthd">
                              <h4>About Me</h4>
                            </div>
                            <div class="pro-abtdis">
                              <p>
                                {this.state.about_me}
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
        </section>
      </div>
    );
  }
}

export default About;
